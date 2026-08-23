export type QuestStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PLANNING' | 'PLAYABLE';

export interface Quest {
  id: string;
  title: string;
  type: string;
  status: QuestStatus;
  difficulty: number;
  reward: string;
  tags: string[];
  description: string;
  color: string;
  xpReward: number;
  gameType?: 'code-runner' | 'bug-hunter' | 'ui-puzzle' | 'ai-lab';
}
