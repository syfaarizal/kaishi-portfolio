interface EnemyProps {
  x: number;
  y: number;
}

export function Enemy({ x, y }: EnemyProps) {
  return (
    <div
      className="absolute flex items-center justify-center text-base"
      style={{ left: `${x}%`, top: `${y}%`, width: '4%', height: '6%' }}
    >
      <span style={{ filter: 'drop-shadow(0 0 8px #ff1144)' }}>🔺</span>
    </div>
  );
}
