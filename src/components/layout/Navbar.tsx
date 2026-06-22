import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SectionId } from '../../App';

const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: 'INTRO',       id: 'hero'     },
  { label: 'PROFILE',     id: 'about'    },
  { label: 'INVENTOR',    id: 'skills'   },
  { label: 'QUEST BOARD', id: 'projects' },
  { label: 'PORTAL',      id: 'contact'  },
];

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="absolute top-0 left-0 right-0 z-[200]"
        style={{
          background: 'rgba(5,2,8,0.82)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1.5px solid rgba(204,17,51,0.6)',
          boxShadow: '0 2px 20px rgba(204,17,51,0.18), 0 1px 0 rgba(204,17,51,0.4)',
        }}
      >
        <div className="flex items-center justify-between px-5 xl:px-8" style={{ height: '58px' }}>

          {/* ── Logo ── */}
          <motion.button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 shrink-0 group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="relative w-9 h-9 flex items-center justify-center border border-[#3d0f1a] bg-[#0d0408]/80"
              style={{ clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)' }}
            >
              <img
                src="/assets/icon-kai-cat1.png"
                alt="Kai Shi"
                className="w-6 h-6 object-contain"
                style={{
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 0 5px #cc1133)',
                  transition: 'filter 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 10px #ff1144) brightness(1.2)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 5px #cc1133)')}
              />
              {/* Animated glow border */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ boxShadow: ['0 0 0px #cc1133', '0 0 10px rgba(204,17,51,0.6)', '0 0 0px #cc1133'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
            <span
              className="font-pixel text-[13px] text-[#cc1133] tracking-widest hidden sm:block"
              style={{ textShadow: '0 0 12px rgba(204,17,51,0.9), 0 0 25px rgba(204,17,51,0.4)' }}
            >
              KAI SHI
            </span>
          </motion.button>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.id}
                label={item.label}
                active={activeSection === item.id}
                onClick={() => onNavigate(item.id)}
              />
            ))}
          </div>

          {/* ── Right icons ── */}
          <div className="flex items-center gap-2 shrink-0">
            <HUDIcon
              src="/assets/icon-kai-love.png"
              alt="messages"
              onClick={() => onNavigate('contact')}
            />
            <HUDIcon
              src="/assets/icon-kai-console.png"
              alt="projects"
              onClick={() => onNavigate('projects')}
            />
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 border border-[#3d0f1a] bg-[#0d0408]/80 hover:border-[#cc1133] transition-colors touch-manipulation"
            >
              <span className="block w-5 h-[1.5px] bg-[#cc1133]" />
              <span className="block w-3.5 h-[1.5px] bg-[#cc1133]" />
              <span className="block w-5 h-[1.5px] bg-[#cc1133]" />
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: '1px solid rgba(61,15,26,0.8)', background: 'rgba(5,2,8,0.95)' }}
            >
              <div className="px-5 py-3 flex flex-col gap-1">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                    className="flex items-center gap-2 py-3.5 px-3 text-left transition-colors min-h-[44px] w-full touch-manipulation"
                    style={{ borderBottom: '1px solid rgba(61,15,26,0.4)' }}
                  >
                    <span
                      className="font-pixel text-[9px] tracking-widest"
                      style={{ color: activeSection === item.id ? '#cc1133' : '#7a6068' }}
                    >
                      <span style={{ color: '#cc1133', opacity: activeSection === item.id ? 1 : 0.5 }}>&gt; </span>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

/* ─── Nav link ─── */
function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-3.5 py-2 group"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      {/* Text */}
      <motion.span
        variants={{ hover: { x: [-1, 1, 0], transition: { duration: 0.18 } } }}
        className="font-pixel text-[10px] tracking-widest flex items-center gap-1.5 relative z-10"
        style={{
          color: active ? '#cc1133' : '#7a6068',
          textShadow: active ? '0 0 12px rgba(204,17,51,1), 0 0 25px rgba(204,17,51,0.5)' : 'none',
          transition: 'color 0.15s, text-shadow 0.15s',
        }}
        onMouseEnter={e => {
          if (!active) e.currentTarget.style.color = '#c0a0a8';
        }}
        onMouseLeave={e => {
          if (!active) e.currentTarget.style.color = '#7a6068';
        }}
      >
        <span style={{ color: '#cc1133', opacity: active ? 1 : 0.45 }}>&gt;</span>
        {label}
      </motion.span>

      {/* Active bottom bar */}
      {active && (
        <motion.div
          layoutId="navBar"
          className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-[#cc1133]"
          style={{ boxShadow: '0 0 8px #cc1133, 0 0 16px rgba(204,17,51,0.5)' }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}

      {/* Hover bg */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(204,17,51,0.06)', border: '1px solid rgba(204,17,51,0.18)' }}
      />
    </motion.button>
  );
}

/* ─── HUD icon button ─── */
function HUDIcon({ src, alt, onClick }: { src: string; alt: string; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center border border-[#3d0f1a] bg-[#0d0408]/80 transition-all hover:border-[#cc1133] group touch-manipulation"
      style={{ clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-5 h-5 object-contain transition-all duration-150"
        style={{ imageRendering: 'pixelated' }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 7px #cc1133) brightness(1.3)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
      />
    </motion.button>
  );
}