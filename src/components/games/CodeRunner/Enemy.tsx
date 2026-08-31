interface EnemyProps {
  x: number;
  y: number;
}

const OBSTACLE_SPRITE = '/assets/game/hazards-game.png';

export function Enemy({ x, y }: EnemyProps) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: `${x}%`, top: `${y}%`, width: '4%', height: '6%' }}
    >
      <img
        src={OBSTACLE_SPRITE}
        alt="Obstacle"
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 0 6px rgba(255,17,68,0.6))' }}
        draggable={false}
      />
    </div>
  );
}
