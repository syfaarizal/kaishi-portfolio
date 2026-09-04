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
  PLAYABLE: '#cc1133',
};

// Corner brackets for modal
function CornerBrackets({ color = '#cc1133', size = 14 }: { color?: string; size?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span style={{ position: 'absolute', width: size, height: size, top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, boxShadow: `0 0 8px ${color}66` }} />
      <span style={{ position: 'absolute', width: size, height: size, top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}`, boxShadow: `0 0 8px ${color}66` }} />
      <span style={{ position: 'absolute', width: size, height: size, bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}`, boxShadow: `0 0 8px ${color}66` }} />
      <span style={{ position: 'absolute', width: size, height: size, bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, boxShadow: `0 0 8px ${color}66` }} />
    </div>
  );
}

// Pulse dot
function PulseDot({ color = '#cc1133' }: { color?: string }) {
  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: 5, height: 5, background: color,
        boxShadow: `0 0 4px ${color}`,
        animation: 'detail-pulse 2s ease-in-out infinite',
      }}
    />
  );
}

export function QuestDetails({ quest, onClose, onLaunchGame, isCompleted }: QuestDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(7,2,10,0.92)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Ambient glow behind modal */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${quest.color}0a 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ scale: 0.88, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 16 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto"
        style={{
          background: `rgba(10,3,7,0.97)`,
          border: `1px solid ${quest.color}33`,
          boxShadow: `0 0 40px ${quest.color}18, 0 0 80px ${quest.color}08`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CornerBrackets color={quest.color} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center z-10 font-pixel text-[7px] border border-kai-border text-kai-muted hover:text-kai-red hover:border-kai-red/50 transition-all"
          style={{ fontSize: 'clamp(7px, 1vw, 10px)', padding: '2px 4px' }}
        >
          ✕
        </button>

        <div className="relative p-4 sm:p-6">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <PulseDot color={quest.color} />
              <span className="font-pixel" style={{ fontSize: 'clamp(6px, 1vw, 8px)', color: '#7a6068', letterSpacing: '0.2em' }}>
                {quest.type}
              </span>
              <PulseDot color={quest.color} />
            </div>
            <div
              className="font-pixel flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 border"
              style={{
                color: statusColor[quest.status],
                borderColor: `${statusColor[quest.status]}44`,
                background: `${statusColor[quest.status]}08`,
                fontSize: 'clamp(5px, 0.9vw, 7px)',
              }}
            >
              {isCompleted && <span style={{ fontSize: 'clamp(7px, 1.2vw, 10px)' }}>✓</span>}
              {quest.status}
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-pixel tracking-wider mb-2 sm:mb-3"
            style={{
              fontSize: 'clamp(14px, 3vw, 22px)',
              color: quest.color,
              textShadow: `0 0 20px ${quest.color}40, 0 0 40px ${quest.color}20`,
            }}
          >
            {quest.title}
          </h3>

          {/* Glowing divider */}
          <div className="relative h-px mb-3 sm:mb-4" style={{ background: `${quest.color}20` }}>
            <div
              className="absolute h-px"
              style={{
                width: '30%',
                background: `linear-gradient(90deg, ${quest.color}, transparent)`,
                animation: 'detail-rule 3s ease-in-out infinite',
              }}
            />
          </div>

          {/* Description */}
          <p
            className="leading-relaxed mb-4 sm:mb-5"
            style={{
              fontSize: 'clamp(10px, 1.5vw, 13px)',
              color: '#c7b5bd',
            }}
          >
            {quest.description}
          </p>

          {/* Difficulty */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <span className="font-pixel" style={{ fontSize: 'clamp(6px, 0.9vw, 8px)', color: '#7a6068', letterSpacing: '0.15em' }}>
              DIFFICULTY
            </span>
            <div className="flex gap-0.5 sm:gap-1">
              {Array.from({ length: 5 }).map((_, si) => (
                <span
                  key={si}
                  style={{
                    fontSize: 'clamp(8px, 1.4vw, 14px)',
                    color: si < quest.difficulty ? quest.color : 'rgba(61,15,26,0.6)',
                    textShadow: si < quest.difficulty ? `0 0 6px ${quest.color}66` : 'none',
                  }}
                >
                  ◆
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
            {quest.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-pixel px-2 sm:px-2.5 py-0.5 sm:py-1"
                style={{
                  fontSize: 'clamp(6px, 0.9vw, 8px)',
                  border: `1px solid rgba(122,96,104,0.3)`,
                  color: 'rgba(122,96,104,0.8)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Reward */}
          <div
            className="flex items-center justify-between mb-5 sm:mb-6"
            style={{ borderTop: `1px solid ${quest.color}20`, paddingTop: '12px' }}
          >
            <span className="font-pixel" style={{ fontSize: 'clamp(6px, 0.9vw, 8px)', color: '#7a6068', letterSpacing: '0.15em' }}>
              REWARD
            </span>
            <span
              className="font-pixel font-bold"
              style={{
                fontSize: 'clamp(14px, 2.5vw, 22px)',
                color: quest.color,
                textShadow: `0 0 12px ${quest.color}50`,
              }}
            >
              +{quest.reward}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            {quest.gameType && (
              <motion.button
                onClick={() => onLaunchGame(quest)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="flex-1 font-pixel flex items-center justify-center gap-2 py-2 sm:py-2.5 text-white"
                style={{
                  background: `linear-gradient(135deg, ${quest.color}, ${quest.color}aa)`,
                  border: `1px solid ${quest.color}`,
                  boxShadow: `0 0 16px ${quest.color}40`,
                  fontSize: 'clamp(7px, 1vw, 9px)',
                  letterSpacing: '0.15em',
                  animation: 'launch-glow 2.5s ease-in-out infinite',
                }}
              >
                <span style={{ fontSize: 'clamp(9px, 1.4vw, 12px)' }}>▶</span>
                LAUNCH QUEST
              </motion.button>
            )}
            <button
              onClick={onClose}
              className="font-pixel py-2 sm:py-2.5 text-center"
              style={{
                border: '1px solid rgba(122,96,104,0.3)',
                color: '#7a6068',
                fontSize: 'clamp(7px, 1vw, 9px)',
                letterSpacing: '0.1em',
              }}
            >
              [ CLOSE ]
            </button>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes detail-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes detail-rule {
          0%, 100% { width: 20%; opacity: 0.5; }
          50% { width: 50%; opacity: 1; }
        }
        @keyframes launch-glow {
          0%, 100% { boxShadow: 0 0 12px ${quest.color}40; }
          50% { boxShadow: 0 0 24px ${quest.color}60, 0 0 40px ${quest.color}20; }
        }
      `}</style>
    </motion.div>
  );
}

