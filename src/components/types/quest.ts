export type QuestCategory =
  | 'MINI GAMES'
  | 'WEB APPS'
  | 'AI'
  | 'TOOLS'
  | 'EXPERIMENTS';

export type QuestStatus = 'COMPLETED' | 'IN PROGRESS' | 'PLANNING';

export type GameKey = 'CODE_RUNNER' | 'BUG_HUNTER' | 'UI_PUZZLE' | 'AI_LAB';

export interface QuestControl {
  key: string;
  action: string;
}

export interface QuestReward {
  xp: number;
  badge?: string;
}

export interface Quest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: QuestCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  status: QuestStatus;
  reward: QuestReward;
  tech: string[];
  /** Emoji / short glyph used as thumbnail art (no external image assets required) */
  thumbnailIcon: string;
  accent: string;
  story: string;
  controls?: QuestControl[];
  objective: string[];
  github?: string;
  demo?: string;
  playable: boolean;
  gameComponent?: GameKey;
  locked: boolean;
  comingSoon?: boolean;
  isNew?: boolean;
}
