import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { ProgressBar } from '../ui/HUDFrame';
import { FloatingParticles } from '../ui/FloatingParticles';
import type { SectionId } from '../../App';

interface HeroProps {
  onNavigate: (id: SectionId) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax();

  const typedText = useTypingEffect(
    ['FRONTEND BUILDER', 'CONTENT CREATOR', 'ANIME ENJOYER', 'WEB ADVENTURER', 'CODE WEAVER'],
    75, 38, 1800
  );

  const charX = mouse.normalizedX * -16;
  const charY = mouse.normalizedY * -10;
  const bgX  = mouse.normalizedX * 10;
  const bgY  = mouse.normalizedY * 6;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
    >
      {/* ── Background image + parallax ── */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ x: bgX, y: bgY }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        style={{ scale: 1.06 }}
      >
        <img
          src="/assets/bg-hero-section.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.72) saturate(1.25)' }}
          draggable={false}
        />
        {/* left-side darkness so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060304]/90 via-[#060304]/55 to-transparent" />
        {/* top + bottom fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060304]/60 via-transparent to-[#060304]/80" />
      </motion.div>

      {/* ── Ambient particles ── */}
      <FloatingParticles count={18} />

      {/* ── Pixel grid ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(204,17,51,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(204,17,51,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ═══════════════════════════════════════════
          RED HUD FRAME  (inner to App's corner frame)
          ═══════════════════════════════════════════ */}
      <HUDScreenFrame />

      {/* ── CONTENT ── */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[1fr_auto] items-stretch pt-14 pb-2 px-6 lg:px-10 xl:px-14">

        {/* ────── LEFT COLUMN ────── */}
        <div className="flex flex-col justify-center gap-4 lg:gap-5 max-w-xl py-6">

          {/* Welcome label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="flex items-center gap-2"
          >
            <img src="/assets/icon-kai-pedang.png" alt="" className="w-4 h-4 object-contain opacity-70" style={{ imageRendering: 'pixelated' }} />
            <span className="font-pixel text-[8px] text-kai-muted tracking-[0.25em]">WELCOME TO MY PORTFOLIO</span>
            <span className="text-kai-muted/40 font-mono text-xs">～～～</span>
          </motion.div>

          {/* BIG NAME */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.65 }}
            className="font-pixel text-[clamp(2.6rem,7vw,5.5rem)] text-white leading-none glitch-text"
            data-text="KAI SHI"
            style={{ textShadow: '4px 4px 0 rgba(204,17,51,0.5), 0 0 40px rgba(204,17,51,0.3)' }}
          >
            KAI SHI
          </motion.h1>

          {/* Typing pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.45 }}
            className="inline-flex items-center gap-2 self-start border border-kai-border/80 px-4 py-2 bg-kai-panel/70 backdrop-blur-sm"
            style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
          >
            <img src="/assets/icon-kai-cat2.png" alt="" className="w-3.5 h-3.5 object-contain" style={{ imageRendering: 'pixelated' }} />
            <span className="font-pixel text-[9px] text-kai-text tracking-widest whitespace-nowrap">
              {typedText}
              <span className="animate-blink text-kai-red ml-0.5">_</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.5 }}
            className="space-y-0.5"
          >
            <p className="font-display text-[15px] text-kai-text/80 leading-relaxed">
              <span className="text-kai-red mr-1">◆</span>
              Crafting immersive web experiences with code,
              creativity, and anime-powered vibes.
            </p>
            <p
              className="font-mono text-[13px] text-kai-red ml-4 cursor-default transition-all hover:text-glow"
              style={{ textShadow: '0 0 6px rgba(204,17,51,0.5)' }}
            >
              Level up your digital journey.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.45 }}
          >
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-3 px-7 py-3 bg-kai-red hover:bg-kai-crimson transition-all duration-200 group relative overflow-hidden"
              style={{
                boxShadow: '0 0 24px rgba(204,17,51,0.45), 4px 4px 0 rgba(0,0,0,0.6)',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              <img src="/assets/icon-kai-pedang2.png" alt="" className="w-5 h-5 object-contain" style={{ imageRendering: 'pixelated' }} />
              <span className="font-pixel text-[9px] text-white tracking-widest">START JOURNEY</span>
              <span className="font-pixel text-[9px] text-white/50">&gt;</span>
              {/* shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            </button>
          </motion.div>
        </div>

        {/* ────── RIGHT COLUMN — character ────── */}
        <div className="hidden lg:flex items-end justify-end relative">
          <motion.div
            className="relative"
            animate={{ y: [0, -13, 0], rotate: [0, -0.4, 0.4, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ x: charX, y: charY }}
          >
            {/* Glow aura */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 blur-3xl rounded-full"
              animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(circle, #cc1133 0%, transparent 70%)' }}
            />
            <img
              src="/assets/kai-nobg-hero.png"
              alt="Kai Shi"
              className="relative z-10 h-[85vh] max-h-[700px] w-auto object-contain"
              style={{
                filter: 'drop-shadow(0 0 18px rgba(204,17,51,0.55)) drop-shadow(0 0 40px rgba(204,17,51,0.22))',
              }}
              draggable={false}
            />
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM HUD PANELS ── */}
      <BottomHUD onNavigate={onNavigate} />
    </div>
  );
}

/* ──────────────────────────────────────────────────
   HUD SCREEN FRAME — red border with decorations
   ────────────────────────────────────────────────── */
function HUDScreenFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* ── Solid border lines ── */}
      {/* Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-kai-red"
        style={{ boxShadow: '0 0 10px #cc1133, 0 0 28px rgba(204,17,51,0.5)' }} />
      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-kai-red"
        style={{ boxShadow: '0 0 10px #cc1133, 0 0 28px rgba(204,17,51,0.5)' }} />
      {/* Left */}
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-kai-red"
        style={{ boxShadow: '0 0 10px #cc1133, 0 0 28px rgba(204,17,51,0.5)' }} />
      {/* Right */}
      <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-kai-red"
        style={{ boxShadow: '0 0 10px #cc1133, 0 0 28px rgba(204,17,51,0.5)' }} />

      {/* ── Corner L-brackets ── */}
      {/* Top-Left */}
      <svg className="absolute top-0 left-0" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M2 36 L2 2 L36 2" stroke="#cc1133" strokeWidth="2" filter="url(#glow)" />
        <rect x="0" y="0" width="8" height="8" fill="#cc1133" opacity="0.9" />
      </svg>
      {/* Top-Right */}
      <svg className="absolute top-0 right-0" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M58 36 L58 2 L24 2" stroke="#cc1133" strokeWidth="2" filter="url(#glow)" />
        <rect x="52" y="0" width="8" height="8" fill="#cc1133" opacity="0.9" />
      </svg>
      {/* Bottom-Left */}
      <svg className="absolute bottom-0 left-0" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M2 24 L2 58 L36 58" stroke="#cc1133" strokeWidth="2" filter="url(#glow)" />
        <rect x="0" y="52" width="8" height="8" fill="#cc1133" opacity="0.9" />
      </svg>
      {/* Bottom-Right */}
      <svg className="absolute bottom-0 right-0" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M58 24 L58 58 L24 58" stroke="#cc1133" strokeWidth="2" filter="url(#glow)" />
        <rect x="52" y="52" width="8" height="8" fill="#cc1133" opacity="0.9" />
      </svg>

      {/* ── Top center diamond ornament ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-0">
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-kai-red" />
        <div className="w-3 h-3 bg-kai-red rotate-45 -mt-0.5 flex-shrink-0"
          style={{ boxShadow: '0 0 8px #cc1133' }} />
        <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-kai-red" />
      </div>

      {/* ── Bottom center diamond ornament ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-0">
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-kai-red" />
        <div className="w-3 h-3 bg-kai-red rotate-45 mt-0.5 flex-shrink-0"
          style={{ boxShadow: '0 0 8px #cc1133' }} />
        <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-kai-red" />
      </div>

      {/* ── Decorative tick marks on top border ── */}
      {[15, 25, 75, 85].map((pct) => (
        <div
          key={pct}
          className="absolute top-0 w-[1px] h-2 bg-kai-red/60"
          style={{ left: `${pct}%` }}
        />
      ))}
      {/* Same on bottom */}
      {[15, 25, 75, 85].map((pct) => (
        <div
          key={pct}
          className="absolute bottom-0 w-[1px] h-2 bg-kai-red/60"
          style={{ left: `${pct}%` }}
        />
      ))}
      {/* Tick marks on left and right borders */}
      {[20, 40, 60, 80].map((pct) => (
        <div key={`l${pct}`}
          className="absolute left-0 h-[1px] w-2 bg-kai-red/50"
          style={{ top: `${pct}%` }} />
      ))}
      {[20, 40, 60, 80].map((pct) => (
        <div key={`r${pct}`}
          className="absolute right-0 h-[1px] w-2 bg-kai-red/50"
          style={{ top: `${pct}%` }} />
      ))}

      {/* ── Pulsing glow sweep on top border ── */}
      <motion.div
        className="absolute top-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #ff1144, #ff4466, #ff1144, transparent)',
          boxShadow: '0 0 18px #cc1133',
          width: '120px',
        }}
        animate={{ left: ['-120px', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />
      {/* Same sweep on bottom */}
      <motion.div
        className="absolute bottom-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #ff1144, #ff4466, #ff1144, transparent)',
          boxShadow: '0 0 18px #cc1133',
          width: '120px',
          right: '-120px',
        }}
        animate={{ right: ['-120px', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2, delay: 2.5 }}
      />

      {/* ── Side scan lines (vertical sweep) ── */}
      <motion.div
        className="absolute left-0 w-[2px]"
        style={{
          background: 'linear-gradient(180deg, transparent, #ff4466, transparent)',
          height: '80px',
          boxShadow: '0 0 12px #cc1133',
        }}
        animate={{ top: ['-80px', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────
   BOTTOM HUD PANELS
   ────────────────────────────────────────────────── */
function BottomHUD({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="absolute bottom-3 left-4 right-4 z-10 flex items-end justify-between gap-3"
    >
      {/* ── Player Status ── */}
      <div
        className="pixel-border hud-panel flex items-center gap-3 px-3 py-2.5 min-w-0"
        style={{ maxWidth: '300px' }}
      >
        {/* Icon */}
        <div className="relative flex-shrink-0">
          <img
            src="/assets/icon-kai-cat2.png"
            alt="avatar"
            className="w-12 h-12 object-contain border border-kai-border"
            style={{ imageRendering: 'pixelated' }}
          />
          {/* Online dot */}
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-kai-bg rounded-full block"
            style={{ boxShadow: '0 0 6px #22c55e' }} />
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[8px] text-kai-muted shrink-0">PLAYER STATUS</span>
            <span className="text-kai-red text-[10px]">◆</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[7px] text-kai-muted">LVL</span>
            <span className="font-pixel text-base text-white leading-none" style={{ textShadow: '0 0 8px rgba(204,17,51,0.6)' }}>23</span>
            <img src="/assets/icon-kai-shild.png" alt="" className="w-4 h-4 object-contain" style={{ imageRendering: 'pixelated' }} />
          </div>
          <ProgressBar value={75} label="EXP" color="#cc1133" />
          <div className="flex justify-between items-center">
            <ProgressBar value={100} label="HP" color="#22c55e" />
            <span className="font-pixel text-[7px] text-kai-muted ml-2 shrink-0">850/850</span>
          </div>
        </div>
      </div>

      {/* ── Center: quick nav arrows ── */}
      <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onNavigate('contact')}
          className="font-pixel text-[7px] text-kai-muted border border-kai-border px-2 py-1 hover:border-kai-red hover:text-kai-red transition-colors"
        >
          &lt;&lt; LAST
        </button>
        <div className="flex flex-col gap-1 items-center">
          <span className="font-pixel text-[6px] text-kai-muted/50">SECTION</span>
          <div className="flex gap-1">
            {(['hero','about','skills','projects','contact'] as SectionId[]).map((s) => (
              <button
                key={s}
                onClick={() => onNavigate(s)}
                className="w-1.5 h-1.5 border border-kai-red/40 rotate-45 transition-all"
                style={{ background: s === 'hero' ? '#cc1133' : 'transparent' }}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => onNavigate('about')}
          className="font-pixel text-[7px] text-kai-muted border border-kai-border px-2 py-1 hover:border-kai-red hover:text-kai-red transition-colors"
        >
          NEXT &gt;&gt;
        </button>
      </div>

      {/* ── Current Quest ── */}
      <div
        className="pixel-border hud-panel flex items-center gap-3 px-3 py-2.5 min-w-0"
        style={{ maxWidth: '280px' }}
      >
        <img
          src="/assets/icon-kai-pedang2.png"
          alt="quest"
          className="w-10 h-10 object-contain flex-shrink-0"
          style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 8px #cc1133)' }}
        />
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[8px] text-kai-muted">CURRENT QUEST</span>
            <span className="text-kai-red text-[10px]">◆</span>
          </div>
          <div className="font-pixel text-[8px] text-white leading-tight tracking-wide">
            BUILD AMAZING WEBSITES
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[7px] text-kai-muted">3 / 5</span>
            <div className="flex-1 h-1.5 bg-kai-border rounded-sm overflow-hidden">
              <div className="h-full w-[60%] bg-kai-red rounded-sm"
                style={{ boxShadow: '0 0 6px #cc1133' }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
