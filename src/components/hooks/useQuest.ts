import { useCallback, useState } from 'react';
import type { Quest } from '../types/quest';

export type QuestCategoryFilter = 'ALL' | Quest['category'];

export function useQuest() {
  const [activeCategory, setActiveCategory] = useState<QuestCategoryFilter>('ALL');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const openQuest = useCallback((quest: Quest) => {
    if (quest.locked) return;
    setSelectedQuest(quest);
    setIsDetailsOpen(true);
    setIsGameStarted(false);
    setIsGameFinished(false);
  }, []);

  const closeQuest = useCallback(() => {
    setIsDetailsOpen(false);
    setIsGameStarted(false);
    setIsGameFinished(false);
    // Delay clearing the quest so exit animations can read it
    setTimeout(() => setSelectedQuest(null), 300);
  }, []);

  const startQuest = useCallback(() => {
    setIsGameStarted(true);
    setIsGameFinished(false);
  }, []);

  const finishQuest = useCallback(() => {
    setIsGameFinished(true);
  }, []);

  const exitGame = useCallback(() => {
    setIsGameStarted(false);
    setIsGameFinished(false);
  }, []);

  return {
    activeCategory,
    setActiveCategory,
    selectedQuest,
    isDetailsOpen,
    isGameStarted,
    isGameFinished,
    openQuest,
    closeQuest,
    startQuest,
    finishQuest,
    exitGame,
  };
}
