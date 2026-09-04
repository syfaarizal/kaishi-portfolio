import { motion } from 'framer-motion';
import type { Quest } from '../../../types/quest';

interface QuestRewardProps {
  quest: Quest;
  onCollect: () => void;
}

// Corner brackets
function CornerBrackets({ color = '#cc1133', size = 16 }: { color?: string; size?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span style={{ position: 'absolute', width: size, height: size, top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, boxShadow: `0 0 8px ${color}66` }} />
      <span style={{ position: 'absolute', width: size, height: size, top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}`, boxShadow: `0 0 8px ${color}66` }} />
      <span style={{ position: 'absolute', width: size, height: size, bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}`, boxShadow: `0 0 8px ${color}66` }} />
      <span style={{ position: 'absolute', width: size, height: size, bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, boxShadow: `0 0 8px ${color}66` }} />
    </div>
  );
}

export function QuestReward({ quest, onCollect }: QuestRewardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(7,2,10,0.94)', backdropFilter: 'blur(8px)' }}
      onClick={onCollect}
    >
      {/* Burst rings */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: 60 + i * 50,
              height: 60 + i * 50,
              borderColor: `${quest.color}${Math.round(40 - i * 10).toString(16)}`,
              animation: `reward-ring 2s ease-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${quest.color}10 0%, transparent 70%)`,
        }}
      />

      <motion.div
        className="relative w-full max-w-sm text-center"
        style={{
          background: 'rgba(8,3,7,0.98)',
          border: `1px solid ${quest.color}40`,
          boxShadow: `0 0 60px ${quest.color}20, 0 0 120px ${quest.color}0a`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CornerBrackets color={quest.color} />

        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="relative p-6 sm:p-8"
        >
          {/* Celebration icon */}
          <div
            className="font-pixel text-4xl sm:text-5xl mb-3 sm:mb-4"
            style={{
              color: quest.color,
              textShadow: `0 0 20px ${quest.color}, 0 0 40px ${quest.color}60`,
              animation: 'reward-icon 1s ease-in-out infinite alternate',
            }}
          >
            ★
          </div>

          <h3
            className="font-pixel tracking-[0.3em] mb-2 sm:mb-3"
            style={{
              fontSize: 'clamp(14px, 3vw, 22px)',
              color: quest.color,
              textShadow: `0 0 20px ${quest.color}60`,
              animation: 'reward-title 0.5s ease-out',
            }}
          >
            QUEST COMPLETE
          </h3>

          <p
            className="mb-4 sm:mb-5"
            style={{ fontSize: 'clamp(10px, 1.5vw, 13px)', color: '#c7b5bd' }}
          >
            You conquered{' '}
            <span style={{ color: quest.color, fontWeight: 'bold' }}>{quest.title}</span>
          </p>

          {/* Reward amount */}
          <div
            className="font-pixel font-bold mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              color: quest.color,
              textShadow: `0 0 16px ${quest.color}, 0 0 32px ${quest.color}60`,
              animation: 'reward-count 0.6s ease-out 0.2s both',
            }}
          >
            +{quest.reward}
          </div>

          <motion.button
            onClick={onCollect}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            className="font-pixel w-full py-2.5 sm:py-3 text-white"
            style={{
              background: `linear-gradient(135deg, ${quest.color}, ${quest.color}aa)`,
              border: `1px solid ${quest.color}`,
              boxShadow: `0 0 20px ${quest.color}50`,
              fontSize: 'clamp(8px, 1.2vw, 10px)',
              letterSpacing: '0.2em',
              animation: 'collect-btn 2s ease-in-out infinite',
            }}
          >
            COLLECT REWARD
          </motion.button>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes reward-ring {
          0% { opacity: 0.6; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(1.4); }
        }
        @keyframes reward-icon {
          0% { transform: scale(1) rotate(-3deg); }
          100% { transform: scale(1.1) rotate(3deg); }
        }
        @keyframes reward-title {
          0% { opacity: 0; letter-spacing: 0.6em; }
          100% { opacity: 1; letter-spacing: 0.3em; }
        }
        @keyframes reward-count {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes collect-btn {
          0%, 100% { boxShadow: 0 0 16px ${quest.color}50; }
          50% { boxShadow: 0 0 30px ${quest.color}80, 0 0 50px ${quest.color}30; }
        }
      `}</style>
    </motion.div>
  );
}

