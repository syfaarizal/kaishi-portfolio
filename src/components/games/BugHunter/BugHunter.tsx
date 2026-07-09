import { ComingSoonGame } from '../ComingSoonGame';

interface BugHunterProps {
  onFinish: () => void;
  onExit: () => void;
}

export function BugHunter({ onExit }: BugHunterProps) {
  return <ComingSoonGame title="BUG HUNTER" icon="🐞" onExit={onExit} />;
}
