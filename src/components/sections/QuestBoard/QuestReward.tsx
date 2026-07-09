import { motion } from 'framer-motion';
import type { Quest } from '../../../types/quest';

interface QuestRewardProps {
  quest: Quest;
  onCollect: () => void;
}

export function QuestReward({ quest, onCollect }: QuestRewardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.9)' }}
      onClick={onCollect}
    >
      <motion.div
        className="pixel-border hud-panel max-w-sm w-full p-8 text-center"
        style={{ borderColor: `${quest.color}66` }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="font-pixel text-lg text-kai-red mb-2" style={{ textShadow: `0 0 20px ${quest.color}60` }}>
            QUEST COMPLETE!
          </h3>
          <p className="font-display text-sm text-kai-text mb-6">
            You have completed <span style={{ color: quest.color }}>{quest.title}</span>
          </p>
          <div className="font-pixel text-2xl mb-6" style={{ color: quest.color }}>
            +{quest.reward}
          </div>
          <button
            onClick={onCollect}
            className="font-pixel text-[8px] px-6 py-3 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
          >
            COLLECT REWARD
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
