import { useState, useCallback } from 'react';
import type { Quest } from '../types/quest';

const quests: Quest[] = [
  {
    id: 'cr',
    title: 'CodeRunner',
    type: 'PLATFORMER',
    status: 'PLAYABLE',
    difficulty: 3,
    reward: '∞ XP',
    xpReward: 0,
    tags: ['Canvas', 'Game Loop', 'Platformer'],
    description: 'A side-scrolling pixel platformer. Jump, dash, and collect orbs while the HUD tracks your run.',
    color: '#cc1133',
    gameType: 'code-runner',
  },
  {
    id: 'bh',
    title: 'BugHunter',
    type: 'DEBUGGING',
    status: 'PLAYABLE',
    difficulty: 4,
    reward: '∞ XP',
    xpReward: 0,
    tags: ['Logic', 'Pattern Match', 'Time Trial'],
    description: 'Spot the bug. Click the broken line before the timer runs out. Sharper eyes = better score.',
    color: '#22c55e',
    gameType: 'bug-hunter',
  },
  {
    id: 'ui',
    title: 'UIPuzzle',
    type: 'PUZZLE',
    status: 'PLAYABLE',
    difficulty: 3,
    reward: '∞ XP',
    xpReward: 0,
    tags: ['Layout', 'CSS Grid', 'Spatial'],
    description: 'Drag and drop UI panels into the right slots. Beat the clock to clear the level.',
    color: '#9c27b0',
    gameType: 'ui-puzzle',
  },
  {
    id: 'ai',
    title: 'AILab',
    type: 'EXPERIMENT',
    status: 'PLAYABLE',
    difficulty: 2,
    reward: '∞ XP',
    xpReward: 0,
    tags: ['Prompts', 'Tokens', 'Playground'],
    description: 'A sandbox for prompt experiments. Tweak temperature, watch the output react, ship a working prompt.',
    color: '#3ecf8e',
    gameType: 'ai-lab',
  },
  {
    id: 'glitch',
    title: 'Glitch Synth',
    type: 'EXPERIMENT',
    status: 'IN_PROGRESS',
    difficulty: 2,
    reward: '???',
    xpReward: 0,
    tags: ['WebAudio', 'Oscillator', 'MIDI'],
    description: 'A browser synth that glitches on purpose. Currently wiring macro knobs and saving presets.',
    color: '#ff6900',
  },
  {
    id: 'arcade',
    title: 'Pixel Arcade',
    type: 'EXPERIMENT',
    status: 'PLANNING',
    difficulty: 5,
    reward: '???',
    xpReward: 0,
    tags: ['Three.js', 'Shaders', 'CRT FX'],
    description: 'A collection of micro-arcade cabinets rendered as a single 3D room. Early concept.',
    color: '#7289da',
  },
];

export function useQuest() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  const selectQuest = useCallback((quest: Quest) => {
    setSelectedQuest(quest);
    setShowGame(false);
  }, []);

  const closeQuest = useCallback(() => {
    setSelectedQuest(null);
    setShowGame(false);
  }, []);

  const launchGame = useCallback((quest: Quest) => {
    if (quest.gameType) {
      setSelectedQuest(quest);
      setShowGame(true);
    }
  }, []);

  const completeQuest = useCallback((questId: string) => {
    setCompletedQuests(prev =>
      prev.includes(questId) ? prev : [...prev, questId]
    );
    setShowGame(false);
  }, []);

  const isQuestCompleted = useCallback((questId: string) => {
    return completedQuests.includes(questId);
  }, [completedQuests]);

  return {
    quests,
    selectedQuest,
    showGame,
    selectQuest,
    closeQuest,
    launchGame,
    completeQuest,
    isQuestCompleted,
  };
}
