import { motion } from 'framer-motion';
import type { Quest } from '../../types/quest';

interface AILabProps {
  quest: Quest;
  onComplete: () => void;
}

export function AILab({ quest: _quest, onComplete }: AILabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-6">🤖</div>
      <h3 className="font-pixel text-lg text-kai-red mb-4">AI LAB</h3>
      <p className="font-display text-sm text-kai-muted mb-6">
        Train AI models and solve ML puzzles!
      </p>
      <div className="pixel-border hud-panel p-6 max-w-md mx-auto mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((val, i) => (
            <div
              key={i}
              className="w-8 h-8 border border-kai-border flex items-center justify-center"
            >
              <motion.div
                initial={{ height: '0%' }}
                animate={{ height: `${val * 100}%` }}
                className="w-full bg-kai-red/50"
                style={{ alignSelf: 'flex-end' }}
              />
            </div>
          ))}
        </div>
        <p className="font-display text-xs text-kai-muted">
          Train neural networks
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
