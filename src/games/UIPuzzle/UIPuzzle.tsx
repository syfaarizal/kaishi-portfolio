import { motion } from 'framer-motion';
import type { Quest } from '../../types/quest';

interface UIPuzzleProps {
  quest: Quest;
  onComplete: () => void;
}

export function UIPuzzle({ quest: _quest, onComplete }: UIPuzzleProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-6">🧩</div>
      <h3 className="font-pixel text-lg text-kai-red mb-4">UI PUZZLE</h3>
      <p className="font-display text-sm text-kai-muted mb-6">
        Match UI components to their correct implementations!
      </p>
      <div className="pixel-border hud-panel p-6 max-w-md mx-auto mb-6">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['A', 'B', 'C', 'D', 'E', 'F'].map((item) => (
            <div
              key={item}
              className="aspect-square flex items-center justify-center border border-kai-border text-kai-muted font-pixel text-xs"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="font-display text-xs text-kai-muted">
          Arrange UI components correctly
        </p>
      </div>
      <button
        onClick={onComplete}
        className="font-pixel text-[8px] px-6 py-2 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
      >
        COMPLETE (STUB)
      </button>
    </motion.div>
  );
}
