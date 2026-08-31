import { PLAYER_HEIGHT, PLAYER_WIDTH, STAGE_WIDTH } from './Physics';

interface PlayerProps {
  x: number;
  y: number;
  facing: 1 | -1;
  isJumping: boolean;
  isMoving: boolean;
  isHurt: boolean;
}

const PLAYER_SPRITE = '/assets/game/player-game.png';

export function Player({ x, y, facing, isJumping, isMoving, isHurt }: PlayerProps) {
  return (
    <div
      className="absolute transition-none overflow-hidden"
      style={{
        left: `${(x / STAGE_WIDTH) * 100}%`,
        top: `${y}%`,
        width: `${(PLAYER_WIDTH / STAGE_WIDTH) * 100}%`,
        height: `${(PLAYER_HEIGHT / STAGE_WIDTH) * 100}%`,
        transform: `scaleX(${facing})`,
        filter: isHurt ? 'brightness(2) saturate(0) hue-rotate(0deg)' : 'drop-shadow(0 0 4px rgba(204,17,51,0.5))',
      }}
    >
      <img
        src={PLAYER_SPRITE}
        alt="Player"
        className={`w-full h-full object-contain ${isMoving && !isJumping ? 'animate-[bounce_0.3s_ease-in-out_infinite]' : ''}`}
        draggable={false}
      />
    </div>
  );
}
