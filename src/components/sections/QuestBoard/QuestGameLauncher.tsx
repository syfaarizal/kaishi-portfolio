import { motion } from 'framer-motion';
import type { Quest } from '../../../types/quest';
import { CodeRunner } from '../../../games/CodeRunner/CodeRunner';
import { BugHunter } from '../../../games/BugHunter/BugHunter';
import { UIPuzzle } from '../../../games/UIPuzzle/UIPuzzle';
import { AILab } from '../../../games/AILab/AILab';

interface QuestGameLauncherProps {
  quest: Quest;
  onClose: () => void;
}

const gameComponents = {
  'code-runner': CodeRunner,
  'bug-hunter': BugHunter,
  'ui-puzzle': UIPuzzle,
  'ai-lab': AILab,
};

export function QuestGameLauncher({ quest, onClose }: QuestGameLauncherProps) {
  const GameComponent = gameComponents[quest.gameType as keyof typeof gameComponents];

  if (!GameComponent) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="pixel-border hud-panel max-w-3xl w-full max-h-[80vh] overflow-auto"
        style={{ borderColor: `${quest.color}44` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Game Header */}
        <div className="flex items-center justify-between p-4 border-b border-kai-border">
          <div>
            <span className="font-pixel text-[7px] text-kai-muted">NOW PLAYING</span>
            <h3 className="font-pixel text-sm text-white">{quest.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="font-pixel text-[8px] px-3 py-1 border border-kai-border text-kai-muted hover:text-kai-red hover:border-kai-red/50 transition-colors"
          >
            ✕ EXIT
          </button>
        </div>

        {/* Game Content */}
        <div className="p-4">
          <GameComponent quest={quest} onComplete={onClose} />
        </div>
      </motion.div>
    </motion.div>
  );
}
