import { motion } from 'framer-motion';

interface ComingSoonGameProps {
  title: string;
  icon: string;
  onExit: () => void;
}

export function ComingSoonGame({ title, icon, onExit }: ComingSoonGameProps) {
  return (
    <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center gap-4 border border-kai-border">
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="text-4xl"
      >
        {icon}
      </motion.span>
      <h4 className="font-pixel text-sm text-kai-red">{title}</h4>
      <p className="font-pixel text-[8px] text-kai-muted">MODULE UNDER CONSTRUCTION</p>
      <button
        onClick={onExit}
        className="font-pixel text-[8px] px-4 py-2.5 border border-kai-border text-kai-muted hover:text-kai-red hover:border-kai-red transition-colors"
      >
        RETURN TO BRIEFING
      </button>
    </div>
  );
}
