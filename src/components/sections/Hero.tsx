import { useRef, useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import type { SectionId } from '../../App';
import { KaiShiChatModal } from '../ui/KaiShiChatModal';

/* Glitch flash hook */
function useGlitchFlash(baseMs = 5000) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const fire = () => {
      setOn(true);
      setTimeout(() => setOn(false), 65);
      setTimeout(() => setOn(true),  115);
      setTimeout(() => setOn(false), 185);
      t = setTimeout(fire, baseMs + Math.random() * 2800);
    };
    t = setTimeout(fire, 1200 + Math.random() * baseMs);
    return () => clearTimeout(t);
  }, [baseMs]);
  return on;
}

function useGlitchShift(active: boolean, options: number[]) {
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (!active) return;

    const timer = window.setTimeout(() => {
      setShift(options[Math.floor(Math.random() * options.length)]);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [active, options]);

  return shift;
}

const SECTIONS: SectionId[] = ['hero', 'about', 'skills', 'projects', 'contact'];
const NAME_GLITCH_SHIFTS = [-3, 2, -2, 3];
const BUTTON_GLITCH_SHIFTS = [-3, 2, -2];
const LABELS: Record<SectionId, string> = {
  hero: 'INTRO', about: 'PROFILE', skills: 'INVENTOR',
  projects: 'QUEST BOARD', contact: 'PORTAL',
};

interface HeroProps { onNavigate: (id: SectionId) => void; }

/* HERO */
export function Hero({ onNavigate }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouse       = useMouseParallax();
  const btnGlitch   = useGlitchFlash(4200);
  const nameGlitch  = useGlitchFlash(5500);
  const scanGlitch  = useGlitchFlash(3800); // for scan lines around name
  const nameGlitchShift = useGlitchShift(nameGlitch, NAME_GLITCH_SHIFTS);
  const buttonGlitchShift = useGlitchShift(btnGlitch, BUTTON_GLITCH_SHIFTS);
  const [chatOpen, setChatOpen] = useState(false);

  const typedText = useTypingEffect(
    ['FRONTEND BUILDER', 'CONTENT CREATOR', 'ANIME ENJOYER', 'WEB ADVENTURER', 'CODE WEAVER'],
    68, 34, 2000
  );

  /* Dual-layer parallax — same 1672×941 images, different speeds & direction */
  const bgX   = mouse.normalizedX * 7;
  const bgY   = mouse.normalizedY * 4;
  const charX = mouse.normalizedX * -20;
  const charY = mouse.normalizedY * -12;

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden select-none">

      {/* BG — slow parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ x: bgX, y: bgY }}
        transition={{ type: 'spring', stiffness: 55, damping: 22 }}
        style={{ scale: 1.07 }}
      >
        <img
          src="/assets/KaiShi-Main.png" alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.52) saturate(1.2)' }}
          draggable={false}
        />
      </motion.div>

      {/* GRADIENT MASKS */}
      {/* Strong top dark band for name text */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(4,1,10,0.93) 0%, rgba(4,1,10,0.75) 12%, rgba(4,1,10,0.3) 30%, transparent 46%)'
      }} />
      {/* Strong bottom dark band for HUD */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(4,1,10,0.97) 0%, rgba(4,1,10,0.85) 12%, rgba(4,1,10,0.5) 26%, rgba(4,1,10,0.12) 40%, transparent 52%)'
      }} />
      {/* Edge vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 85% at 50% 48%, transparent 40%, rgba(4,1,10,0.45) 100%)'
      }} />

      {/* PIXEL GRID */}
      <div className="pointer-events-none absolute inset-0 z-[3]" style={{
        backgroundImage: 'linear-gradient(rgba(204,17,51,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(204,17,51,0.06) 1px,transparent 1px)',
        backgroundSize: '40px 40px', opacity: 0.18,
      }} />

      <motion.div
        className="absolute inset-0 z-[4]"
        animate={{ x: charX, y: charY }}
        transition={{ type: 'spring', stiffness: 48, damping: 20 }}
        style={{ scale: 1.05 }}
      >
        <img
          src="/assets/kai-nobg-hero.png" alt="Kai Shi"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.62) saturate(1.15) drop-shadow(0 0 28px rgba(204,17,51,0.45))',
          }}
          draggable={false}
        />
        {/* Feet glow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: '55%', height: '110px', background: 'radial-gradient(ellipse, rgba(204,17,51,0.2) 0%, transparent 70%)', filter: 'blur(18px)' }}
          animate={{ opacity: [0.55, 1, 0.55], scaleX: [0.88, 1.12, 0.88] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Additional character top-darkener so name text pops */}
      <div className="absolute inset-0 z-[5] pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(4,1,10,0.55) 0%, rgba(4,1,10,0.2) 18%, transparent 35%)'
      }} />
      {/* Mid-section darkener — behind description text */}
      <div className="absolute inset-0 z-[5] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 38% at 50% 68%, rgba(4,1,10,0.72) 0%, rgba(4,1,10,0.45) 55%, transparent 100%)'
      }} />

      {/* HUD SCREEN FRAME */}
      <HUDScreenFrame />

      {/* TOP TEXT BLOCK — fully centered */}
      <div
        className="absolute left-0 right-0 z-[10] flex flex-col items-center px-3 sm:px-0"
        style={{ top: 'clamp(150px, 32vh, 300px)', paddingTop: 'clamp(14px, 2.8vh, 32px)' }}
      >
        {/* Welcome label */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-1.5 sm:gap-2 mb-2 px-2 text-center"
        >
          <img src="/assets/icon-kai-pedang.png" alt=""
            style={{ width: '13px', height: '13px', objectFit: 'contain', imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #cc1133)', opacity: 0.8, flexShrink: 0 }}
          />
          <span className="font-pixel uppercase tracking-[0.16em] sm:tracking-[0.22em]"
            style={{ fontSize: 'clamp(8px, 2vw, 10px)', color: '#fff' }}>
            Welcome to my portfolio
          </span>
          <span className="font-mono hidden sm:inline" style={{ fontSize: '12px', color: '#fff' }}>～～～</span>
        </motion.div>

        {/* ── NAME: KAI SHI (centered, huge) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center mb-3"
        >
          {/* Glitch scan-lines that flash above/below name */}
          <AnimatePresence>
            {scanGlitch && (
              <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-x-[-20%] pointer-events-none z-10">
                {/* Top scan line */}
                <motion.div className="absolute w-full h-px bg-[#ff2244]"
                  style={{ top: '-6px', boxShadow: '0 0 8px #ff2244', opacity: 0.8 }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 0.12, ease: 'linear' }}
                />
                {/* Bottom scan line */}
                <motion.div className="absolute w-full h-px bg-[#0088ff]"
                  style={{ bottom: '-6px', boxShadow: '0 0 8px #0088ff', opacity: 0.6 }}
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative corner marks around name */}
          <NameCornerMarks glitch={scanGlitch} />

          {/* The actual name */}
          <h1
            className="font-pixel text-white text-center relative"
            style={{
              fontSize: 'clamp(2.75rem, 15vw, 8rem)',
              lineHeight: 0.92,
              letterSpacing: '0.06em',
              wordSpacing: '-0.5em',
              textShadow: nameGlitch
                ? '5px 0 #ff0044, -5px 0 #0088ff, 0 0 50px rgba(255,34,68,0.9)'
                : '6px 5px 0 rgba(204,17,51,0.6), 0 0 55px rgba(204,17,51,0.35)',
              transform: nameGlitch ? `translateX(${nameGlitchShift}px)` : 'none',
              transition: 'text-shadow 0.04s, transform 0.04s',
              padding: '0 8px',
            }}
          >
            <span className="glitch-text" data-text="KAI SHI">KAI SHI</span>

            {/* JS glitch slice overlay */}
            <AnimatePresence>
              {nameGlitch && (
                <motion.span key="ng"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 overflow-hidden pointer-events-none flex items-start justify-center"
                  style={{ clipPath: 'inset(20% 0 55% 0)' }}
                >
                  <span className="font-pixel text-center"
                    style={{
                      fontSize: 'clamp(2.75rem, 15vw, 8rem)', lineHeight: 0.92, letterSpacing: '0.06em',
                      color: '#ff2255', transform: 'translateX(6px)', opacity: 0.8, whiteSpace: 'nowrap',
                    }}>
                    KAI SHI
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </h1>
        </motion.div>

        {/* ── Typing pill (centered) ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.44 }}
          className="mb-4 px-3 max-w-full"
        >
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-2.5 max-w-full" style={{
            background: 'rgba(8,2,6,0.82)',
            border: '1px solid rgba(61,15,26,0.9)',
            clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
            boxShadow: '0 0 14px rgba(204,17,51,0.1)',
          }}>
            <img src="/assets/icon-kai-cat2.png" alt=""
              style={{ width: '14px', height: '14px', objectFit: 'contain', imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #cc1133)', flexShrink: 0 }}
            />
            <span className="font-pixel tracking-[0.1em] sm:tracking-[0.16em] whitespace-nowrap overflow-hidden" style={{ fontSize: 'clamp(8px, 2.4vw, 10px)', color: '#e8e0e3' }}>
              {typedText}
              <span className="animate-blink ml-0.5" style={{ color: '#cc1133' }}>_</span>
            </span>
            <img src="/assets/icon-kai-cat1.png" alt=""
              style={{ width: '14px', height: '14px', objectFit: 'contain', imageRendering: 'pixelated', opacity: 0.5, flexShrink: 0 }}
            />
          </div>
        </motion.div>

        {/* ── Description (centered, bigger) ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.44 }}
          className="flex flex-col items-center gap-1 text-center px-4 sm:px-6 py-2.5 sm:py-3 mx-3 sm:mx-4 max-w-[94vw] sm:max-w-none"
          style={{
            background: 'rgba(4,1,10,0.62)',
            border: '1px solid rgba(61,15,26,0.5)',
            backdropFilter: 'blur(6px)',
            clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
          }}
        >
          <p className="font-display text-center" style={{
            fontSize: 'clamp(12.5px, 3.2vw, 17px)',
            color: 'rgba(232,224,227,0.88)',
            lineHeight: 1.6,
            textShadow: '0 1px 8px rgba(0,0,0,0.8)',
          }}>
            <span style={{ color: '#cc1133', marginRight: '7px' }}>◆</span>
            Crafting immersive web experiences with code,<br />
            creativity, and anime-powered vibes.
          </p>
          <p className="font-mono" style={{
            fontSize: 'clamp(11.5px, 2.8vw, 15px)',
            color: '#cc1133',
            textShadow: '0 0 12px rgba(204,17,51,0.65)',
            letterSpacing: '0.04em',
          }}>
            Level up your digital journey.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.62, duration: 0.55 }}
        className="absolute inset-x-0 z-[14] flex flex-col items-center gap-2.5 sm:gap-3 px-3 pb-5"
        style={{
          /* START JOURNEY + AI CTA sit above the nav strip */
          bottom: 'calc(-10px + clamp(88px, 11vh, 110px) + 35px)',
        }}
      >
        {/* Hint */}
        <span className="font-pixel" style={{ fontSize: 'clamp(6px, 1.6vw, 7px)', color: 'rgba(160,144,152,1)', letterSpacing: '0.22em' }}>
          ◆ TAP TO BEGIN ◆
        </span>

        {/* START JOURNEY */}
        <div className="relative">
          {/* Pulsing outer ring */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              inset: '-6px',
              border: '1px solid rgba(204,17,51,0.35)',
              clipPath: 'polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px))',
            }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.97, 1.02, 0.97] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <button
            onClick={() => onNavigate('about')}
            className="relative flex items-center gap-2 sm:gap-3 overflow-hidden group"
            style={{
              padding: 'clamp(11px, 3vw, 15px) clamp(24px, 8vw, 44px)',
              background: btnGlitch ? '#ff2244' : '#cc1133',
              clipPath: 'polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))',
              boxShadow: btnGlitch
                ? '-4px 0 0 rgba(0,140,255,0.5), 4px 0 0 rgba(255,34,68,0.5), 0 0 35px rgba(255,34,68,0.65), 5px 5px 0 rgba(0,0,0,0.7)'
                : '0 0 30px rgba(204,17,51,0.52), 5px 5px 0 rgba(0,0,0,0.7)',
              transform: btnGlitch ? `translateX(${buttonGlitchShift}px)` : 'none',
              transition: 'background 0.05s, box-shadow 0.05s, transform 0.05s',
              minWidth: 'min(240px, 78vw)',
              justifyContent: 'center',
            }}
          >
            <img src="/assets/icon-kai-pedang.png" alt=""
              style={{
                width: 'clamp(22px, 6vw, 30px)', height: 'clamp(22px, 6vw, 30px)', objectFit: 'contain', imageRendering: 'pixelated',
                filter: btnGlitch ? 'brightness(1.9) hue-rotate(150deg)' : 'drop-shadow(0 0 5px rgba(255,200,200,0.5))',
                transition: 'filter 0.05s', flexShrink: 0, position: 'relative', zIndex: 1,
              }}
            />
            <span className="font-pixel tracking-widest relative whitespace-nowrap"
              style={{
                fontSize: 'clamp(9px, 2.6vw, 11px)', color: '#fff', zIndex: 1,
                textShadow: btnGlitch ? '3px 0 #ff4466, -3px 0 #0088ff' : '0 1px 4px rgba(0,0,0,0.5)',
                transition: 'text-shadow 0.05s',
              }}>
              START JOURNEY
            </span>
            <span className="font-pixel relative" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', zIndex: 1 }}>&gt;</span>

            {/* Shine sweep on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'rgba(255,255,255,0.16)' }} />

            {/* Glitch slice */}
            <AnimatePresence>
              {btnGlitch && (
                <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(transparent 28%,rgba(0,140,255,0.18) 28%,rgba(0,140,255,0.18) 37%,transparent 37%)' }}
                />
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── AI KAI SHI CTA ── */}
        <AIChatButton onClick={() => setChatOpen(true)} />
      </motion.div>

      {/* PREV / DOTS / NEXT — sits directly above the HUD panels, fully separate */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.78, duration: 0.5 }}
        className="absolute inset-x-0 z-[14] flex items-center justify-center gap-2 sm:gap-4 px-2"
        style={{ bottom: 'calc(3px + clamp(88px, 11vh, 110px) - 70px)' }}
      >
        <NavBtn label="PREV" icon="◀" onClick={() => onNavigate('contact')} side="left" />

        {/* Section dots */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {SECTIONS.map((s) => {
            const active = s === 'hero';
            return (
              <button key={s} onClick={() => onNavigate(s)} title={LABELS[s]}
                className="group relative flex items-center justify-center" style={{ width: '22px', height: '22px' }}>
                <motion.span className="block border"
                  animate={{
                    width: active ? '14px' : '10px',
                    height: active ? '14px' : '10px',
                    background: active ? '#cc1133' : 'transparent',
                    borderColor: active ? '#cc1133' : 'rgba(204,17,51,0.5)',
                    boxShadow: active ? '0 0 12px #cc1133, 0 0 24px rgba(204,17,51,0.4)' : 'none',
                    rotate: 45,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-pixel whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ fontSize: '6px', color: '#cc1133', textShadow: '0 0 8px #cc1133' }}>
                  {LABELS[s]}
                </span>
              </button>
            );
          })}
        </div>

        <NavBtn label="NEXT" icon="▶" onClick={() => onNavigate('about')} side="right" />
      </motion.div>

      {/* BOTTOM HUD PANELS — corners */}
      <BottomHUD />

      {/* AI CHAT MODAL */}
      <KaiShiChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

function NameCornerMarks({ glitch }: { glitch: boolean }) {
  const c = glitch ? '#ff2244' : '#cc1133';
  const s = glitch ? `0 0 12px ${c}` : `0 0 6px ${c}`;
  const cornerStyle: CSSProperties = { position: 'absolute', color: c, textShadow: s, fontSize: '10px', fontFamily: 'monospace', transition: 'color 0.05s, text-shadow 0.05s', lineHeight: 1 };
  return (
    <>
      {/* Top-left */}
      <div style={{ ...cornerStyle, top: '-14px', left: '-10px' }}>✕</div>
      {/* Top-right */}
      <div style={{ ...cornerStyle, top: '-14px', right: '-10px' }}>✕</div>
      {/* Bottom-left */}
      <div style={{ ...cornerStyle, bottom: '-14px', left: '-10px' }}>◆</div>
      {/* Bottom-right */}
      <div style={{ ...cornerStyle, bottom: '-14px', right: '-10px' }}>◆</div>
      {/* Top horizontal lines */}
      <div style={{ position: 'absolute', top: '-11px', left: '10px', right: '10px', height: '1px', background: `linear-gradient(90deg, transparent, ${c}, transparent)`, opacity: glitch ? 0.9 : 0.45, transition: 'opacity 0.05s' }} />
      {/* Bottom horizontal line */}
      <div style={{ position: 'absolute', bottom: '-11px', left: '10px', right: '10px', height: '1px', background: `linear-gradient(90deg, transparent, ${c}, transparent)`, opacity: glitch ? 0.9 : 0.45, transition: 'opacity 0.05s' }} />
    </>
  );
}

/* HUD SCREEN FRAME */
function HUDScreenFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[25]">
      {/* 4 border lines */}
      {['top-0 left-0 right-0 h-[2px]','bottom-0 left-0 right-0 h-[2px]','top-0 bottom-0 left-0 w-[2px]','top-0 bottom-0 right-0 w-[2px]'].map((c,i)=>(
        <div key={i} className={`absolute ${c} bg-[#cc1133]`}
          style={{ boxShadow: '0 0 8px #cc1133, 0 0 22px rgba(204,17,51,0.4)' }} />
      ))}
      {/* Corners */}
      <CornerBracket pos="top-0 left-0"     path="M3 48 L3 3 L48 3"     sqX={0}  sqY={0}  />
      <CornerBracket pos="top-0 right-0"    path="M12 3 L55 3 L55 48"   sqX={47} sqY={0}  />
      <CornerBracket pos="bottom-0 left-0"  path="M3 12 L3 55 L48 55"   sqX={0}  sqY={47} />
      <CornerBracket pos="bottom-0 right-0" path="M12 55 L55 55 L55 12" sqX={47} sqY={47} />
      {/* Top center diamond */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center">
        <div style={{ width:'96px',height:'2px',background:'linear-gradient(to right,transparent,#cc1133)' }}/>
        <div style={{ width:'14px',height:'14px',background:'#cc1133',transform:'rotate(45deg)',marginTop:'-1px',flexShrink:0,boxShadow:'0 0 12px #cc1133' }}/>
        <div style={{ width:'96px',height:'2px',background:'linear-gradient(to left,transparent,#cc1133)' }}/>
      </div>
      {/* Bottom center diamond */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center">
        <div style={{ width:'96px',height:'2px',background:'linear-gradient(to right,transparent,#cc1133)' }}/>
        <div style={{ width:'14px',height:'14px',background:'#cc1133',transform:'rotate(45deg)',marginBottom:'-1px',flexShrink:0,boxShadow:'0 0 12px #cc1133' }}/>
        <div style={{ width:'96px',height:'2px',background:'linear-gradient(to left,transparent,#cc1133)' }}/>
      </div>
      {/* Tick marks */}
      {[12,22,78,88].map(p=><div key={`t${p}`} className="absolute top-0 bg-[#cc1133]/55" style={{left:`${p}%`,width:'1px',height:'14px'}}/>)}
      {[12,22,78,88].map(p=><div key={`b${p}`} className="absolute bottom-0 bg-[#cc1133]/55" style={{left:`${p}%`,width:'1px',height:'14px'}}/>)}
      {[25,50,75].map(p=><div key={`l${p}`} className="absolute left-0 bg-[#cc1133]/40" style={{top:`${p}%`,width:'14px',height:'1px'}}/>)}
      {[25,50,75].map(p=><div key={`r${p}`} className="absolute right-0 bg-[#cc1133]/40" style={{top:`${p}%`,width:'14px',height:'1px'}}/>)}
      {/* Sweeping glows */}
      <motion.div className="absolute top-0 h-[2px]"
        style={{width:130,background:'linear-gradient(90deg,transparent,#ff2244,#ff6677,#ff2244,transparent)',boxShadow:'0 0 16px #cc1133'}}
        animate={{left:[-130,'100%']}} transition={{duration:6,repeat:Infinity,ease:'linear',repeatDelay:2.5}}
      />
      <motion.div className="absolute bottom-0 h-[2px]"
        style={{width:130,background:'linear-gradient(90deg,transparent,#ff2244,#ff6677,#ff2244,transparent)',boxShadow:'0 0 16px #cc1133'}}
        animate={{left:['100%',-130]}} transition={{duration:6,repeat:Infinity,ease:'linear',repeatDelay:2.5,delay:3}}
      />
      <motion.div className="absolute left-0 w-[2px]"
        style={{height:100,background:'linear-gradient(180deg,transparent,#ff4466,transparent)',boxShadow:'0 0 8px #cc1133'}}
        animate={{top:[-100,'100%']}} transition={{duration:7,repeat:Infinity,ease:'linear',repeatDelay:2}}
      />
    </div>
  );
}

function CornerBracket({pos,path,sqX,sqY}:{pos:string;path:string;sqX:number;sqY:number}) {
  return (
    <svg className={`absolute ${pos}`} width="58" height="58" viewBox="0 0 58 58" fill="none">
      <path d={path} stroke="#cc1133" strokeWidth="2.5" style={{filter:'drop-shadow(0 0 5px #cc1133)'}}/>
      <rect x={sqX} y={sqY} width="10" height="10" fill="#cc1133" opacity="0.95" style={{filter:'drop-shadow(0 0 4px #cc1133)'}}/>
    </svg>
  );
}

/* BOTTOM HUD PANELS (corners only, no center) */
function BottomHUD() {
  const panelGlitch = useGlitchFlash(6500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.55 }}
      className="absolute bottom-0 left-0 right-0 z-[13] flex items-end justify-between gap-2"
      style={{ padding: 'clamp(8px, 3vw, 28px) clamp(8px, 4vw, 28px) clamp(8px, 2.5vh, 14px)' }}
    >
      {/* PLAYER STATUS */}
      <HUDPanel glitch={panelGlitch} style={{width:'clamp(132px,40vw,300px)'}}>
        <div className="flex items-center gap-1.5 mb-2.5">
          <span style={{color:'#cc1133',fontSize:'11px'}}>◆</span>
          <span className="font-pixel tracking-widest whitespace-nowrap" style={{fontSize:'clamp(6.5px, 1.8vw, 8px)',color:'#cc1133'}}>PLAYER STATUS</span>
          <span style={{color:'#cc1133',fontSize:'11px'}}>◆</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="relative shrink-0">
            <img src="/assets/icon-kai-cat2.png" alt="" style={{width:'clamp(34px, 9vw, 50px)',height:'clamp(34px, 9vw, 50px)',objectFit:'contain',imageRendering:'pixelated',border:'1px solid #3d0f1a'}}/>
            <span className="absolute -bottom-1 -right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full border-2 block" style={{background:'#22c55e',borderColor:'#040108',boxShadow:'0 0 7px #22c55e'}}/>
          </div>
          <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-pixel" style={{fontSize:'clamp(6.5px, 1.8vw, 8px)',color:'#7a6068'}}>LVL</span>
              <span className="font-pixel text-white" style={{
                fontSize:'clamp(16px, 4.5vw, 22px)', lineHeight:1,
                textShadow: panelGlitch ? '2px 0 #ff0044, -2px 0 #0088ff, 0 0 12px rgba(255,34,68,0.9)' : '0 0 12px rgba(204,17,51,0.8)',
                transition: 'text-shadow 0.05s',
              }}>21</span>
              <img src="/assets/icon-kai-shild.png"  alt="" className="hidden sm:inline-block" style={{width:'15px',height:'15px',objectFit:'contain',imageRendering:'pixelated'}}/>
              <img src="/assets/icon-kai-console.png" alt="" className="hidden sm:inline-block" style={{width:'15px',height:'15px',objectFit:'contain',imageRendering:'pixelated'}}/>
            </div>
            <StatBar label="EXP" value={75}  color="#cc1133" display="75%"     glitch={panelGlitch} />
            <StatBar label="HP"  value={100} color="#22c55e" display="850/850" glitch={false} />
          </div>
        </div>
      </HUDPanel>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CURRENT QUEST */}
      <HUDPanel glitch={panelGlitch} style={{width:'clamp(132px,40vw,290px)'}}>
        <div className="flex items-center gap-1.5 mb-2.5">
          <span style={{color:'#cc1133',fontSize:'11px'}}>◆</span>
          <span className="font-pixel tracking-widest whitespace-nowrap" style={{fontSize:'clamp(6.5px, 1.8vw, 8px)',color:'#cc1133'}}>CURRENT QUEST</span>
          <span style={{color:'#cc1133',fontSize:'11px'}}>◆</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <img src="/assets/icon-kai-pedang2.png" alt="" style={{
            width:'clamp(28px, 8vw, 42px)', height:'clamp(28px, 8vw, 42px)', objectFit:'contain', imageRendering:'pixelated', flexShrink:0,
            filter: panelGlitch ? 'drop-shadow(0 0 14px #ff2244) brightness(1.3)' : 'drop-shadow(0 0 9px #cc1133)',
            transition: 'filter 0.05s',
          }}/>
          <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
            <div className="font-pixel leading-snug" style={{
              fontSize:'clamp(7px, 2vw, 9px)',
              color: panelGlitch ? '#ff8899' : '#fff',
              transition: 'color 0.05s',
            }}>BUILD AMAZING<br/>WEBSITES</div>
            <StatBar label="PROGRESS" value={60} color="#cc1133" display="3 / 5" glitch={panelGlitch}/>
          </div>
        </div>
      </HUDPanel>
    </motion.div>
  );
}

/* Interactive HUD panel wrapper — hover glow + glitch border */
function HUDPanel({ children, glitch, style }: {
  children: React.ReactNode;
  glitch: boolean;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="pixel-border hud-panel shrink-0 cursor-default"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        boxShadow: glitch
          ? '-2px 0 0 rgba(0,140,255,0.4), 2px 0 0 rgba(255,34,68,0.4), 0 0 22px rgba(204,17,51,0.35)'
          : hovered
            ? '0 0 18px rgba(204,17,51,0.35), 0 0 6px rgba(204,17,51,0.2)'
            : '0 0 0px transparent',
        x: glitch ? [-1, 1, 0] : 0,
      }}
      transition={{ duration: glitch ? 0.05 : 0.25, ease: 'easeOut' }}
      style={{
        ...style,
        padding: 'clamp(7px, 2vw, 10px) clamp(8px, 2.5vw, 13px) clamp(8px, 2.2vw, 12px)',
        borderColor: hovered ? 'rgba(204,17,51,0.6)' : undefined,
        transition: 'border-color 0.2s',
      }}
    >
      {/* Hover top-edge sweep */}
      {hovered && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,#cc1133,transparent)', zIndex: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
      {/* Glitch scan line overlay */}
      <AnimatePresence>
        {glitch && (
          <motion.div key="gscan"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 2 }}
          >
            <motion.div className="absolute left-0 right-0 h-px bg-[#ff2244]/60"
              animate={{ top: ['10%', '85%'] }}
              transition={{ duration: 0.18, ease: 'linear' }}
              style={{ boxShadow: '0 0 4px #ff2244' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
}

/* Stat bar */
function StatBar({label,value,color,display,glitch=false}:{label:string;value:number;color:string;display:string;glitch?:boolean}) {
  return (
    <div>
      <div className="flex justify-between mb-0.5">
        <span className="font-pixel" style={{fontSize:'8px',color:'#7a6068'}}>{label}</span>
        <span className="font-pixel" style={{fontSize:'8px',color, textShadow: glitch ? `0 0 8px ${color}` : 'none', transition:'text-shadow 0.05s'}}>{display}</span>
      </div>
      <div className="rounded-sm overflow-hidden" style={{height:'7px',background:'#1a0810'}}>
        <motion.div className="h-full rounded-sm"
          style={{width:`${value}%`,background:`linear-gradient(90deg,${color}80,${color})`}}
          animate={{ boxShadow: glitch ? `0 0 14px ${color}, 0 0 4px #fff` : `0 0 7px ${color}` }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </div>
  );
}

/* AI CHAT CTA Button */
function AIChatButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const pulse = useGlitchFlash(3200);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center gap-2 sm:gap-2.5 overflow-hidden group"
      style={{
        padding: 'clamp(9px, 2.6vw, 11px) clamp(16px, 5vw, 22px)',
        minWidth: 'min(240px, 78vw)',
        width: 'fit-content',
        justifyContent: 'center',
        background: hovered ? 'rgba(204,17,51,0.12)' : 'rgba(10,2,8,0.85)',
        border: `1px solid ${pulse ? '#ff2244' : hovered ? '#cc1133' : 'rgba(204,17,51,0.55)'}`,
        clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
        boxShadow: pulse
          ? '-2px 0 0 rgba(0,140,255,0.3), 2px 0 0 rgba(255,34,68,0.3), 0 0 18px rgba(204,17,51,0.35)'
          : hovered
          ? '0 0 20px rgba(204,17,51,0.3)'
          : '0 0 8px rgba(204,17,51,0.1)',
        transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Animated online indicator */}
      <motion.span
        className="relative flex-shrink-0"
        animate={{ scale: pulse ? [1, 1.4, 1] : 1 }}
        transition={{ duration: 0.18 }}
      >
        <span className="block w-2 h-2 rounded-full bg-green-400"
          style={{ boxShadow: '0 0 6px #4ade80' }} />
        <motion.span
          className="absolute inset-0 rounded-full bg-green-400"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.span>

      {/* Cat icon */}
      <img src="/assets/icon-kai-cat1.png" alt=""
        style={{
          width: '18px', height: '18px', objectFit: 'contain', imageRendering: 'pixelated',
          filter: hovered ? 'drop-shadow(0 0 6px #cc1133) brightness(1.2)' : 'drop-shadow(0 0 3px #cc1133)',
          transition: 'filter 0.15s', flexShrink: 0,
        }}
      />

      {/* Label */}
      <span className="font-pixel tracking-widest whitespace-nowrap"
        style={{
          fontSize: 'clamp(7px, 2vw, 8px)',
          color: hovered ? '#ff8899' : '#cc1133',
          textShadow: hovered ? '0 0 12px rgba(204,17,51,0.8)' : '0 0 6px rgba(204,17,51,0.4)',
          transition: 'color 0.15s, text-shadow 0.15s',
        }}>
        TALK TO KAI SHI
      </span>

      {/* Signal icon */}
      <span className="font-mono relative z-10"
        style={{ fontSize: '12px', color: hovered ? '#cc1133' : 'rgba(204,17,51,0.5)', transition: 'color 0.15s' }}>
        ◈
      </span>

      {/* Shimmer on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(204,17,51,0.08),transparent)' }} />

      {/* Glitch slice on pulse */}
      <AnimatePresence>
        {pulse && (
          <motion.div key="aiglitch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(transparent 35%,rgba(0,140,255,0.1) 35%,rgba(0,140,255,0.1) 44%,transparent 44%)' }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* PREV / NEXT button*/
function NavBtn({label,icon,onClick,side}:{label:string;icon:string;onClick:()=>void;side:'left'|'right'}) {
  const clip = side==='left'
    ? 'polygon(10px 0,100% 0,100% 100%,0 100%,0 10px)'
    : 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)';
  return (
    <motion.button onClick={onClick} whileHover={{scale:1.06}} whileTap={{scale:0.94}}
      className="flex items-center gap-1.5 sm:gap-2 font-pixel transition-all whitespace-nowrap"
      style={{fontSize:'clamp(7px, 2vw, 9px)',color:'#7a6068',border:'1px solid rgba(61,15,26,0.9)',padding:'clamp(6px, 2vw, 9px) clamp(10px, 4vw, 18px)',background:'rgba(8,2,6,0.78)',clipPath:clip}}
      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.color='#cc1133';el.style.borderColor='#cc1133';el.style.boxShadow='0 0 12px rgba(204,17,51,0.3)';}}
      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.color='#7a6068';el.style.borderColor='rgba(61,15,26,0.9)';el.style.boxShadow='none';}}
    >
      {side==='left' && <span style={{fontSize:'13px'}}>{icon}</span>}
      {label}
      {side==='right' && <span style={{fontSize:'13px'}}>{icon}</span>}
    </motion.button>
  );
}