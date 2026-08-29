import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Quest } from '../../types/quest';

interface UIPuzzleProps {
  quest: Quest;
  onComplete: () => void;
}

interface Piece {
  id: string;
  label: string;
  icon: string;
  /** Target slot index in the grid (0-based) */
  correctSlot: number;
}

interface SlotState {
  index: number;
  /** id of the piece currently in this slot, or null */
  pieceId: string | null;
}

const TOTAL_TIME = 60; // seconds
const GRID_COLS = 4;
const GRID_ROWS = 2;

const PIECES: Piece[] = [
  { id: 'navbar', label: 'NAVBAR', icon: '▭', correctSlot: 0 },
  { id: 'hero', label: 'HERO', icon: '✦', correctSlot: 1 },
  { id: 'card-a', label: 'CARD A', icon: '▤', correctSlot: 2 },
  { id: 'card-b', label: 'CARD B', icon: '▥', correctSlot: 3 },
  { id: 'card-c', label: 'CARD C', icon: '▦', correctSlot: 4 },
  { id: 'cta', label: 'CTA', icon: '▶', correctSlot: 5 },
  { id: 'footer', label: 'FOOTER', icon: '═', correctSlot: 7 },
];

const SLOT_COUNT = GRID_COLS * GRID_ROWS;

interface LayoutSize {
  containerWidth: number;
  containerHeight: number;
  cellSize: number;
  gap: number;
  pieceSize: number;
}

function useLayoutSize(ref: React.RefObject<HTMLElement | null>): LayoutSize {
  const [size, setSize] = useState<LayoutSize>({
    containerWidth: 0,
    containerHeight: 0,
    cellSize: 0,
    gap: 0,
    pieceSize: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const gap = 8;
      const containerWidth = rect.width;
      const containerHeight = 220; // fixed height for stage
      const cellSize = Math.floor((containerWidth - gap * (GRID_COLS + 1)) / GRID_COLS);
      const pieceSize = cellSize;
      setSize({ containerWidth, containerHeight, cellSize, gap, pieceSize });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}

export function UIPuzzle({ quest: _quest, onComplete }: UIPuzzleProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const piecesLayerRef = useRef<HTMLDivElement | null>(null);
  const size = useLayoutSize(stageRef);

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [integrity, setIntegrity] = useState(100);
  const [slots, setSlots] = useState<SlotState[]>(() =>
    Array.from({ length: SLOT_COUNT }, (_, i) => ({ index: i, pieceId: null })),
  );
  const [placed, setPlaced] = useState<Record<string, { slotIndex: number; correct: boolean }>>({});
  const [flash, setFlash] = useState<string | null>(null);
  const [phase, setPhase] = useState<'playing' | 'won' | 'lost'>('playing');

  // Track piece positions so drag knows where each piece currently sits on screen
  const [piecePositions, setPiecePositions] = useState<Record<string, { x: number; y: number }>>({});

  // Initialize piece positions in the tray (bottom of stage)
  useEffect(() => {
    if (!size.containerWidth || !size.containerHeight) return;
    const trayY = size.containerHeight - size.pieceSize - size.gap;
    let cursorX = size.gap;
    const positions: Record<string, { x: number; y: number }> = {};
    PIECES.forEach((p) => {
      if (!placed[p.id]) {
        positions[p.id] = { x: cursorX, y: trayY };
        cursorX += size.pieceSize + size.gap;
      }
    });
    setPiecePositions(positions);
  }, [size.containerWidth, size.containerHeight, placed, size.pieceSize, size.gap]);

  // Compute slot screen positions
  const slotPositions = useMemo(() => {
    const map: Record<number, { x: number; y: number }> = {};
    for (let i = 0; i < SLOT_COUNT; i++) {
      const col = i % GRID_COLS;
      const row = Math.floor(i / GRID_COLS);
      map[i] = {
        x: size.gap + col * (size.cellSize + size.gap),
        y: size.gap + row * (size.cellSize + size.gap),
      };
    }
    return map;
  }, [size.cellSize, size.gap]);

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      setPhase('lost');
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft]);

  // Win check
  useEffect(() => {
    if (phase !== 'playing') return;
    const allCorrect = PIECES.every((p) => placed[p.id]?.correct === true);
    if (allCorrect) {
      setPhase('won');
    }
  }, [placed, phase]);

  function findClosestSlot(x: number, y: number): number | null {
    // x,y is the piece's center; compare to slot center
    const pieceCenterX = x + size.pieceSize / 2;
    const pieceCenterY = y + size.pieceSize / 2;
    let best: { idx: number; dist: number } | null = null;
    for (let i = 0; i < SLOT_COUNT; i++) {
      const sp = slotPositions[i];
      if (!sp) continue;
      const slotCenterX = sp.x + size.cellSize / 2;
      const slotCenterY = sp.y + size.cellSize / 2;
      const dx = pieceCenterX - slotCenterX;
      const dy = pieceCenterY - slotCenterY;
      const dist = Math.hypot(dx, dy);
      if (!best || dist < best.dist) best = { idx: i, dist };
    }
    if (!best) return null;
    // Only snap if within snap radius (cell diagonal * 0.9)
    const snapRadius = Math.hypot(size.cellSize, size.cellSize) * 0.7;
    return best.dist <= snapRadius ? best.idx : null;
  }

  function handleDragEnd(piece: Piece, _e: unknown, info: { point: { x: number; y: number } }) {
    const stageRect = stageRef.current?.getBoundingClientRect();
    if (!stageRect) return;
    const localX = info.point.x - stageRect.left;
    const localY = info.point.y - stageRect.top;
    const closest = findClosestSlot(localX, localY);
    if (closest === null) {
      // Return to tray
      setPiecePositions((prev) => ({ ...prev, [piece.id]: trayPositionFor(piece.id) }));
      return;
    }
    const slot = slots[closest];
    const targetCorrect = piece.correctSlot === closest;
    const slotAlreadyFilled = slot.pieceId !== null && slot.pieceId !== piece.id;

    if (slotAlreadyFilled) {
      // Wrong placement (slot is occupied by something else)
      penalize(piece.id, 'OCCUPIED');
      returnToTray(piece.id);
      return;
    }

    if (!targetCorrect) {
      // Wrong slot
      penalize(piece.id, 'WRONG SLOT');
      returnToTray(piece.id);
      return;
    }

    // Correct placement — place and lock
    setSlots((s) => s.map((sl) => (sl.index === closest ? { ...sl, pieceId: piece.id } : sl)));
    setPlaced((p) => ({ ...p, [piece.id]: { slotIndex: closest, correct: true } }));
    setPiecePositions((p) => ({ ...p, [piece.id]: slotPositions[closest] }));
    setFlash(`OK ${piece.label}`);
    setTimeout(() => setFlash(null), 700);
  }

  function trayPositionFor(pieceId: string): { x: number; y: number } {
    // Find tray position: pieces in tray are placed in row at bottom
    const trayPieces = PIECES.filter((p) => !placed[p.id] || p.id === pieceId);
    const idx = trayPieces.findIndex((p) => p.id === pieceId);
    return {
      x: size.gap + idx * (size.pieceSize + size.gap),
      y: size.containerHeight - size.pieceSize - size.gap,
    };
  }

  function returnToTray(pieceId: string) {
    setPiecePositions((p) => ({ ...p, [pieceId]: trayPositionFor(pieceId) }));
  }

  function penalize(_pieceId: string, reason: string) {
    setIntegrity((i) => Math.max(0, i - 12));
    setFlash(reason);
    setTimeout(() => setFlash(null), 700);
  }

  // If integrity hits 0, lose
  useEffect(() => {
    if (phase === 'playing' && integrity <= 0) {
      setPhase('lost');
    }
  }, [integrity, phase]);

  const placedCount = Object.values(placed).filter((p) => p.correct).length;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="font-pixel text-[8px] text-kai-muted">
          PLACED {placedCount}/{PIECES.length}
        </span>
        <div className="flex items-center gap-2 font-pixel text-[8px]">
          <span className="text-kai-muted">INTEGRITY</span>
          <span
            className={`px-2 py-0.5 border ${
              integrity <= 30
                ? 'border-kai-red text-kai-red'
                : 'border-kai-border text-white'
            }`}
          >
            {integrity}%
          </span>
          <span className="text-kai-muted ml-2">TIME</span>
          <span
            className={`px-2 py-0.5 border ${
              timeLeft <= 10
                ? 'border-kai-red text-kai-red animate-blink'
                : 'border-kai-border text-white'
            }`}
          >
            {timeLeft.toString().padStart(2, '0')}s
          </span>
        </div>
      </div>

      <div className="kai-progress mb-3">
        <div
          className={`h-full transition-all duration-500 ${
            integrity > 50 ? 'bg-kai-red' : integrity > 25 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${integrity}%` }}
        />
      </div>

      <AnimatePresence>
        {flash && (
          <motion.div
            key={flash}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`font-pixel text-[8px] mb-2 ${
              flash.startsWith('OK') ? 'text-green-400' : 'text-kai-red'
            }`}
          >
            {flash}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={stageRef}
        className="pixel-border hud-panel relative w-full overflow-hidden"
        style={{ height: 320 }}
      >
        {/* Slot layer */}
        <div className="absolute inset-0 p-2 grid grid-cols-4 grid-rows-2 gap-2">
          {slots.map((slot) => (
            <div
              key={slot.index}
              className="border border-dashed border-kai-border/60 flex items-center justify-center text-kai-muted/40 font-pixel text-[7px]"
            >
              {slot.pieceId ? '' : `0${slot.index + 1}`}
            </div>
          ))}
        </div>

        {/* Pieces layer */}
        <div ref={piecesLayerRef} className="absolute inset-0">
          {PIECES.map((piece) => {
            const pos = piecePositions[piece.id];
            const isPlaced = placed[piece.id]?.correct;
            return (
              <motion.div
                key={piece.id}
                drag={!isPlaced}
                dragMomentum={false}
                dragElastic={0.05}
                onDragEnd={(e, info) => handleDragEnd(piece, e, info)}
                animate={{ x: pos?.x ?? 0, y: pos?.y ?? 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                whileDrag={{ scale: 1.08, zIndex: 50, cursor: 'grabbing' }}
                className={`absolute pixel-border hud-panel flex flex-col items-center justify-center font-pixel text-[7px] select-none ${
                  isPlaced
                    ? 'bg-green-500/20 border-green-400 text-green-300 cursor-default'
                    : 'cursor-grab text-kai-text hover:border-kai-red'
                }`}
                style={{
                  width: size.pieceSize,
                  height: size.pieceSize,
                  touchAction: 'none',
                }}
              >
                <span className="text-lg mb-1">{piece.icon}</span>
                <span className="tracking-wider">{piece.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {phase === 'won' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center"
          >
            <div className="font-pixel text-sm text-green-400 text-glow mb-2">LAYOUT COMPLETE</div>
            <div className="font-display text-xs text-kai-muted mb-3">
              Integrity {integrity}% • Time left {timeLeft}s
            </div>
            <button
              onClick={onComplete}
              className="font-pixel text-[8px] px-6 py-2 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
            >
              COMPLETE QUEST
            </button>
          </motion.div>
        )}
        {phase === 'lost' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center"
          >
            <div className="font-pixel text-sm text-kai-red text-glow mb-2">SYSTEM FRAGMENTED</div>
            <div className="font-display text-xs text-kai-muted mb-3">
              {integrity <= 0 ? 'Integrity collapsed' : 'Time expired'} • Placed {placedCount}/{PIECES.length}
            </div>
            <button
              onClick={onComplete}
              className="font-pixel text-[8px] px-6 py-2 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
            >
              RETURN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}