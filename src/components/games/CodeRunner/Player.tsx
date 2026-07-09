import { PLAYER_HEIGHT, PLAYER_WIDTH } from './Physics';

interface PlayerProps {
  x: number;
  y: number;
  facing: 1 | -1;
  isJumping: boolean;
  isMoving: boolean;
  isHurt: boolean;
}

export function Player({ x, y, facing, isJumping, isMoving, isHurt }: PlayerProps) {
  return (
    <div
      className="absolute transition-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${PLAYER_WIDTH}%`,
        height: `${PLAYER_HEIGHT}%`,
        transform: `scaleX(${facing})`,
        filter: isHurt ? 'brightness(2) saturate(0) hue-rotate(0deg)' : 'none',
      }}
    >
      <div
        className={`w-full h-full relative ${isMoving && !isJumping ? 'animate-[bounce_0.3s_ease-in-out_infinite]' : ''}`}
      >
        {/* Body */}
        <div
          className="absolute inset-x-[15%] bottom-0 top-[20%]"
          style={{ background: '#cc1133', boxShadow: '0 0 8px #cc1133aa' }}
        />
        {/* Head */}
        <div className="absolute inset-x-[22%] top-0 h-[26%]" style={{ background: '#e8e0e3' }} />
        {/* Visor */}
        <div className="absolute left-[55%] top-[6%] w-[30%] h-[10%]" style={{ background: '#080808' }} />
        {isJumping && (
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-1"
            style={{ background: 'transparent' }}
          />
        )}
      </div>
    </div>
  );
}
