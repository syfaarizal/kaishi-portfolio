import { ComingSoonGame } from '../ComingSoonGame';

interface AILabProps {
  onFinish: () => void;
  onExit: () => void;
}

export function AILab({ onExit }: AILabProps) {
  return <ComingSoonGame title="AI LABORATORY" icon="🧪" onExit={onExit} />;
}
