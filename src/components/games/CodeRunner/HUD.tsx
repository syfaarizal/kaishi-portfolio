interface HUDProps {
  lives: number;
  maxLives: number;
  score: number;
  fragmentsCollected: number;
  totalFragments: number;
  onPause: () => void;
  isPaused: boolean;
}

export function HUD({ lives, maxLives, score, fragmentsCollected, totalFragments, onPause, isPaused }: HUDProps) {
  return (
    <div className="flex items-center justify-between mb-2 px-1">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxLives }).map((_, i) => (
          <span key={i} className="text-sm" style={{ opacity: i < lives ? 1 : 0.2 }}>
            ❤️
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 font-pixel text-[8px] text-kai-text">
        <span>
          SCORE <span className="text-kai-red">{score.toLocaleString()}</span>
        </span>
        <span>
          🟡 {fragmentsCollected}/{totalFragments}
        </span>
        <button
          onClick={onPause}
          className="px-2 py-1 border border-kai-border text-kai-muted hover:text-kai-red hover:border-kai-red transition-colors"
        >
          {isPaused ? '▶' : '⏸'}
        </button>
      </div>
    </div>
  );
}
