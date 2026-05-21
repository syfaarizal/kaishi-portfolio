import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SectionId } from '../../App';

const navItems: { label: string; id: SectionId }[] = [
  { label: 'INTRO',       id: 'hero' },
  { label: 'PROFILE',     id: 'about' },
  { label: 'INVENTOR',    id: 'skills' },
  { label: 'QUEST BOARD', id: 'projects' },
  { label: 'PORTAL',      id: 'contact' },
];

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-[200]">
        {/* Top accent line under nav */}
        <div className="relative flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative">
              <img
                src="/assets/icon-kai-cat1.png"
                alt="Kai Shi"
                className="w-7 h-7 object-contain"
                style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 6px #cc1133)' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: ['0 0 0px #cc1133', '0 0 12px #cc1133', '0 0 0px #cc1133'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
            <span
              className="font-pixel text-[11px] text-kai-red tracking-widest hidden sm:block"
              style={{ textShadow: '0 0 10px rgba(204,17,51,0.8)' }}
            >
              KAI SHI
            </span>
          </motion.button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <NavLink
                  key={item.id}
                  label={item.label}
                  active={isActive}
                  onClick={() => onNavigate(item.id)}
                />
              );
            })}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <HUDIconBtn
              src="/assets/icon-kai-love.png"
              alt="love"
              onClick={() => onNavigate('contact')}
            />
            <HUDIconBtn
              src="/assets/icon-kai-console.png"
              alt="console"
              onClick={() => onNavigate('projects')}
            />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 border border-kai-border bg-kai-panel/80 hover:border-kai-red transition-colors"
            >
              <span className="block w-4 h-px bg-kai-red" />
              <span className="block w-3 h-px bg-kai-red" />
              <span className="block w-4 h-px bg-kai-red" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 bg-kai-panel/95 border-b border-kai-border backdrop-blur-md px-5 py-3 flex flex-col gap-1"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                  className={`font-pixel text-[9px] text-left py-2 px-3 tracking-widest transition-colors flex items-center gap-2
                    ${activeSection === item.id ? 'text-kai-red' : 'text-kai-muted hover:text-kai-text'}`}
                >
                  <span className="text-kai-red opacity-50">&gt;</span>
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-3 py-1.5 group"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      {/* Glitch flash on hover */}
      <motion.span
        variants={{
          hover: { x: [-1, 1, -1, 0], transition: { duration: 0.2 } }
        }}
        className={`font-pixel text-[9px] tracking-widest flex items-center gap-1.5 transition-colors duration-150 ${
          active ? 'text-kai-red' : 'text-kai-muted group-hover:text-kai-text'
        }`}
        style={active ? { textShadow: '0 0 10px rgba(204,17,51,0.9)' } : {}}
      >
        <span className={`text-kai-red transition-opacity ${active ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>&gt;</span>
        {label}
      </motion.span>

      {/* Active underline */}
      {active && (
        <motion.div
          layoutId="navUnderline"
          className="absolute bottom-0 left-2 right-2 h-px bg-kai-red"
          style={{ boxShadow: '0 0 6px #cc1133' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {/* Hover bg */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="absolute inset-0 bg-kai-red/5 border border-kai-red/20"
        style={{ pointerEvents: 'none' }}
      />
    </motion.button>
  );
}

function HUDIconBtn({ src, alt, onClick }: { src: string; alt: string; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-8 h-8 flex items-center justify-center border border-kai-border bg-kai-panel/80 hover:border-kai-red transition-colors group"
    >
      <img
        src={src}
        alt={alt}
        className="w-4 h-4 object-contain"
        style={{
          imageRendering: 'pixelated',
          filter: 'drop-shadow(0 0 0px #cc1133)',
          transition: 'filter 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 6px #cc1133)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 0px #cc1133)')}
      />
    </motion.button>
  );
}
