import { motion, AnimatePresence } from 'framer-motion';

interface CollectibleProps {
  x: number;
  y: number;
  collected: boolean;
}

export function Collectible({ x, y, collected }: CollectibleProps) {
  return (
    <AnimatePresence>
      {!collected && (
        <motion.div
          className="absolute flex items-center justify-center text-lg"
          style={{ left: `${x}%`, top: `${y}%`, width: '4%', height: '6%' }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          exit={{ opacity: 0, scale: 1.6 }}
        >
          <span style={{ filter: 'drop-shadow(0 0 6px #ffd23f)' }}>🟡</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
