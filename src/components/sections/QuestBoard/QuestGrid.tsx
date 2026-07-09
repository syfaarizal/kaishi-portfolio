import { motion } from 'framer-motion';
import type { Quest } from '../../../types/quest';

interface QuestGridProps {
  quests: Quest[];
  onSelectQuest: (quest: Quest) => void;
  onLaunchGame: (quest: Quest) => void;
  isQuestCompleted: (questId: string) => boolean;
}

const statusColor: Record<string, string> = {
  COMPLETED: '#22c55e',
  IN_PROGRESS: '#f59e0b',
  PLANNING: '#6b7280',
};

export function QuestGrid({ quests, onSelectQuest, onLaunchGame, isQuestCompleted }: QuestGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {quests.map((quest, i) => (
        <motion.div
          key={quest.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          whileHover={{ y: -4, scale: 1.01 }}
          onClick={() => onSelectQuest(quest)}
          className="pixel-border hud-panel p-4 cursor-pointer group transition-all hover:border-kai-red/60"
          style={{ borderColor: `${quest.color}33` }}
        >
          {/* Quest header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="font-pixel text-[8px] text-kai-muted mb-1">{quest.type}</div>
              <h3 className="font-display font-bold text-base text-kai-text group-hover:text-kai-red transition-colors">
                {quest.title}
              </h3>
            </div>
            <div
              className="font-pixel text-[7px] px-2 py-1 border flex items-center gap-1"
              style={{ color: statusColor[quest.status], borderColor: `${statusColor[quest.status]}44` }}
            >
              {isQuestCompleted(quest.id) && <span className="text-[10px]">✓</span>}
              {quest.status}
            </div>
          </div>

          {/* Difficulty stars */}
          <div className="flex gap-1 mb-3">
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

          <p className="font-display text-sm text-kai-muted leading-relaxed mb-4">
            {quest.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {quest.tags.map(tag => (
              <span
                key={tag}
                className="font-pixel text-[7px] px-2 py-0.5 border border-kai-border text-kai-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-kai-border pt-3">
            <span className="font-pixel text-[7px] text-kai-muted">REWARD</span>
            <div className="flex items-center gap-3">
              <span className="font-pixel text-[9px]" style={{ color: quest.color }}>
                +{quest.reward}
              </span>
              {quest.gameType && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLaunchGame(quest);
                  }}
                  className="font-pixel text-[7px] px-2 py-1 bg-kai-red/20 border border-kai-red/40 text-kai-red hover:bg-kai-red/30 transition-colors"
                >
                  ▶ PLAY
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
