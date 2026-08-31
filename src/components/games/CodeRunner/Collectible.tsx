import { motion, AnimatePresence } from 'framer-motion';

interface CollectibleProps {
  x: number;
  y: number;
  collected: boolean;
}

const HAZARDS_SPRITE = '/assets/game/hazards-game.png';

export function Collectible({ x, y, collected }: CollectibleProps) {
  return (
    <AnimatePresence>
      {!collected && (
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ left: `${x}%`, top: `${y}%`, width: '4%', height: '6%' }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          exit={{ opacity: 0, scale: 1.6 }}
        >
          <img
            src={HAZARDS_SPRITE}
            alt="Collectible"
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,210,63,0.8))' }}
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
