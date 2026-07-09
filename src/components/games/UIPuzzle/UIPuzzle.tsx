import { ComingSoonGame } from '../ComingSoonGame';

interface UIPuzzleProps {
  onFinish: () => void;
  onExit: () => void;
}

export function UIPuzzle({ onExit }: UIPuzzleProps) {
  return <ComingSoonGame title="UI PUZZLER" icon="🧩" onExit={onExit} />;
}
