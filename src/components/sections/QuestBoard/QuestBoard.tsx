import { motion, AnimatePresence } from 'framer-motion';
import { useQuest } from '../../../hooks/useQuest';
import { QuestGrid } from './QuestGrid';
import { QuestDetails } from './QuestDetails';
import { QuestGameLauncher } from './QuestGameLauncher';
import { PixelGrid } from '../../ui/PixelGrid';

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

  const completedCount = quests.filter(q => q.status === 'COMPLETED').length;

  return (
    <section id="projects" className="relative py-24 overflow-hidden min-h-screen">
      <PixelGrid />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-kai-red opacity-40" />
            <span className="font-pixel text-[9px] text-kai-red tracking-widest">[ QUEST BOARD ]</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-kai-red opacity-40" />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-pixel text-xl text-white" style={{ textShadow: '0 0 20px rgba(204,17,51,0.4)' }}>
              COMPLETED & ACTIVE QUESTS
            </h2>
            <span className="font-pixel text-[8px] text-kai-muted border border-kai-border px-3 py-1">
              {completedCount} / {quests.length} DONE
            </span>
          </div>
        </motion.div>

        {/* Quest Grid */}
        <QuestGrid
          quests={quests}
          onSelectQuest={selectQuest}
          onLaunchGame={launchGame}
          isQuestCompleted={isQuestCompleted}
        />
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
