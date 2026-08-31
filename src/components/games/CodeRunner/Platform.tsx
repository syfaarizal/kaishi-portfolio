import { STAGE_WIDTH } from './Physics';

interface PlatformProps {
  x: number;
  y: number;
  width: number;
  height: number;
  moving?: boolean;
}

export function Platform({ x, y, width, height, moving }: PlatformProps) {
  return (
    <div
      className="absolute"
      style={{
        left: `${(x / STAGE_WIDTH) * 100}%`,
        top: `${y}%`,
        width: `${(width / STAGE_WIDTH) * 100}%`,
        height: `${height}%`,
        background: 'linear-gradient(180deg, #1a0e13, #0c0608)',
        borderTop: `2px solid ${moving ? '#ff1144' : '#cc1133'}`,
        borderLeft: '1px solid #3d0f1a',
        borderRight: '1px solid #3d0f1a',
        boxShadow: moving ? '0 0 10px rgba(255,17,68,0.4)' : 'none',
      }}
    />
  );
}
