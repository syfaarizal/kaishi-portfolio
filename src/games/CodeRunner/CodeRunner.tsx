import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Quest } from '../../types/quest';
import { useGameLoop } from '../../components/games/CodeRunner/useGameLoop';
import { Player } from '../../components/games/CodeRunner/Player';
import { Enemy } from '../../components/games/CodeRunner/Enemy';
import { Collectible } from '../../components/games/CodeRunner/Collectible';
import { Platform } from '../../components/games/CodeRunner/Platform';
import { HUD } from '../../components/games/CodeRunner/HUD';
import {
  GRAVITY,
  JUMP_VELOCITY,
  MOVE_SPEED,
  MAX_FALL_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  STAGE_BOTTOM,
  intersects,
  clamp,
} from '../../components/games/CodeRunner/Physics';

interface CodeRunnerProps {
  quest: Quest;
  onComplete: () => void;
}

interface PlatformSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  moving: boolean;
  moveRange: number;
  moveSpeed: number;
}

interface EnemyState {
  id: string;
  x: number;
  y: number;
  vx: number;
  range: number;
  originX: number;
}

const STAGE_WIDTH = 200; // virtual world width in %

const INITIAL_PLATFORMS: PlatformSpec[] = [
  { id: 'ground-0', x: 0, y: STAGE_BOTTOM - 8, width: 36, height: 8, moving: false, moveRange: 0, moveSpeed: 0 },
  { id: 'p-1', x: 42, y: STAGE_BOTTOM - 22, width: 14, height: 4, moving: false, moveRange: 0, moveSpeed: 0 },
  { id: 'p-2', x: 62, y: STAGE_BOTTOM - 34, width: 10, height: 4, moving: false, moveRange: 0, moveSpeed: 0 },
  { id: 'p-3', x: 78, y: STAGE_BOTTOM - 22, width: 16, height: 4, moving: false, moveRange: 0, moveSpeed: 0 },
  { id: 'ground-1', x: 100, y: STAGE_BOTTOM - 8, width: 30, height: 8, moving: false, moveRange: 0, moveSpeed: 0 },
  { id: 'p-4', x: 136, y: STAGE_BOTTOM - 26, width: 12, height: 4, moving: true, moveRange: 8, moveSpeed: 4 },
  { id: 'p-5', x: 156, y: STAGE_BOTTOM - 40, width: 10, height: 4, moving: false, moveRange: 0, moveSpeed: 0 },
  { id: 'ground-2', x: 172, y: STAGE_BOTTOM - 8, width: 28, height: 8, moving: false, moveRange: 0, moveSpeed: 0 },
];

const INITIAL_ENEMIES: { id: string; x: number; y: number; vx: number; range: number }[] = [
  { id: 'e-1', x: 50, y: STAGE_BOTTOM - 8 - 6, vx: 6, range: 5 },
  { id: 'e-2', x: 108, y: STAGE_BOTTOM - 8 - 6, vx: 8, range: 6 },
  { id: 'e-3', x: 180, y: STAGE_BOTTOM - 8 - 6, vx: 7, range: 6 },
];

const COLLECTIBLE_DEFS: { id: string; x: number; y: number }[] = [
  { id: 'c-1', x: 47, y: STAGE_BOTTOM - 28 },
  { id: 'c-2', x: 66, y: STAGE_BOTTOM - 40 },
  { id: 'c-3', x: 84, y: STAGE_BOTTOM - 28 },
  { id: 'c-4', x: 142, y: STAGE_BOTTOM - 32 },
  { id: 'c-5', x: 160, y: STAGE_BOTTOM - 46 },
];

const PORTAL = { x: 192, y: STAGE_BOTTOM - 8 - 12, width: 6, height: 12 };

type Phase = 'playing' | 'won' | 'gameover';

// This component reads refs during render because it runs a game loop via
// useGameLoop — the refs are mutated each frame and forceRender() ensures
// fresh values are always used. This is intentional and safe.
export function CodeRunner({ onComplete }: CodeRunnerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const next = el.getBoundingClientRect().width;
      setContainerWidth((prev) => (prev === next ? prev : next));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Camera follows player
  const cameraX = useRef(0);

  // Player physics state
  const playerX = useRef(2);
  const playerY = useRef(STAGE_BOTTOM - 8 - PLAYER_HEIGHT);
  const playerVX = useRef(0);
  const playerVY = useRef(0);
  const playerFacing = useRef<1 | -1>(1);
  const playerGrounded = useRef(false);
  const playerJumpHeld = useRef(false);
  const playerJumpBuffer = useRef(0);
  const playerCoyote = useRef(0);
  const playerHurtTimer = useRef(0);

  // Platforms (mutable for moving ones) — declared before snapshot so useState
  // initializers can reference them without hitting the temporal dead zone.
  const platformsRef = useRef<PlatformSpec[]>(
    INITIAL_PLATFORMS.map((p) => ({ ...p })),
  );
  const enemiesRef = useRef<EnemyState[]>(
    INITIAL_ENEMIES.map((e) => ({ ...e, originX: e.x })),
  );

  // Single state object holding all values read in JSX — avoids react-hooks/refs
  // errors. Updated once per frame at the end of the update() loop.
  /* eslint-disable react-hooks/refs */
  const [snapshot, setSnapshot] = useState(() => ({
    cameraX: 0,
    playerX: 2,
    playerY: STAGE_BOTTOM - 8 - PLAYER_HEIGHT,
    playerFacing: 1 as 1 | -1,
    playerGrounded: false,
    playerVX: 0,
    playerHurt: false,
    platforms: platformsRef.current,
    enemies: enemiesRef.current,
  }));
  /* eslint-enable react-hooks/refs */

  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());

  const [phase, setPhase] = useState<Phase>('playing');
  const [paused, setPaused] = useState(false);

  const isRunning = phase === 'playing' && !paused;

  const respawn = useCallback(() => {
    playerX.current = 2;
    playerY.current = STAGE_BOTTOM - 8 - PLAYER_HEIGHT;
    playerVX.current = 0;
    playerVY.current = 0;
    playerHurtTimer.current = 1.2;
    cameraX.current = 0;
    setSnapshot({
      cameraX: 0,
      playerX: 2,
      playerY: STAGE_BOTTOM - 8 - PLAYER_HEIGHT,
      playerFacing: 1,
      playerGrounded: false,
      playerVX: 0,
      playerHurt: true,
      platforms: platformsRef.current,
      enemies: enemiesRef.current,
    });
  }, []);

  const update = useCallback(
    (dt: number) => {
      const left = isKeyDown('arrowleft') || isKeyDown('a');
      const right = isKeyDown('arrowright') || isKeyDown('d');
      const jumpHeld = isKeyDown('arrowup') || isKeyDown(' ') || isKeyDown('w');

      // Horizontal motion
      if (left && !right) {
        playerVX.current = -MOVE_SPEED;
        playerFacing.current = -1;
      } else if (right && !left) {
        playerVX.current = MOVE_SPEED;
        playerFacing.current = 1;
      } else {
        playerVX.current = 0;
      }

      // Keyboard jump input — buffer a jump request whenever the key is held
      // and we haven't just consumed a buffer. touchControl() handles mobile.
      if (jumpHeld) {
        playerJumpHeld.current = true;
        if (playerJumpBuffer.current <= 0) {
          playerJumpBuffer.current = 0.12;
        }
      } else {
        playerJumpHeld.current = false;
      }

      // Jump buffer / coyote time
      if (playerJumpBuffer.current > 0) playerJumpBuffer.current -= dt;
      if (playerGrounded.current) playerCoyote.current = 0.12;
      else playerCoyote.current = Math.max(0, playerCoyote.current - dt);

      if (playerJumpBuffer.current > 0 && playerCoyote.current > 0) {
        playerVY.current = JUMP_VELOCITY;
        playerGrounded.current = false;
        playerJumpBuffer.current = 0;
        playerCoyote.current = 0;
      }

      // Variable jump height
      if (!playerJumpHeld.current && playerVY.current < -40) {
        playerVY.current = Math.max(playerVY.current, -40);
      }

      // Gravity
      playerVY.current = Math.min(MAX_FALL_SPEED, playerVY.current + GRAVITY * dt);

      // Move horizontally
      playerX.current += playerVX.current * dt;
      playerX.current = clamp(playerX.current, 0, STAGE_WIDTH - PLAYER_WIDTH);

      // Move vertically
      playerY.current += playerVY.current * dt;

      // Update moving platforms
      const t = performance.now() / 1000;
      platformsRef.current.forEach((p) => {
        if (p.moving) {
          const baseX = p.x;
          (p as PlatformSpec & { _baseX: number; _offset: number })._baseX = baseX;
          (p as PlatformSpec & { _offset: number })._offset =
            Math.sin(t * p.moveSpeed) * p.moveRange;
        }
      });

      // Platform collision (only when falling)
      playerGrounded.current = false;
      if (playerVY.current >= 0) {
        for (const p of platformsRef.current) {
          const offset = (p as PlatformSpec & { _offset?: number })._offset ?? 0;
          const px = p.x + offset;
          const plat = {
            x: px,
            y: p.y,
            width: p.width,
            height: p.height,
          };
          const prevBottom = playerY.current - playerVY.current * dt + PLAYER_HEIGHT;
          const playerRect = {
            x: playerX.current,
            y: playerY.current,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
          };
          if (intersects(playerRect, plat) && prevBottom <= plat.y + 1) {
            playerY.current = plat.y - PLAYER_HEIGHT;
            playerVY.current = 0;
            playerGrounded.current = true;
          }
        }
      }

      // Hard floor
      if (playerY.current + PLAYER_HEIGHT >= STAGE_BOTTOM) {
        playerY.current = STAGE_BOTTOM - PLAYER_HEIGHT;
        playerVY.current = 0;
        playerGrounded.current = true;
      }

      // Update enemies
      enemiesRef.current.forEach((e) => {
        e.x += e.vx * dt;
        if (Math.abs(e.x - e.originX) > e.range) e.vx *= -1;
      });

      // Camera
      const desiredCam = clamp(
        playerX.current + PLAYER_WIDTH / 2 - 50,
        0,
        Math.max(0, STAGE_WIDTH - 100),
      );
      cameraX.current += (desiredCam - cameraX.current) * Math.min(1, dt * 6);

      // Enemy collisions
      if (playerHurtTimer.current <= 0) {
        for (const e of enemiesRef.current) {
          const enemyRect = { x: e.x, y: e.y, width: 4, height: 6 };
          const playerRect = {
            x: playerX.current,
            y: playerY.current,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
          };
          if (intersects(playerRect, enemyRect)) {
            playerVY.current = -60;
            playerHurtTimer.current = 1.2;
            livesRef.current -= 1;
            setLives(livesRef.current);
            if (livesRef.current <= 0) {
              setPhase('gameover');
            } else {
              respawn();
            }
            break;
          }
        }
      }

      // Collectibles
      let collectedThisFrame = false;
      const next = new Set(collectedIds);
      COLLECTIBLE_DEFS.forEach((c) => {
        if (next.has(c.id)) return;
        const cRect = { x: c.x, y: c.y, width: 4, height: 6 };
        const pRect = {
          x: playerX.current,
          y: playerY.current,
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
        };
        if (intersects(pRect, cRect)) {
          next.add(c.id);
          scoreRef.current += 100;
          collectedThisFrame = true;
        }
      });
      if (collectedThisFrame) {
        setCollectedIds(next);
        setScore(scoreRef.current);
      }

      // Hurt timer countdown
      if (playerHurtTimer.current > 0) playerHurtTimer.current -= dt;

      // Portal → win
      const portalRect = {
        x: PORTAL.x,
        y: PORTAL.y,
        width: PORTAL.width,
        height: PORTAL.height,
      };
      const playerRect = {
        x: playerX.current,
        y: playerY.current,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      };
      if (intersects(playerRect, portalRect)) {
        setPhase('won');
      }

      // Update snapshot state so JSX sees fresh values. This is a single state update
      // per frame — React batches it, so it's one re-render per frame, same as before.
      setSnapshot({
        cameraX: cameraX.current,
        playerX: playerX.current,
        playerY: playerY.current,
        playerFacing: playerFacing.current,
        playerGrounded: playerGrounded.current,
        playerVX: playerVX.current,
        playerHurt: playerHurtTimer.current > 0,
        platforms: platformsRef.current,
        enemies: enemiesRef.current,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [], // update is stable — refs are mutable, collectedIds is captured as local const
  );

  useGameLoop(update, isRunning);

  function touchControl(action: 'left' | 'right' | 'jump', state: 'down' | 'up') {
    if (action === 'jump' && state === 'down') {
      playerJumpHeld.current = true;
      playerJumpBuffer.current = 0.12;
    } else if (action === 'jump' && state === 'up') {
      playerJumpHeld.current = false;
    } else if (action === 'left') {
      setTouchKey('a', state === 'down');
    } else if (action === 'right') {
      setTouchKey('d', state === 'down');
    }
    // Sync snapshot so touch controls reflect immediately in JSX
    setSnapshot({
      cameraX: cameraX.current,
      playerX: playerX.current,
      playerY: playerY.current,
      playerFacing: playerFacing.current,
      playerGrounded: playerGrounded.current,
      playerVX: playerVX.current,
      playerHurt: playerHurtTimer.current > 0,
      platforms: platformsRef.current,
      enemies: enemiesRef.current,
    });
  }

  const totalCollected = collectedIds.size;

  return (
    <div className="w-full">
      <HUD
        lives={lives}
        maxLives={3}
        score={score}
        fragmentsCollected={totalCollected}
        totalFragments={COLLECTIBLE_DEFS.length}
        onPause={() => setPaused((p) => !p)}
        isPaused={paused}
      />

      <div
        ref={containerRef}
        className="pixel-border hud-panel relative overflow-hidden"
        style={{ height: 280 }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translateX(${-snapshot.cameraX * (containerWidth / 100)}px)`,
            width: `${STAGE_WIDTH}%`,
            height: '100%',
            background:
              'linear-gradient(180deg, #0a0508 0%, #1a0a10 60%, #2a0a14 100%)',
          }}
        >
          {/* Grid backdrop */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(204,17,51,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(204,17,51,0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Platforms */}
          {snapshot.platforms.map((p) => (
            <Platform
              key={p.id}
              x={p.x + ((p as PlatformSpec & { _offset?: number })._offset ?? 0)}
              y={p.y}
              width={p.width}
              height={p.height}
              moving={p.moving}
            />
          ))}

          {/* Collectibles */}
          {COLLECTIBLE_DEFS.map((c) => (
            <Collectible
              key={c.id}
              x={c.x}
              y={c.y}
              collected={collectedIds.has(c.id)}
            />
          ))}

          {/* Enemies */}
          {snapshot.enemies.map((e) => (
            <Enemy key={e.id} x={e.x} y={e.y} />
          ))}

          {/* Portal */}
          <div
            className="absolute flex items-center justify-center font-pixel text-[7px] text-kai-red"
            style={{
              left: `${PORTAL.x}%`,
              top: `${PORTAL.y}%`,
              width: `${PORTAL.width}%`,
              height: `${PORTAL.height}%`,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full border-2 border-kai-red"
              style={{
                boxShadow: '0 0 18px #cc1133, inset 0 0 12px #ff1144',
                background:
                  'radial-gradient(circle, rgba(255,17,68,0.6) 0%, rgba(204,17,51,0.1) 70%)',
              }}
            />
            <span className="absolute">⌬</span>
          </div>

          {/* Player */}
          <Player
            x={snapshot.playerX}
            y={snapshot.playerY}
            facing={snapshot.playerFacing}
            isJumping={!snapshot.playerGrounded}
            isMoving={snapshot.playerVX !== 0}
            isHurt={snapshot.playerHurt}
          />
        </div>

        {/* Pause overlay */}
        <AnimatePresence>
          {paused && phase === 'playing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <div className="text-center">
                <div className="font-pixel text-sm text-kai-red mb-3">PAUSED</div>
                <button
                  onClick={() => setPaused(false)}
                  className="font-pixel text-[8px] px-4 py-2 border border-kai-border text-white hover:border-kai-red hover:text-kai-red"
                >
                  RESUME
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* End screens */}
        <AnimatePresence>
          {phase === 'won' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <div className="text-center px-6">
                <div className="font-pixel text-sm text-green-400 text-glow mb-2">
                  LEVEL COMPLETE
                </div>
                <div className="font-pixel text-[8px] text-kai-muted mb-1">SCORE</div>
                <div className="font-pixel text-2xl text-white mb-1">{score}</div>
                <div className="font-display text-xs text-kai-muted mb-4">
                  Lives remaining: {lives} • Fragments: {totalCollected}/
                  {COLLECTIBLE_DEFS.length}
                </div>
                <button
                  onClick={onComplete}
                  className="font-pixel text-[8px] px-6 py-2 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
                >
                  COMPLETE QUEST
                </button>
              </div>
            </motion.div>
          )}
          {phase === 'gameover' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <div className="text-center px-6">
                <div className="font-pixel text-sm text-kai-red text-glow mb-2">SYSTEM CRASHED</div>
                <div className="font-pixel text-[8px] text-kai-muted mb-1">FINAL SCORE</div>
                <div className="font-pixel text-2xl text-white mb-4">{score}</div>
                <button
                  onClick={onComplete}
                  className="font-pixel text-[8px] px-6 py-2 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
                >
                  RETURN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile touch controls */}
      <div className="mt-3 flex items-center justify-between md:hidden">
        <div className="flex gap-2">
          <button
            onTouchStart={() => touchControl('left', 'down')}
            onTouchEnd={() => touchControl('left', 'up')}
            onMouseDown={() => touchControl('left', 'down')}
            onMouseUp={() => touchControl('left', 'up')}
            onMouseLeave={() => touchControl('left', 'up')}
            className="w-12 h-12 border border-kai-border text-kai-text font-pixel text-xs active:border-kai-red"
          >
            ◀
          </button>
          <button
            onTouchStart={() => touchControl('right', 'down')}
            onTouchEnd={() => touchControl('right', 'up')}
            onMouseDown={() => touchControl('right', 'down')}
            onMouseUp={() => touchControl('right', 'up')}
            onMouseLeave={() => touchControl('right', 'up')}
            className="w-12 h-12 border border-kai-border text-kai-text font-pixel text-xs active:border-kai-red"
          >
            ▶
          </button>
        </div>
        <button
          onTouchStart={() => touchControl('jump', 'down')}
          onTouchEnd={() => touchControl('jump', 'up')}
          onMouseDown={() => touchControl('jump', 'down')}
          onMouseUp={() => touchControl('jump', 'up')}
          onMouseLeave={() => touchControl('jump', 'up')}
          className="w-16 h-12 border border-kai-border text-kai-red font-pixel text-xs active:bg-kai-red/20"
        >
          JUMP
        </button>
      </div>

      <div className="mt-2 hidden md:flex items-center justify-center gap-4 font-pixel text-[7px] text-kai-muted">
        <span>← → MOVE</span>
        <span>SPACE / ↑ JUMP</span>
        <span>P PAUSE</span>
      </div>
    </div>
  );
}

// --- Input helpers -----------------------------------------------------------

function isKeyDown(key: string): boolean {
  const w = window as unknown as { __kaiKeyState?: Record<string, boolean> };
  return !!w.__kaiKeyState?.[key.toLowerCase()];
}

function setTouchKey(key: string, down: boolean) {
  const w = window as unknown as { __kaiKeyState?: Record<string, boolean> };
  if (!w.__kaiKeyState) w.__kaiKeyState = {};
  w.__kaiKeyState[key] = down;
}

// Mount a single keyboard listener that maintains __kaiKeyState + jump handling
if (typeof window !== 'undefined' && !(window as unknown as { __kaiKeysHooked?: boolean }).__kaiKeysHooked) {
  (window as unknown as { __kaiKeysHooked?: boolean }).__kaiKeysHooked = true;

  window.addEventListener('keydown', (e) => {
    const w = window as unknown as { __kaiKeyState?: Record<string, boolean> };
    if (!w.__kaiKeyState) w.__kaiKeyState = {};
    w.__kaiKeyState[e.key.toLowerCase()] = true;
    if (e.key === ' ' || e.key === 'ArrowUp') e.preventDefault();
  });
  window.addEventListener('keyup', (e) => {
    const w = window as unknown as { __kaiKeyState?: Record<string, boolean> };
    if (!w.__kaiKeyState) w.__kaiKeyState = {};
    w.__kaiKeyState[e.key.toLowerCase()] = false;
  });
  window.addEventListener('blur', () => {
    const w = window as unknown as { __kaiKeyState?: Record<string, boolean> };
    if (!w.__kaiKeyState) w.__kaiKeyState = {};
    for (const k of Object.keys(w.__kaiKeyState)) w.__kaiKeyState[k] = false;
  });
}