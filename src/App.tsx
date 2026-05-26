import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScanlineOverlay } from './components/ui/ScanlineOverlay';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';

export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

const SECTIONS: SectionId[] = ['hero', 'about', 'skills', 'projects', 'contact'];

function getDirection(from: SectionId, to: SectionId) {
  return SECTIONS.indexOf(to) > SECTIONS.indexOf(from) ? 1 : -1;
}

// Glitch-swap page transition variants
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pageVariants: any = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    filter: 'brightness(2.5) saturate(4) hue-rotate(160deg) blur(2px)',
    skewX: dir > 0 ? 6 : -6,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'brightness(1) saturate(1) hue-rotate(0deg) blur(0px)',
    skewX: 0,
    transition: {
      x:      { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.22 },
      filter:  { duration: 0.4 },
      skewX:   { type: 'spring', stiffness: 320, damping: 28 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    filter: 'brightness(2.5) saturate(4) hue-rotate(-160deg) blur(2px)',
    skewX: dir > 0 ? -6 : 6,
    transition: {
      x:      { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.18 },
      filter:  { duration: 0.28 },
      skewX:   { duration: 0.22 },
    },
  }),
};

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useCallback((to: SectionId) => {
    if (to === activeSection || isTransitioning) return;
    setDirection(getDirection(activeSection, to));
    setIsTransitioning(true);
    setActiveSection(to);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [activeSection, isTransitioning]);

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':     return <Hero onNavigate={navigate} />;
      case 'about':    return <About onNavigate={navigate} />;
      case 'skills':   return <Skills />;
      case 'projects': return <Projects />;
      case 'contact':  return <Contact />;
      default:         return <Hero onNavigate={navigate} />;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-kai-bg text-kai-text relative">
      <ScanlineOverlay />
      <Navbar activeSection={activeSection} onNavigate={navigate} />

      {/* Page swap container */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 will-change-transform"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Section dot-nav (right side) */}
      <SectionDots active={activeSection} onNavigate={navigate} />
    </div>
  );
}

function SectionDots({ active, onNavigate }: {
  active: SectionId;
  onNavigate: (s: SectionId) => void;
}) {
  const labels: Record<SectionId, string> = {
    hero: 'INTRO', about: 'PROFILE', skills: 'INVENTOR',
    projects: 'QUEST BOARD', contact: 'PORTAL',
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[400] flex flex-col gap-3">
      {SECTIONS.map((s) => (
        <button
          key={s}
          onClick={() => onNavigate(s)}
          title={labels[s]}
          className="group relative flex items-center justify-center w-4 h-4"
        >
          <motion.span
            className="block w-2.5 h-2.5 border border-kai-red/70"
            animate={{
              background: active === s ? '#cc1133' : 'transparent',
              boxShadow: active === s
                ? '0 0 10px #cc1133, 0 0 20px rgba(204,17,51,0.5)'
                : '0 0 0px transparent',
              rotate: 45,
              scale: active === s ? 1.25 : 1,
            }}
            transition={{ duration: 0.25 }}
          />
          {/* Hover label */}
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-150 font-pixel text-[7px] text-kai-red whitespace-nowrap pointer-events-none"
            style={{ textShadow: '0 0 8px #cc1133' }}>
            {labels[s]}
          </span>
        </button>
      ))}
    </div>
  );
}

export default App;
