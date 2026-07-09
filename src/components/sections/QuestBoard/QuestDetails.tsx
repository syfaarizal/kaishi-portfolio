import { motion } from 'framer-motion';
import type { Quest } from '../../../types/quest';

interface QuestDetailsProps {
  quest: Quest;
  onClose: () => void;
  onLaunchGame: (quest: Quest) => void;
  isCompleted: boolean;
}

const statusColor: Record<string, string> = {
  COMPLETED: '#22c55e',
  IN_PROGRESS: '#f59e0b',
  PLANNING: '#6b7280',
};

export function QuestDetails({ quest, onClose, onLaunchGame, isCompleted }: QuestDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="pixel-border hud-panel max-w-lg w-full p-6"
        style={{ borderColor: `${quest.color}44` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[7px] text-kai-muted">{quest.type}</span>
            {isCompleted && (
              <span className="font-pixel text-[7px] px-2 py-0.5 bg-green-500/20 border border-green-500/40 text-green-400">
                ✓ COMPLETED
              </span>
            )}
          </div>
          <div
            className="font-pixel text-[7px] px-2 py-1 border"
            style={{ color: statusColor[quest.status], borderColor: `${statusColor[quest.status]}44` }}
          >
            {quest.status}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-pixel text-lg text-kai-red mb-2" style={{ textShadow: `0 0 20px ${quest.color}40` }}>
          {quest.title}
        </h3>

        {/* Description */}
        <p className="font-display text-sm text-kai-text/80 leading-relaxed mb-4">
          {quest.description}
        </p>

        {/* Difficulty */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-pixel text-[7px] text-kai-muted">DIFFICULTY</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, si) => (
              <span
                key={si}
                className="text-xs"
                style={{ color: si < quest.difficulty ? quest.color : '#3d0f1a' }}
              >
                ◆
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {quest.tags.map((tag: string) => (
            <span
              key={tag}
              className="font-pixel text-[7px] border border-kai-border px-2 py-1 text-kai-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Reward */}
        <div className="flex items-center justify-between border-t border-kai-border pt-4 mb-6">
          <span className="font-pixel text-[7px] text-kai-muted">REWARD</span>
          <span className="font-pixel text-sm" style={{ color: quest.color }}>
            +{quest.reward}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {quest.gameType && (
            <button
              onClick={() => onLaunchGame(quest)}
              className="flex-1 font-pixel text-[8px] px-4 py-2 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
            >
              ▶ LAUNCH QUEST GAME
            </button>
          )}
          <button
            onClick={onClose}
            className="font-pixel text-[8px] px-4 py-2 border border-kai-border text-kai-muted hover:text-kai-red hover:border-kai-red/50 transition-colors"
          >
            [ CLOSE ]
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
