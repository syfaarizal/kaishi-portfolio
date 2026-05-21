import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="relative border-t border-kai-border py-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-kai-red to-transparent opacity-40 mb-8" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/assets/icon-kai-cat1.png"
              alt="Kai Shi"
              className="w-6 h-6 object-contain"
              style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #cc1133)' }}
            />
            <span className="font-pixel text-[8px] text-kai-red">KAI SHI</span>
          </div>

          <div className="font-pixel text-[7px] text-kai-muted text-center">
            &copy; 2025 KAI SHI. CRAFTED WITH{' '}
            <span className="text-kai-red">♥</span>{' '}
            AND WAY TOO MUCH CAFFEINE.
          </div>

          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-pixel text-[7px] text-kai-muted"
          >
            v3.0.0 ● ONLINE
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
