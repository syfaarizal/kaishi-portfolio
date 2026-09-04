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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(7,2,10,0.96)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${quest.color}08 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ scale: 0.9, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 16 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-hidden flex flex-col"
        style={{
          background: 'rgba(8,3,7,0.98)',
          border: `1px solid ${quest.color}30`,
          boxShadow: `0 0 40px ${quest.color}18, 0 0 80px ${quest.color}08`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner brackets */}
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
          <span style={{ position: 'absolute', width: 14, height: 14, top: 0, left: 0, borderTop: `2px solid ${quest.color}`, borderLeft: `2px solid ${quest.color}`, boxShadow: `0 0 6px ${quest.color}66` }} />
          <span style={{ position: 'absolute', width: 14, height: 14, top: 0, right: 0, borderTop: `2px solid ${quest.color}`, borderRight: `2px solid ${quest.color}`, boxShadow: `0 0 6px ${quest.color}66` }} />
          <span style={{ position: 'absolute', width: 14, height: 14, bottom: 0, left: 0, borderBottom: `2px solid ${quest.color}`, borderLeft: `2px solid ${quest.color}`, boxShadow: `0 0 6px ${quest.color}66` }} />
          <span style={{ position: 'absolute', width: 14, height: 14, bottom: 0, right: 0, borderBottom: `2px solid ${quest.color}`, borderRight: `2px solid ${quest.color}`, boxShadow: `0 0 6px ${quest.color}66` }} />
        </div>

        {/* Game Header */}
        <div
          className="flex items-center justify-between p-3 sm:p-4 shrink-0"
          style={{ borderBottom: `1px solid ${quest.color}20` }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block rounded-full"
              style={{
                width: 6, height: 6, background: quest.color,
                boxShadow: `0 0 6px ${quest.color}`,
                animation: 'launch-dot 1.5s ease-in-out infinite',
              }}
            />
            <span className="font-pixel" style={{ fontSize: 'clamp(6px, 0.9vw, 8px)', color: '#7a6068', letterSpacing: '0.2em' }}>
              NOW PLAYING
            </span>
          </div>
          <h3 className="font-pixel text-white" style={{ fontSize: 'clamp(11px, 1.8vw, 15px)' }}>
            {quest.title}
          </h3>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="font-pixel flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 border"
            style={{
              fontSize: 'clamp(6px, 0.9vw, 8px)',
              color: '#7a6068',
              borderColor: 'rgba(122,96,104,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            ✕ EXIT
          </motion.button>
        </div>

        {/* Game Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <GameComponent quest={quest} onComplete={onClose} />
        </div>

        <style>{`
          @keyframes launch-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}

