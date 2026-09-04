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
  PLAYABLE: '#cc1133',
};

// Animated pulse dot
function PulseDot({ color = '#cc1133', size = 5 }: { color?: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{
        width: size, height: size,
        background: color,
        boxShadow: `0 0 4px ${color}`,
        animation: 'grid-pulse 2.5s ease-in-out infinite',
      }}
    />
  );
}

// Corner bracket accent for anime HUD feel
function CornerBrackets({ color = '#cc1133', size = 12 }: { color?: string; size?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span
        className="absolute block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          width: size, height: size,
          top: 0, left: 0,
          borderTop: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
          boxShadow: `0 0 4px ${color}66`,
        }}
      />
      <span
        className="absolute block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          width: size, height: size,
          top: 0, right: 0,
          borderTop: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
          boxShadow: `0 0 4px ${color}66`,
        }}
      />
      <span
        className="absolute block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          width: size, height: size,
          bottom: 0, left: 0,
          borderBottom: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
          boxShadow: `0 0 4px ${color}66`,
        }}
      />
      <span
        className="absolute block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          width: size, height: size,
          bottom: 0, right: 0,
          borderBottom: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
          boxShadow: `0 0 4px ${color}66`,
        }}
      />
    </div>
  );
}

// Status badge with glow
function StatusBadge({ status, color, isCompleted }: { status: string; color: string; isCompleted: boolean }) {
  return (
    <div
      className="font-pixel flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 border shrink-0"
      style={{
        color,
        borderColor: `${color}44`,
        background: `${color}08`,
        fontSize: 'clamp(5px, 0.9vw, 7px)',
        boxShadow: isCompleted ? `0 0 6px ${color}44` : 'none',
        animation: status === 'PLAYABLE' ? 'badge-glow 2s ease-in-out infinite' : 'none',
      }}
    >
      {isCompleted && (
        <span style={{ fontSize: 'clamp(6px, 1.1vw, 10px)' }}>✓</span>
      )}
      {status}
      <style>{`
        @keyframes badge-glow {
          0%, 100% { boxShadow: 0 0 4px ${color}44; }
          50% { boxShadow: 0 0 10px ${color}66; }
        }
      `}</style>
    </div>
  );
}

// Difficulty stars
function DifficultyStars({ difficulty, color }: { difficulty: number; color: string }) {
  return (
    <div className="flex gap-0.5 sm:gap-1">
      {Array.from({ length: 5 }).map((_, si) => (
        <span
          key={si}
          style={{
            fontSize: 'clamp(7px, 1.2vw, 12px)',
            color: si < difficulty ? color : 'rgba(61,15,26,0.6)',
            textShadow: si < difficulty ? `0 0 6px ${color}66` : 'none',
          }}
        >
          ◆
        </span>
      ))}
    </div>
  );
}

// Play button with arcade feel
function PlayButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="font-pixel flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-kai-red/50 text-kai-red/80 hover:text-white hover:border-kai-red hover:bg-kai-red/20 transition-all"
      style={{
        fontSize: 'clamp(5px, 0.9vw, 7px)',
        boxShadow: '0 0 6px rgba(204,17,51,0.2)',
        animation: 'play-pulse 3s ease-in-out infinite',
      }}
    >
      <span style={{ fontSize: 'clamp(6px, 1vw, 10px)' }}>▶</span>
      PLAY
      <style>{`
        @keyframes play-pulse {
          0%, 100% { boxShadow: 0 0 4px rgba(204,17,51,0.2); }
          50% { boxShadow: 0 0 12px rgba(204,17,51,0.5); }
        }
      `}</style>
    </motion.button>
  );
}

export function QuestGrid({ quests, onSelectQuest, onLaunchGame, isQuestCompleted }: QuestGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      {quests.map((quest, i) => {
        const completed = isQuestCompleted(quest.id);
        return (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            whileHover={{ y: -5, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectQuest(quest)}
            className="group relative cursor-pointer overflow-hidden"
            style={{
              background: completed ? `${quest.color}07` : 'rgba(13,4,8,0.7)',
              border: `1px solid ${quest.color}28`,
              boxShadow: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${quest.color}55`;
              el.style.boxShadow = `0 0 20px ${quest.color}18, inset 0 0 30px ${quest.color}06`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${quest.color}28`;
              el.style.boxShadow = 'none';
            }}
          >
            <CornerBrackets color={quest.color} />

            {/* Left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5 group-hover:w-1 transition-all duration-200"
              style={{
                background: `linear-gradient(180deg, ${quest.color}, transparent)`,
                boxShadow: `0 0 8px ${quest.color}`,
              }}
            />

            {/* Inner glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${quest.color}0a 0%, transparent 70%)`,
              }}
            />

            {/* Content */}
            <div className="relative p-3 sm:p-4">
              {/* Top row: type + status */}
              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                <span
                  className="font-pixel tracking-[0.2em] shrink-0"
                  style={{
                    fontSize: 'clamp(5px, 0.9vw, 8px)',
                    color: '#7a6068',
                  }}
                >
                  {quest.type}
                </span>
                <StatusBadge status={quest.status} color={statusColor[quest.status]} isCompleted={completed} />
              </div>

              {/* Title */}
              <h3
                className="font-pixel tracking-wide mb-1.5 sm:mb-2 leading-tight"
                style={{
                  fontSize: 'clamp(11px, 1.8vw, 16px)',
                  color: '#e8d8dc',
                  transition: 'color 0.2s',
                }}
              >
                {quest.title}
              </h3>

              {/* Difficulty */}
              <div className="mb-2 sm:mb-3">
                <DifficultyStars difficulty={quest.difficulty} color={quest.color} />
              </div>

              {/* Description */}
              <p
                className="leading-relaxed mb-2.5 sm:mb-3"
                style={{
                  fontSize: 'clamp(9px, 1.3vw, 12px)',
                  color: '#7a6068',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {quest.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                {quest.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="font-pixel px-1 sm:px-1.5 py-0.5"
                    style={{
                      fontSize: 'clamp(5px, 0.85vw, 7px)',
                      border: '1px solid rgba(122,96,104,0.3)',
                      color: 'rgba(122,96,104,0.8)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {quest.tags.length > 3 && (
                  <span className="font-pixel px-1 py-0.5" style={{ fontSize: 'clamp(5px, 0.85vw, 7px)', color: 'rgba(122,96,104,0.5)' }}>
                    +{quest.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between pt-2 sm:pt-3"
                style={{ borderTop: '1px solid rgba(61,15,26,0.5)' }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-pixel"
                    style={{ fontSize: 'clamp(6px, 1vw, 9px)', color: 'rgba(122,96,104,0.7)' }}
                  >
                    REWARD
                  </span>
                  <span
                    className="font-pixel font-bold"
                    style={{ fontSize: 'clamp(8px, 1.3vw, 12px)', color: quest.color, textShadow: `0 0 8px ${quest.color}55` }}
                  >
                    +{quest.reward}
                  </span>
                </div>
                {quest.gameType && (
                  <PlayButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchGame(quest);
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      <style>{`
        @keyframes grid-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}

