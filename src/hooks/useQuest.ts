import { useState, useCallback } from 'react';
import type { Quest } from '../types/quest';

const quests: Quest[] = [
  {
    id: '1',
    title: 'Anime Tracker Pro',
    type: 'WEB APP',
    status: 'COMPLETED',
    difficulty: 4,
    reward: '2000 XP',
    xpReward: 2000,
    tags: ['React', 'TypeScript', 'Supabase'],
    description: 'A full-stack anime tracking app with custom list management, review system, and social features.',
    color: '#cc1133',
    gameType: 'code-runner',
  },
  {
    id: '2',
    title: 'CyberDash UI Kit',
    type: 'DESIGN SYSTEM',
    status: 'COMPLETED',
    difficulty: 3,
    reward: '1500 XP',
    xpReward: 1500,
    tags: ['Tailwind', 'Figma', 'Storybook'],
    description: 'A cyberpunk-themed UI component library with 50+ components ready for production use.',
    color: '#9c27b0',
    gameType: 'ui-puzzle',
  },
  {
    id: '3',
    title: 'NekoStream',
    type: 'PLATFORM',
    status: 'IN_PROGRESS',
    difficulty: 5,
    reward: '5000 XP',
    xpReward: 5000,
    tags: ['Next.js', 'WebRTC', 'Node.js'],
    description: 'A live streaming platform built for anime content creators with low-latency tech stack.',
    color: '#ff6900',
    gameType: 'bug-hunter',
  },
  {
    id: '4',
    title: 'Portfolio v3',
    type: 'WEBSITE',
    status: 'COMPLETED',
    difficulty: 4,
    reward: '1800 XP',
    xpReward: 1800,
    tags: ['React', 'Framer Motion', 'TypeScript'],
    description: 'This very portfolio — cyberpunk-themed, pixel-art infused, and fully immersive.',
    color: '#cc1133',
  },
  {
    id: '5',
    title: 'WorldBuilder RPG',
    type: 'GAME',
    status: 'PLANNING',
    difficulty: 5,
    reward: '???',
    xpReward: 0,
    tags: ['Three.js', 'WebGL', 'GSAP'],
    description: 'A browser-based RPG world builder with procedural terrain generation.',
    color: '#3ecf8e',
    gameType: 'ai-lab',
  },
  {
    id: '6',
    title: 'AniBot Discord',
    type: 'BOT',
    status: 'COMPLETED',
    difficulty: 2,
    reward: '800 XP',
    xpReward: 800,
    tags: ['Node.js', 'Discord.js', 'APIs'],
    description: 'A feature-rich Discord bot for anime communities with recommendations and polls.',
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
