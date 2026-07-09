import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GRAVITY,
  JUMP_VELOCITY,
  MAX_FALL_SPEED,
  MOVE_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  STAGE_BOTTOM,
  clamp,
  horizontallyOverlaps,
  intersects,
  type Rect,
} from './Physics';
import { useGameLoop } from './useGameLoop';
import { Player } from './Player';
import { Platform } from './Platform';
import { Collectible } from './Collectible';
import { Enemy } from './Enemy';
import { HUD } from './HUD';

const BEST_SCORE_KEY = 'kaishi_code_runner_best_score';
const MAX_LIVES = 3;
const START_POS = { x: 3, y: 68 };

interface PlatformDef {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  moving?: boolean;
  range?: [number, number];
  speed?: number;
}

const PLATFORMS: PlatformDef[] = [
  { id: 'p1', x: 0, y: 82, width: 18, height: 6 },
  { id: 'p2', x: 23, y: 68, width: 13, height: 5 },
  { id: 'p3', x: 41, y: 78, width: 11, height: 5, moving: true, range: [41, 58], speed: 9 },
  { id: 'p4', x: 63, y: 62, width: 13, height: 5 },
  { id: 'p5', x: 80, y: 74, width: 18, height: 6 },
];

const FRAGMENTS = [
  { id: 'f1', x: 6, y: 70 },
  { id: 'f2', x: 27, y: 56 },
  { id: 'f3', x: 46, y: 66 },
  { id: 'f4', x: 67, y: 50 },
  { id: 'f5', x: 88, y: 62 },
];

interface HazardDef {
  id: string;
  y: number;
  range: [number, number];
  speed?: number;
}

const HAZARDS: HazardDef[] = [
  { id: 'e1', y: 76, range: [24, 34] },
  { id: 'e2', y: 56, range: [64, 74] },
];

const PORTAL: Rect = { x: 92, y: 56, width: 6, height: 24 };

type GameStatus = 'playing' | 'paused' | 'won' | 'lost';

interface GameState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 1 | -1;
  onGround: boolean;
  lives: number;
  score: number;
  collected: Record<string, boolean>;
  status: GameStatus;
  invulnerable: boolean;
}

function createInitialState(): GameState {
  return {
    x: START_POS.x,
    y: START_POS.y,
    vx: 0,
    vy: 0,
    facing: 1,
    onGround: true,
    lives: MAX_LIVES,
    score: 0,
    collected: {},
    status: 'playing',
    invulnerable: false,
  };
}

interface CodeRunnerProps {
  onFinish: () => void;
  onExit: () => void;
}

export function CodeRunner({ onFinish, onExit }: CodeRunnerProps) {
  const [state, setState] = useState<GameState>(createInitialState);
  const [bestScore, setBestScore] = useState<number>(() => {
    const stored = window.localStorage.getItem(BEST_SCORE_KEY);
    return stored ? Number(stored) : 0;
  });

  const keysRef = useRef({ left: false, right: false, up: false });
  const timeRef = useRef(0);
  const invulnTimerRef = useRef(0);
  const platformPositions = useRef<Record<string, number>>(
    Object.fromEntries(PLATFORMS.map((p) => [p.id, p.x])),
  );
  const hazardPositions = useRef<Record<string, number>>(
    Object.fromEntries(HAZARDS.map((h) => [h.id, h.range[0]])),
  );

  // Keyboard input
  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) keysRef.current.left = true;
      if (['ArrowRight', 'd', 'D'].includes(e.key)) keysRef.current.right = true;
      if (['ArrowUp', 'w', 'W', ' '].includes(e.key)) {
        e.preventDefault();
        keysRef.current.up = true;
      }
      if (e.key === 'Escape') {
        setState((prev) => {
          if (prev.status === 'playing') return { ...prev, status: 'paused' };
          if (prev.status === 'paused') return { ...prev, status: 'playing' };
          return prev;
        });
      }
    };
    const handleUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) keysRef.current.left = false;
      if (['ArrowRight', 'd', 'D'].includes(e.key)) keysRef.current.right = false;
      if (['ArrowUp', 'w', 'W', ' '].includes(e.key)) keysRef.current.up = false;
    };
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  const update = useCallback(
    (dt: number) => {
      timeRef.current += dt;

      // Advance moving platforms (sine-wave patrol)
      PLATFORMS.forEach((p) => {
        if (p.moving && p.range) {
          const [min, max] = p.range;
          const mid = (min + max) / 2;
          const amp = (max - min) / 2;
          platformPositions.current[p.id] = mid + Math.sin(timeRef.current * (p.speed ?? 8) * 0.15) * amp;
        }
      });

      // Advance hazards (patrol back and forth)
      HAZARDS.forEach((h) => {
        const [min, max] = h.range;
        const mid = (min + max) / 2;
        const amp = (max - min) / 2;
        hazardPositions.current[h.id] = mid + Math.sin(timeRef.current * 1.6 + h.range[0]) * amp;
      });

      setState((prev) => {
        if (prev.status !== 'playing') return prev;

        let vx = 0;
        if (keysRef.current.left) vx -= MOVE_SPEED;
        if (keysRef.current.right) vx += MOVE_SPEED;
        const facing: 1 | -1 = vx > 0 ? 1 : vx < 0 ? -1 : prev.facing;

        let vy = prev.vy + GRAVITY * dt;
        vy = clamp(vy, JUMP_VELOCITY, MAX_FALL_SPEED);
        if (keysRef.current.up && prev.onGround) {
          vy = JUMP_VELOCITY;
        }

        const nextX = clamp(prev.x + vx * dt, 0, 100 - PLAYER_WIDTH);
        let nextY = prev.y + vy * dt;

        const prevBottom = prev.y + PLAYER_HEIGHT;
        let onGround = false;
        let landedVy = vy;

        if (vy >= 0) {
          for (const p of PLATFORMS) {
            const px = platformPositions.current[p.id];
            const platRect: Rect = { x: px, y: p.y, width: p.width, height: p.height };
            const nextBottom = nextY + PLAYER_HEIGHT;
            const playerSpan: Rect = { x: nextX, y: nextY, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };
            if (
              prevBottom <= platRect.y + 1 &&
              nextBottom >= platRect.y &&
              horizontallyOverlaps(playerSpan, platRect)
            ) {
              nextY = platRect.y - PLAYER_HEIGHT;
              landedVy = 0;
              onGround = true;
              break;
            }
          }
        }

        let { lives, score, collected, invulnerable } = prev;
        let status: GameStatus = prev.status;

        // Fell into a pit
        if (!onGround && nextY + PLAYER_HEIGHT > STAGE_BOTTOM) {
          lives -= 1;
          invulnTimerRef.current = 1;
          const respawn = lives > 0 ? { x: START_POS.x, y: START_POS.y } : { x: prev.x, y: prev.y };
          return {
            ...prev,
            x: respawn.x,
            y: respawn.y,
            vx: 0,
            vy: 0,
            onGround: true,
            lives,
            status: lives <= 0 ? 'lost' : 'playing',
            invulnerable: true,
          };
        }

        const playerRect: Rect = { x: nextX, y: nextY, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };

        // Hazard collision
        if (invulnTimerRef.current > 0) {
          invulnTimerRef.current -= dt;
        } else if (invulnerable) {
          invulnerable = false;
        }

        if (!invulnerable) {
          for (const h of HAZARDS) {
            const hx = hazardPositions.current[h.id];
            const hazardRect: Rect = { x: hx, y: h.y, width: 4, height: 6 };
            if (intersects(playerRect, hazardRect)) {
              lives -= 1;
              invulnTimerRef.current = 1.1;
              invulnerable = true;
              if (lives <= 0) status = 'lost';
              break;
            }
          }
        }

        // Fragment collection
        let newCollected = collected;
        for (const f of FRAGMENTS) {
          if (collected[f.id]) continue;
          const fragRect: Rect = { x: f.x, y: f.y, width: 4, height: 6 };
          if (intersects(playerRect, fragRect)) {
            newCollected = { ...newCollected, [f.id]: true };
            score += 100;
          }
        }

        // Portal / win condition
        const allCollected = FRAGMENTS.every((f) => newCollected[f.id]);
        if (allCollected && intersects(playerRect, PORTAL)) {
          status = 'won';
        }

        return {
          ...prev,
          x: nextX,
          y: nextY,
          vx,
          vy: landedVy,
          facing,
          onGround,
          lives,
          score,
          collected: newCollected,
          status,
          invulnerable,
        };
      });
    },
    [],
  );

  useGameLoop(update, state.status === 'playing');

  useEffect(() => {
    if (state.status === 'won' && state.score > bestScore) {
      setBestScore(state.score);
      window.localStorage.setItem(BEST_SCORE_KEY, String(state.score));
    }
  }, [state.status, state.score, bestScore]);

  const handleRestart = () => {
    timeRef.current = 0;
    invulnTimerRef.current = 0;
    setState(createInitialState());
  };

  const togglePause = () => {
    setState((prev) => ({ ...prev, status: prev.status === 'playing' ? 'paused' : 'playing' }));
  };

  const fragmentsCollected = Object.values(state.collected).filter(Boolean).length;

  return (
    <div className="w-full h-full flex flex-col">
      <HUD
        lives={state.lives}
        maxLives={MAX_LIVES}
        score={state.score}
        fragmentsCollected={fragmentsCollected}
        totalFragments={FRAGMENTS.length}
        onPause={togglePause}
        isPaused={state.status === 'paused'}
      />

      <div
        className="relative flex-1 min-h-[220px] overflow-hidden border border-kai-border"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(204,17,51,0.08), transparent 60%), #080808',
          aspectRatio: '900 / 380',
        }}
      >
        {/* Scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10 z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 3px)',
          }}
        />

        {PLATFORMS.map((p) => (
          <Platform
            key={p.id}
            x={platformPositions.current[p.id]}
            y={p.y}
            width={p.width}
            height={p.height}
            moving={p.moving}
          />
        ))}

        {FRAGMENTS.map((f) => (
          <Collectible key={f.id} x={f.x} y={f.y} collected={!!state.collected[f.id]} />
        ))}

        {HAZARDS.map((h) => (
          <Enemy key={h.id} x={hazardPositions.current[h.id]} y={h.y} />
        ))}

        {/* Portal */}
        <div
          className="absolute flex items-center justify-center"
          style={{ left: `${PORTAL.x}%`, top: `${PORTAL.y}%`, width: `${PORTAL.width}%`, height: `${PORTAL.height}%` }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-full h-full rounded-full border-4"
            style={{
              borderColor: fragmentsCollected === FRAGMENTS.length ? '#22c55e' : '#3d0f1a',
              boxShadow:
                fragmentsCollected === FRAGMENTS.length ? '0 0 24px #22c55e88' : '0 0 8px rgba(61,15,26,0.5)',
            }}
          />
        </div>

        <Player
          x={state.x}
          y={state.y}
          facing={state.facing}
          isJumping={!state.onGround}
          isMoving={keysRef.current.left || keysRef.current.right}
          isHurt={state.invulnerable}
        />

        {/* Overlays */}
        {state.status === 'paused' && (
          <Overlay
            title="PAUSED"
            actions={[
              { label: 'RESUME', onClick: togglePause, primary: true },
              { label: 'RESTART', onClick: handleRestart },
              { label: 'EXIT', onClick: onExit },
            ]}
          />
        )}
        {state.status === 'lost' && (
          <Overlay
            title="GAME OVER"
            subtitle={`SCORE: ${state.score.toLocaleString()}`}
            actions={[
              { label: 'RESTART', onClick: handleRestart, primary: true },
              { label: 'EXIT', onClick: onExit },
            ]}
          />
        )}
        {state.status === 'won' && (
          <Overlay
            title="MISSION COMPLETE"
            subtitle={`SCORE: ${state.score.toLocaleString()}  •  BEST: ${bestScore.toLocaleString()}`}
            actions={[
              { label: 'PLAY AGAIN', onClick: handleRestart },
              { label: 'RETURN TO BRIEFING', onClick: onFinish, primary: true },
            ]}
          />
        )}
      </div>

      <div className="flex flex-wrap gap-4 mt-2 px-1 font-pixel text-[7px] text-kai-muted">
        <span>
          <span className="text-kai-text border border-kai-border px-1.5 py-0.5 mr-1">← →</span>Move
        </span>
        <span>
          <span className="text-kai-text border border-kai-border px-1.5 py-0.5 mr-1">↑ / Space</span>Jump
        </span>
        <span>
          <span className="text-kai-text border border-kai-border px-1.5 py-0.5 mr-1">ESC</span>Pause
        </span>
      </div>
    </div>
  );
}

interface OverlayAction {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

function Overlay({ title, subtitle, actions }: { title: string; subtitle?: string; actions: OverlayAction[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
      style={{ background: 'rgba(8,8,8,0.88)' }}
    >
      <h4 className="font-pixel text-sm text-kai-red" style={{ textShadow: '0 0 16px #cc113399' }}>
        {title}
      </h4>
      {subtitle && <p className="font-pixel text-[8px] text-kai-muted">{subtitle}</p>}
      <div className="flex gap-3 flex-wrap justify-center">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className={`font-pixel text-[8px] px-4 py-2.5 border transition-colors ${
              a.primary
                ? 'bg-kai-red text-white border-kai-red hover:bg-kai-crimson'
                : 'border-kai-border text-kai-muted hover:text-kai-red hover:border-kai-red'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
