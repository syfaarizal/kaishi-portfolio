import { motion, AnimatePresence } from 'framer-motion';
import { useQuest } from '../../../hooks/useQuest';
import { QuestGrid } from './QuestGrid';
import { QuestDetails } from './QuestDetails';
import { QuestGameLauncher } from './QuestGameLauncher';
import { PixelGrid } from '../../ui/PixelGrid';

// Animated scanline overlay for cyber atmosphere
function ScanlineFX() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden opacity-[0.035]"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #cc1133 20%, #cc1133 80%, transparent)',
            top: `${(i * 13.7) % 100}%`,
            animation: `scanline-sweep ${3 + (i * 0.7)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes scanline-sweep {
          0%, 100% { opacity: 0.2; transform: translateX(-5%); }
          50% { opacity: 0.8; transform: translateX(5%); }
        }
      `}</style>
    </div>
  );
}

// Decorative corner bracket for anime HUD feel
function CornerBrackets({ color = '#cc1133', size = 16 }: { color?: string; size?: number }) {
  const s = size;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span
        className="absolute block"
        style={{
          width: s, height: s,
          top: 0, left: 0,
          borderTop: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
          boxShadow: `0 0 6px ${color}88`,
        }}
      />
      <span
        className="absolute block"
        style={{
          width: s, height: s,
          top: 0, right: 0,
          borderTop: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          boxShadow: `0 0 6px ${color}88`,
        }}
      />
      <span
        className="absolute block"
        style={{
          width: s, height: s,
          bottom: 0, left: 0,
          borderBottom: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
          boxShadow: `0 0 6px ${color}88`,
        }}
      />
      <span
        className="absolute block"
        style={{
          width: s, height: s,
          bottom: 0, right: 0,
          borderBottom: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          boxShadow: `0 0 6px ${color}88`,
        }}
      />
    </div>
  );
}

// Pulsing dot accent
function PulseDot({ color = '#cc1133', size = 6 }: { color?: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: size, height: size,
        background: color,
        boxShadow: `0 0 6px ${color}`,
        animation: 'pulse-dot 2s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </span>
  );
}

// Animated horizontal rule with glow
function GlowingRule({ color = '#cc1133' }: { color?: string }) {
  return (
    <div className="relative h-px w-full" style={{ background: `${color}18` }}>
      <div
        className="absolute inset-y-0 left-0 w-8"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
          animation: 'rule-pulse 3s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1"
        style={{
          background: color,
          boxShadow: `0 0 8px ${color}, 0 0 16px ${color}66`,
          animation: 'rule-dot 1.5s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes rule-pulse {
          0%, 100% { opacity: 0.6; width: 20%; }
          50% { opacity: 1; width: 40%; }
        }
        @keyframes rule-dot {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.5); }
        }
      `}</style>
    </div>
  );
}

export function QuestBoard() {
  const {
    quests,
    selectedQuest,
    showGame,
    selectQuest,
    closeQuest,
    launchGame,
    isQuestCompleted,
  } = useQuest();

  const playableCount = quests.filter(q => q.status === 'PLAYABLE').length;

  return (
    <section
      id="projects"
      className="relative h-screen overflow-hidden"
      style={{ background: '#07020a' }}
    >
      <PixelGrid />
      <ScanlineFX />

      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(204,17,51,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 md:py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-10 lg:mb-12"
          >
            {/* Top bar */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div
                className="h-px flex-1"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(204,17,51,0.5))',
                }}
              />
              <div className="flex items-center gap-2">
                <PulseDot />
                <span className="font-pixel text-[7px] sm:text-[8px] text-kai-red/70 tracking-[0.25em]">
                  QUEST BOARD
                </span>
                <PulseDot />
              </div>
              <div
                className="h-px flex-1"
                style={{
                  background: 'linear-gradient(90deg, rgba(204,17,51,0.5), transparent)',
                }}
              />
            </div>

            <GlowingRule />

            {/* Title row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mt-3 sm:mt-4 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="font-pixel text-kai-red shrink-0"
                  style={{
                    fontSize: 'clamp(16px, 3vw, 28px)',
                    textShadow: '0 0 20px rgba(204,17,51,0.5), 0 0 40px rgba(204,17,51,0.2)',
                    animation: 'title-glitch 8s ease-in-out infinite',
                  }}
                >
                  EXPERIMENTS & ARCADE
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="font-pixel text-[6px] sm:text-[7px] tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 border font-bold"
                  style={{
                    color: '#cc1133',
                    borderColor: 'rgba(204,17,51,0.5)',
                    boxShadow: '0 0 8px rgba(204,17,51,0.3)',
                    animation: 'status-pulse 2s ease-in-out infinite',
                  }}
                >
                  {playableCount} PLAYABLE
                </span>
                <span
                  className="font-pixel text-[6px] sm:text-[7px] tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 border"
                  style={{
                    color: '#7a6068',
                    borderColor: 'rgba(122,96,104,0.3)',
                  }}
                >
                  {quests.length} QUESTS
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-[9px] sm:text-[10px] md:text-[11px] text-kai-muted tracking-[0.15em] leading-relaxed">
              Interactive experiments & playable arcade games — click to inspect, play to conquer.
            </p>

            <style>{`
              @keyframes title-glitch {
                0%, 95%, 100% { textShadow: '0 0 20px rgba(204,17,51,0.5), 0 0 40px rgba(204,17,51,0.2)'; }
                96% { textShadow: '-2px 0 #ff0040, 2px 0 #00ffff, 0 0 20px rgba(204,17,51,0.5)'; }
                97% { textShadow: '2px 0 #ff0040, -2px 0 #00ffff, 0 0 20px rgba(204,17,51,0.5)'; }
                98% { textShadow: '0 0 20px rgba(204,17,51,0.5)'; }
              }
              @keyframes status-pulse {
                0%, 100% { boxShadow: '0 0 8px rgba(204,17,51,0.3)'; }
                50% { boxShadow: '0 0 16px rgba(204,17,51,0.6), 0 0 24px rgba(204,17,51,0.2)'; }
              }
            `}</style>
          </motion.div>

          {/* Quest Grid */}
          <QuestGrid
            quests={quests}
            onSelectQuest={selectQuest}
            onLaunchGame={launchGame}
            isQuestCompleted={isQuestCompleted}
          />
        </div>
      </div>

      {/* Quest Details Modal */}
      <AnimatePresence>
        {selectedQuest && !showGame && (
          <QuestDetails
            quest={selectedQuest}
            onClose={closeQuest}
            onLaunchGame={launchGame}
            isCompleted={isQuestCompleted(selectedQuest.id)}
          />
        )}
      </AnimatePresence>

      {/* Game Launcher Modal */}
      <AnimatePresence>
        {selectedQuest && showGame && (
          <QuestGameLauncher
            quest={selectedQuest}
            onClose={closeQuest}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

