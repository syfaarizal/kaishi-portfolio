import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { FloatingParticles } from '../ui/FloatingParticles';
import type { SectionId } from '../../App';

const NAME_GLITCH_OFFSETS = [2, -2] as const;
const BUTTON_GLITCH_OFFSETS = [-2, 1, -1] as const;

/* ─── Periodic glitch flash hook ─── */
function useGlitchFlash(baseMs = 4000) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 75);
        setTimeout(() => setGlitching(true),  130);
        setTimeout(() => setGlitching(false), 210);
        schedule();
      }, baseMs + Math.random() * 2500);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [baseMs]);
  return glitching;
}

function useGlitchJitter(active: boolean, offsets: ReadonlyArray<number>): number {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    if (!active) {
      setOffset(0);
      return;
    }

    let index = 0;
    setOffset(offsets[index] ?? 0);

    const timer = setInterval(() => {
      index = (index + 1) % offsets.length;
      setOffset(offsets[index] ?? 0);
    }, 45);

    return () => clearInterval(timer);
  }, [active, offsets]);

  return offset;
}

const SECTIONS: SectionId[] = ['hero', 'about', 'skills', 'projects', 'contact'];
const LABELS: Record<SectionId, string> = {
  hero: 'INTRO', about: 'PROFILE', skills: 'INVENTOR',
  projects: 'QUEST BOARD', contact: 'PORTAL',
};

interface HeroProps { onNavigate: (id: SectionId) => void; }

export function Hero({ onNavigate }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax();
  const btnGlitch  = useGlitchFlash(3800);
  const nameGlitch = useGlitchFlash(5000);
  const nameGlitchOffset = useGlitchJitter(nameGlitch, NAME_GLITCH_OFFSETS);
  const buttonGlitchOffset = useGlitchJitter(btnGlitch, BUTTON_GLITCH_OFFSETS);

  const typedText = useTypingEffect(
    ['FRONTEND BUILDER', 'CONTENT CREATOR', 'ANIME ENJOYER', 'WEB ADVENTURER', 'CODE WEAVER'],
    70, 35, 1900
  );

  /* Parallax deltas */
  const charX = mouse.normalizedX * -16;
  const charY = mouse.normalizedY * -9;
  const bgX   = mouse.normalizedX * 10;
  const bgY   = mouse.normalizedY * 6;

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden select-none">

      {/* ─────── Background ─────── */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ x: bgX, y: bgY }}
        transition={{ type: 'spring', stiffness: 55, damping: 22 }}
        style={{ scale: 1.07 }}
      >
        <img
          src="/assets/bg-hero-section.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.72) saturate(1.28)' }}
          draggable={false}
        />
        {/* Left dark gradient — keeps text readable */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(4,1,10,0.94) 0%, rgba(4,1,10,0.72) 38%, rgba(4,1,10,0.28) 58%, rgba(4,1,10,0.05) 75%)' }} />
        {/* Top & bottom vignette */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(4,1,10,0.65) 0%, transparent 22%, transparent 72%, rgba(4,1,10,0.88) 100%)' }} />
      </motion.div>

      {/* ─────── Pixel grid ─────── */}
      <div className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'linear-gradient(rgba(204,17,51,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(204,17,51,0.07) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.22,
        }}
      />

      {/* ─────── Particles ─────── */}
      <FloatingParticles count={16} />

      {/* HUD SCREEN FRAME */}
      <HUDScreenFrame />

      {/*MAIN LAYOUT*/}
      <div
        className="relative z-10 h-full flex items-stretch"
        style={{ paddingTop: '58px', paddingBottom: '108px' }}
      >
        {/* ────── LEFT: text content ────── */}
        {/*  pl-[5vw] base + larger xl padding to push text slightly right, matching reference */}
        <div
          className="flex flex-col justify-center gap-[clamp(12px,1.8vh,22px)] w-full lg:w-[50%] xl:w-[46%]"
          style={{ paddingLeft: 'clamp(28px,5.5vw,80px)', paddingRight: '16px' }}
        >
          {/* Welcome label */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <img src="/assets/icon-kai-pedang.png" alt=""
              className="w-4 h-4 object-contain opacity-80"
              style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #cc1133)' }}
            />
            <span className="font-pixel text-[9px] uppercase tracking-[0.22em]"
              style={{ color: '#a09098' }}>
              Welcome to my portfolio
            </span>
            <span className="font-mono text-sm" style={{ color: 'rgba(160,144,152,0.38)' }}>～～～</span>
          </motion.div>

          {/* ──── BIG NAME ──── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
          >
            <h1
              className="font-pixel text-white leading-[1.05] relative"
              data-text="KAI SHI"
              style={{
                fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
                textShadow: nameGlitch
                  ? '4px 0 #ff0044, -4px 0 #0088ff, 0 0 30px #cc1133'
                  : '6px 5px 0 rgba(204,17,51,0.5), 0 0 45px rgba(204,17,51,0.32)',
                transform: nameGlitch ? `translate(${nameGlitchOffset}px, 0)` : 'none',
                transition: 'text-shadow 0.04s, transform 0.04s',
                letterSpacing: '0.03em',
              }}
            >
              {/* Glitch pseudo-layers (CSS-driven, always active) */}
              <span className="glitch-text relative" data-text="KAI SHI">KAI SHI</span>

              {/* JS-triggered glitch slice — over the text */}
              <AnimatePresence>
                {nameGlitch && (
                  <motion.span
                    key="nameGlitch"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    style={{ clipPath: 'inset(20% 0 55% 0)' }}
                  >
                    <span
                      className="font-pixel leading-[1.05] text-white block"
                      style={{
                        fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
                        transform: 'translate(4px, 0)',
                        color: '#ff2255',
                        opacity: 0.85,
                      }}
                    >KAI SHI</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </h1>
          </motion.div>

          {/* Typing subtitle pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.44 }}
            className="self-start"
          >
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5"
              style={{
                background: 'rgba(13,4,10,0.78)',
                border: '1px solid rgba(61,15,26,0.85)',
                clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
                boxShadow: '0 0 14px rgba(204,17,51,0.12), inset 0 0 12px rgba(0,0,0,0.4)',
              }}
            >
              <img src="/assets/icon-kai-cat2.png" alt=""
                className="w-4 h-4 object-contain shrink-0"
                style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #cc1133)' }}
              />
              <span className="font-pixel text-[10px] tracking-[0.16em] whitespace-nowrap"
                style={{ color: '#e8e0e3' }}>
                {typedText}
                <span className="animate-blink ml-0.5" style={{ color: '#cc1133' }}>_</span>
              </span>
              <img src="/assets/icon-kai-cat1.png" alt=""
                className="w-4 h-4 object-contain shrink-0 opacity-60"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.48 }}
            className="space-y-1"
          >
            <p className="font-display leading-relaxed" style={{ fontSize: '15px', color: 'rgba(232,224,227,0.88)' }}>
              <span style={{ color: '#cc1133', marginRight: '6px' }}>◆</span>
              Crafting immersive web experiences with code,<br />
              creativity, and anime-powered vibes.
            </p>
            <p className="font-mono" style={{
              fontSize: '13px', color: '#cc1133', marginLeft: '20px',
              textShadow: '0 0 10px rgba(204,17,51,0.6)',
            }}>
              Level up your digital journey.
            </p>
          </motion.div>

          {/* START JOURNEY button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.66, duration: 0.44 }}
          >
            <button
              onClick={() => onNavigate('about')}
              className="relative inline-flex items-center gap-3 overflow-hidden group"
              style={{
                padding: '13px 32px',
                background: btnGlitch ? '#ff2244' : '#cc1133',
                boxShadow: btnGlitch
                  ? '-3px 0 0 rgba(0,136,255,0.5), 3px 0 0 rgba(255,34,68,0.6), 0 0 30px rgba(255,34,68,0.65), 4px 4px 0 rgba(0,0,0,0.65)'
                  : '0 0 22px rgba(204,17,51,0.48), 4px 4px 0 rgba(0,0,0,0.65)',
                clipPath: 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))',
                transform: btnGlitch ? `translate(${buttonGlitchOffset}px, 0)` : 'none',
                transition: 'background 0.04s, box-shadow 0.04s',
              }}
            >
              {/* Sword icon */}
              <img src="/assets/icon-kai-pedang2.png" alt=""
                className="w-5 h-5 object-contain relative z-10 shrink-0"
                style={{
                  imageRendering: 'pixelated',
                  filter: btnGlitch ? 'brightness(1.8) hue-rotate(160deg)' : 'drop-shadow(0 0 4px rgba(255,200,200,0.6))',
                  transition: 'filter 0.04s',
                }}
              />
              {/* Label */}
              <span
                className="font-pixel relative z-10 tracking-widest"
                style={{
                  fontSize: '10px', color: '#ffffff',
                  textShadow: btnGlitch ? '2px 0 #ff4466, -2px 0 #0088ff' : '0 1px 4px rgba(0,0,0,0.5)',
                  transition: 'text-shadow 0.04s',
                }}
              >
                START JOURNEY
              </span>
              <span className="font-pixel relative z-10" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>&gt;</span>

              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              {/* Bottom highlight */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/18 pointer-events-none" />

              {/* Glitch slice overlay */}
              <AnimatePresence>
                {btnGlitch && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(transparent 28%,rgba(0,136,255,0.18) 28%,rgba(0,136,255,0.18) 36%,transparent 36%)' }}
                  />
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* ────── RIGHT: Character ────── */}
        <div className="hidden lg:flex items-end justify-center flex-1 relative overflow-visible">
          <motion.div
            className="relative h-full flex items-end justify-center"
            animate={{ y: [0, -13, 0], rotate: [0, -0.32, 0.32, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ x: charX, y: charY }}
          >
            {/* Ground glow aura */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 blur-3xl rounded-full pointer-events-none"
              animate={{ opacity: [0.2, 0.48, 0.2], scaleX: [0.85, 1.1, 0.85] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '70%', height: '110px', background: 'radial-gradient(ellipse, #cc1133 0%, transparent 70%)' }}
            />

            {/* Character — tall, fills the right side like the reference */}
            <img
              src="/assets/kai-nobg-hero.png"
              alt="Kai Shi"
              className="relative z-10 object-contain object-bottom"
              style={{
                height: 'calc(100vh - 40px)',
                maxHeight: '860px',
                minHeight: '500px',
                width: 'auto',
                filter: 'drop-shadow(0 0 20px rgba(204,17,51,0.6)) drop-shadow(0 0 55px rgba(204,17,51,0.24))',
              }}
              draggable={false}
            />
          </motion.div>
        </div>
      </div>

      {/* BOTTOM HUD PANELS */}
      <BottomHUD onNavigate={onNavigate} />
    </div>
  );
}

/* HUD SCREEN FRAME */
function HUDScreenFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* ── 4 border lines ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#cc1133]"
        style={{ boxShadow: '0 0 10px #cc1133, 0 0 28px rgba(204,17,51,0.5)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#cc1133]"
        style={{ boxShadow: '0 0 10px #cc1133, 0 0 28px rgba(204,17,51,0.5)' }} />
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#cc1133]"
        style={{ boxShadow: '0 0 10px #cc1133, 0 0 28px rgba(204,17,51,0.5)' }} />
      <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-[#cc1133]"
        style={{ boxShadow: '0 0 10px #cc1133, 0 0 28px rgba(204,17,51,0.5)' }} />

      {/* ── Corner L-brackets (4 corners) ── */}
      <CornerBracket pos="top-0 left-0"     path="M3 50 L3 3 L50 3"      sqX={0}  sqY={0} />
      <CornerBracket pos="top-0 right-0"    path="M10 3 L55 3 L55 50"    sqX={47} sqY={0} />
      <CornerBracket pos="bottom-0 left-0"  path="M3 10 L3 55 L50 55"    sqX={0}  sqY={47} />
      <CornerBracket pos="bottom-0 right-0" path="M10 55 L55 55 L55 10"  sqX={47} sqY={47} />

      {/* ── Top-center diamond ornament ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center">
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-[#cc1133]" />
        <div className="w-3.5 h-3.5 bg-[#cc1133] rotate-45 shrink-0 -mt-[1px]"
          style={{ boxShadow: '0 0 12px #cc1133, 0 0 4px #ff4466' }} />
        <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-[#cc1133]" />
      </div>
      {/* ── Bottom-center diamond ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center">
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-[#cc1133]" />
        <div className="w-3.5 h-3.5 bg-[#cc1133] rotate-45 shrink-0 mt-[1px]"
          style={{ boxShadow: '0 0 12px #cc1133, 0 0 4px #ff4466' }} />
        <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-[#cc1133]" />
      </div>

      {/* ── Tick marks ── */}
      {[12, 22, 78, 88].map(p => (
        <div key={`t${p}`} className="absolute top-0 w-px h-3.5 bg-[#cc1133]/55" style={{ left: `${p}%` }} />
      ))}
      {[12, 22, 78, 88].map(p => (
        <div key={`b${p}`} className="absolute bottom-0 w-px h-3.5 bg-[#cc1133]/55" style={{ left: `${p}%` }} />
      ))}
      {[25, 50, 75].map(p => (
        <div key={`l${p}`} className="absolute left-0 h-px w-3.5 bg-[#cc1133]/45" style={{ top: `${p}%` }} />
      ))}
      {[25, 50, 75].map(p => (
        <div key={`r${p}`} className="absolute right-0 h-px w-3.5 bg-[#cc1133]/45" style={{ top: `${p}%` }} />
      ))}

      {/* ── Sweeping glows ── */}
      <motion.div className="absolute top-0 h-[2px]"
        style={{ width: 140, background: 'linear-gradient(90deg,transparent,#ff2244,#ff5566,#ff2244,transparent)', boxShadow: '0 0 18px #cc1133' }}
        animate={{ left: [-140, '100%'] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />
      <motion.div className="absolute bottom-0 h-[2px]"
        style={{ width: 140, background: 'linear-gradient(90deg,transparent,#ff2244,#ff5566,#ff2244,transparent)', boxShadow: '0 0 18px #cc1133' }}
        animate={{ left: ['100%', -140] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', repeatDelay: 2, delay: 2.75 }}
      />
      <motion.div className="absolute left-0 w-[2px]"
        style={{ height: 100, background: 'linear-gradient(180deg,transparent,#ff4466,transparent)', boxShadow: '0 0 10px #cc1133' }}
        animate={{ top: [-100, '100%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
      />
    </div>
  );
}

function CornerBracket({ pos, path, sqX, sqY }: { pos: string; path: string; sqX: number; sqY: number }) {
  return (
    <svg className={`absolute ${pos}`} width="58" height="58" viewBox="0 0 58 58" fill="none">
      <path d={path} stroke="#cc1133" strokeWidth="2.5"
        style={{ filter: 'drop-shadow(0 0 5px #cc1133)' }} />
      <rect x={sqX} y={sqY} width="10" height="10" fill="#cc1133" opacity="0.95"
        style={{ filter: 'drop-shadow(0 0 4px #cc1133)' }} />
    </svg>
  );
}

/* BOTTOM HUD PANEL */
function BottomHUD({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.6 }}
      className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between"
      style={{ padding: '0 32px 16px' }}
    >

      {/* PLAYER STATUS (bottom-left) */}
      <div
        className="pixel-border hud-panel shrink-0"
        style={{
          width: 'clamp(240px, 23vw, 305px)',
          padding: '11px 15px 13px',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-1.5 mb-3">
          <span style={{ color: '#cc1133', fontSize: '11px' }}>◆</span>
          <span className="font-pixel tracking-widest" style={{ fontSize: '8px', color: '#cc1133' }}>PLAYER STATUS</span>
          <span style={{ color: '#cc1133', fontSize: '11px' }}>◆</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img src="/assets/icon-kai-cat2.png" alt=""
              className="object-contain border border-[#3d0f1a]"
              style={{ imageRendering: 'pixelated', width: '52px', height: '52px' }}
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#060304] rounded-full block"
              style={{ boxShadow: '0 0 7px #22c55e' }} />
          </div>

          {/* Stats */}
          <div className="flex-1 min-w-0 space-y-1.5">
            {/* LVL row */}
            <div className="flex items-center gap-2">
              <span className="font-pixel" style={{ fontSize: '8px', color: '#7a6068' }}>LVL</span>
              <span className="font-pixel text-white leading-none" style={{ fontSize: '22px', textShadow: '0 0 12px rgba(204,17,51,0.8)' }}>23</span>
              <img src="/assets/icon-kai-shild.png"  alt="" style={{ imageRendering: 'pixelated', width: '16px', height: '16px', objectFit: 'contain' }} />
              <img src="/assets/icon-kai-console.png" alt="" style={{ imageRendering: 'pixelated', width: '16px', height: '16px', objectFit: 'contain' }} />
            </div>

            {/* EXP */}
            <div>
              <div className="flex justify-between mb-0.5">
                <span className="font-pixel" style={{ fontSize: '8px', color: '#7a6068' }}>EXP</span>
                <span className="font-pixel" style={{ fontSize: '8px', color: '#cc1133' }}>75%</span>
              </div>
              <div className="h-2 rounded-sm overflow-hidden" style={{ background: '#1a0810' }}>
                <div className="h-full rounded-sm" style={{ width: '75%', background: 'linear-gradient(90deg,#8b0022,#cc1133)', boxShadow: '0 0 7px #cc1133' }} />
              </div>
            </div>

            {/* HP */}
            <div>
              <div className="flex justify-between mb-0.5">
                <span className="font-pixel" style={{ fontSize: '8px', color: '#7a6068' }}>HP</span>
                <span className="font-pixel" style={{ fontSize: '8px', color: '#4ade80' }}>850/850</span>
              </div>
              <div className="h-2 rounded-sm overflow-hidden" style={{ background: '#1a0810' }}>
                <div className="h-full rounded-sm" style={{ width: '100%', background: 'linear-gradient(90deg,#15803d,#22c55e)', boxShadow: '0 0 6px #22c55e' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER: Section nav */}
      <div className="hidden md:flex flex-col items-center gap-3 shrink-0 pb-3">
        {/* PREV / NEXT buttons — bigger, clearer */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 transition-all group"
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: '9px',
              color: '#7a6068',
              border: '1px solid rgba(61,15,26,0.9)',
              padding: '9px 16px',
              background: 'rgba(13,4,10,0.7)',
              clipPath: 'polygon(8px 0,100% 0,100% 100%,0 100%,0 8px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#cc1133';
              e.currentTarget.style.borderColor = '#cc1133';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(204,17,51,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#7a6068';
              e.currentTarget.style.borderColor = 'rgba(61,15,26,0.9)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '12px' }}>◀</span> PREV
          </button>

          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 transition-all group"
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: '9px',
              color: '#7a6068',
              border: '1px solid rgba(61,15,26,0.9)',
              padding: '9px 16px',
              background: 'rgba(13,4,10,0.7)',
              clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#cc1133';
              e.currentTarget.style.borderColor = '#cc1133';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(204,17,51,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#7a6068';
              e.currentTarget.style.borderColor = 'rgba(61,15,26,0.9)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            NEXT <span style={{ fontSize: '12px' }}>▶</span>
          </button>
        </div>

        {/* Section dots — bigger diamonds with labels */}
        <div className="flex items-center gap-3">
          {SECTIONS.map((s) => {
            const isActive = s === 'hero';
            return (
              <button
                key={s}
                onClick={() => onNavigate(s)}
                title={LABELS[s]}
                className="group relative flex items-center justify-center"
                style={{ width: '22px', height: '22px' }}
              >
                <motion.span
                  className="block border border-[#cc1133]/70"
                  animate={{
                    width: isActive ? '14px' : '10px',
                    height: isActive ? '14px' : '10px',
                    background: isActive ? '#cc1133' : 'transparent',
                    boxShadow: isActive ? '0 0 12px #cc1133, 0 0 24px rgba(204,17,51,0.4)' : 'none',
                    rotate: 45,
                  }}
                  transition={{ duration: 0.2 }}
                />
                {/* Label tooltip above */}
                <span
                  className="absolute -top-7 left-1/2 -translate-x-1/2 font-pixel whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ fontSize: '7px', color: '#cc1133', textShadow: '0 0 8px #cc1133' }}
                >
                  {LABELS[s]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CURRENT QUEST (bottom-right) */}
      <div
        className="pixel-border hud-panel shrink-0"
        style={{
          width: 'clamp(220px, 21vw, 280px)',
          padding: '11px 15px 13px',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-1.5 mb-3">
          <span style={{ color: '#cc1133', fontSize: '11px' }}>◆</span>
          <span className="font-pixel tracking-widest" style={{ fontSize: '8px', color: '#cc1133' }}>CURRENT QUEST</span>
          <span style={{ color: '#cc1133', fontSize: '11px' }}>◆</span>
        </div>

        <div className="flex items-center gap-3">
          <img src="/assets/icon-kai-pedang2.png" alt=""
            className="object-contain shrink-0"
            style={{ imageRendering: 'pixelated', width: '44px', height: '44px', filter: 'drop-shadow(0 0 9px #cc1133)' }}
          />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="font-pixel leading-snug tracking-wide" style={{ fontSize: '9px', color: '#ffffff' }}>
              BUILD AMAZING<br />WEBSITES
            </div>

            <div>
              <div className="flex justify-between mb-0.5">
                <span className="font-pixel" style={{ fontSize: '8px', color: '#7a6068' }}>PROGRESS</span>
                <span className="font-pixel" style={{ fontSize: '8px', color: '#cc1133' }}>3 / 5</span>
              </div>
              <div className="h-2 rounded-sm overflow-hidden" style={{ background: '#1a0810' }}>
                <div className="h-full rounded-sm" style={{ width: '60%', background: 'linear-gradient(90deg,#8b0022,#cc1133)', boxShadow: '0 0 7px #cc1133' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
