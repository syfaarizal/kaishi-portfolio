import { motion } from 'framer-motion';
import type { Quest } from '../../types/quest';

interface BugHunterProps {
  quest: Quest;
  onComplete: () => void;
}

export function BugHunter({ quest: _quest, onComplete }: BugHunterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-6">🐛</div>
      <h3 className="font-pixel text-lg text-kai-red mb-4">BUG HUNTER</h3>
      <p className="font-display text-sm text-kai-muted mb-6">
        Find and fix bugs in the code!
      </p>
      <div className="pixel-border hud-panel p-6 max-w-md mx-auto mb-6">
        <p className="font-mono text-xs text-red-400 mb-4">
          {'// ERROR: Bug not found'}
        </p>
        <p className="font-display text-xs text-kai-muted">
          Hunt down bugs in various code snippets
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
