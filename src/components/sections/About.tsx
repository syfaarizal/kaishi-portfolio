import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { SectionId } from '../../App';

/* ─── Types ─────────────────────────────── */
interface StatItem { label: string; value: number; icon: string; }
interface SkillItem { label: string; icon: string; locked: boolean; }
interface GalleryItem { id: number; title: string; tag: string; category: string; image: string; }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AboutProps { onNavigate: (_nav: SectionId) => void; }

/* ─── Data ───────────────────────────────── */
const CORE_STATS: StatItem[] = [
  { label: 'CODING SPEED',     value: 88, icon: '/assets/icon-kai-petir.png'   },
  { label: 'PROBLEM SOLVING',  value: 92, icon: '/assets/icon-kai-target.png'  },
  { label: 'FOCUS',            value: 85, icon: '/assets/icon-kai-ring.png'    },
  { label: 'CREATIVITY',       value: 95, icon: '/assets/icon-kai-star.png'    },
  { label: 'LOGIC',            value: 80, icon: '/assets/icon-kai-blok.png'    },
  { label: 'ADAPTABILITY',     value: 87, icon: '/assets/icon-kai-re.png'      },
];

const SKILLS: SkillItem[] = [
  { label: 'FRONTEND', icon: '/assets/icon-kai-code.png',    locked: false },
  { label: 'DESIGN',   icon: '/assets/icon-kai-diamond.png', locked: false },
  { label: 'INTERACT', icon: '/assets/icon-kai-lego.png',    locked: false },
  { label: '???',      icon: '',                              locked: true  },
  { label: '???',      icon: '',                              locked: true  },
  { label: '???',      icon: '',                              locked: true  },
];

const GALLERY_FILTERS = ['ALL', 'UI/UX', 'WEB', 'ART', 'EXPERIMENT'] as const;
type GalleryFilter = typeof GALLERY_FILTERS[number];

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: 'DARK DASHBOARD',   tag: 'UI/UX DESIGN', category: 'UI/UX',      image: '/public/assets/gallery/KaiShiPose1.png' },
  { id: 2, title: 'CYBER DAWN',       tag: 'PIXEL ART',    category: 'ART',        image: 'https://picsum.photos/seed/kai2/600/400' },
  { id: 3, title: 'PORTAL INTERFACE', tag: 'WEB DESIGN',   category: 'WEB',        image: 'https://picsum.photos/seed/kai3/600/400' },
  { id: 4, title: 'VOID LAB',         tag: 'EXPERIMENT',   category: 'EXPERIMENT', image: 'https://picsum.photos/seed/kai4/600/400' },
  { id: 5, title: 'NEON GRID',        tag: 'PIXEL ART',    category: 'ART',        image: 'https://picsum.photos/seed/kai5/600/400' },
  { id: 6, title: 'PIXEL QUEST',      tag: 'UI/UX DESIGN', category: 'UI/UX',      image: 'https://picsum.photos/seed/kai6/600/400' },
];

/* ─── Helpers ────────────────────────────── */
const PIX: React.CSSProperties = { imageRendering: 'pixelated' };
const RED = '#cc1133';

/* ═══════════════════════════════════════════
   CYBER BACKGROUND LAYERS
═══════════════════════════════════════════ */
function CyberBackground() {
  return (
    <>
      {/* Base dark */}
      <div className="pointer-events-none absolute inset-0" style={{ background: '#060408' }} />

      {/* Perspective grid floor */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `
          linear-gradient(rgba(204,17,51,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(204,17,51,0.6) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        backgroundPosition: '-1px -1px',
      }} />

      {/* Secondary fine grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(204,17,51,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(204,17,51,1) 1px, transparent 1px)
        `,
        backgroundSize: '12px 12px',
      }} />

      {/* Top glow orb */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] opacity-[0.06]" style={{
        background: `radial-gradient(ellipse at center top, ${RED} 0%, transparent 70%)`,
      }} />

      {/* Left ambient glow */}
      <div className="pointer-events-none absolute top-1/4 -left-20 w-[400px] h-[400px] opacity-[0.04]" style={{
        background: `radial-gradient(ellipse, ${RED} 0%, transparent 70%)`,
      }} />

      {/* Right ambient glow */}
      <div className="pointer-events-none absolute bottom-1/4 -right-20 w-[350px] h-[350px] opacity-[0.04]" style={{
        background: `radial-gradient(ellipse, #4466ff 0%, transparent 70%)`,
      }} />

      {/* Horizontal scan lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.6) 3px, rgba(0,0,0,0.6) 4px)',
      }} />

      {/* Circuit trace - top horizontal */}
      <div className="pointer-events-none absolute top-[18%] left-0 right-0 h-px opacity-[0.12]" style={{
        background: `linear-gradient(90deg, transparent 0%, ${RED}88 20%, ${RED} 40%, ${RED}88 60%, transparent 100%)`,
      }} />

      {/* Circuit trace - bottom */}
      <div className="pointer-events-none absolute bottom-[12%] left-0 right-0 h-px opacity-[0.08]" style={{
        background: `linear-gradient(90deg, transparent 10%, ${RED}55 30%, ${RED}88 50%, ${RED}55 70%, transparent 90%)`,
      }} />

      {/* Animated corner glow dots */}
      <motion.div
        className="pointer-events-none absolute top-8 right-8 w-1 h-1 rounded-full"
        style={{ background: RED, boxShadow: `0 0 8px ${RED}` }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute top-8 left-8 w-1 h-1 rounded-full"
        style={{ background: RED, boxShadow: `0 0 8px ${RED}` }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Floating hex decorations */}
      {[
        { top: '15%', left: '3%', size: 40, opacity: 0.06 },
        { top: '60%', right: '2%', size: 56, opacity: 0.05 },
        { top: '80%', left: '8%', size: 28, opacity: 0.04 },
      ].map((h, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ top: h.top, left: (h as any).left, right: (h as any).right, opacity: h.opacity }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
        >
          <svg width={h.size} height={h.size} viewBox="0 0 60 60">
            <polygon points="30,2 57,16 57,44 30,58 3,44 3,16"
              fill="none" stroke={RED} strokeWidth="1.5" />
            <polygon points="30,12 47,21 47,39 30,48 13,39 13,21"
              fill="none" stroke={RED} strokeWidth="0.5" opacity="0.5" />
          </svg>
        </motion.div>
      ))}

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
      }} />
    </>
  );
}

/* ═══════════════════════════════════════════
   ROOT ABOUT SECTION
═══════════════════════════════════════════ */
export function About({ onNavigate: _nav }: AboutProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden"
      style={{ color: '#e8e0e3' }}
    >
      {/* Layered cyber background */}
      <CyberBackground />

      {/* Content */}
      <div className="relative z-10 px-5 lg:px-8 xl:px-10 py-12 space-y-5">

        {/* ── TOP SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <CornerMark />
          <span className="font-pixel text-[9px] tracking-[0.3em]" style={{ color: RED }}>
            // USER PROFILE
          </span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${RED}55, transparent)` }} />
          {/* Right side decorative marks */}
          <div className="flex items-center gap-1">
            <motion.span className="font-pixel text-[7px]" style={{ color: `${RED}55` }}
              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
              ◆
            </motion.span>
            <span className="font-pixel text-[7px]" style={{ color: `${RED}33` }}>◆</span>
          </div>
        </motion.div>

        {/* ── ROW 1: Profile Card | Bio | Stats | Skill Tree ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-4"
          style={{ gridTemplateColumns: 'minmax(220px,270px) 1fr minmax(240px,310px) minmax(240px,295px)' }}
        >
          <ProfileCard inView={inView} />
          <BiographyPanel inView={inView} />
          <CoreStatsPanel inView={inView} />
          <SkillTreePanel inView={inView} />
        </motion.div>

        {/* ── ROW 2: Gallery ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GallerySection />
        </motion.div>

        {/* ── BOTTOM SYSTEM BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SystemStatusBar />
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROFILE CARD
═══════════════════════════════════════════ */
function ProfileCard({ inView }: { inView: boolean }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const fire = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
      setTimeout(() => { setGlitch(true); setTimeout(() => setGlitch(false), 60); }, 150);
    };
    const t = setInterval(fire, 5000 + Math.random() * 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <HudPanel className="flex flex-col items-center gap-3 py-5 px-4" glow>
      {/* Avatar frame */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="relative w-28 h-28 flex items-center justify-center"
          style={{
            border: `1px solid ${RED}66`,
            background: 'rgba(20,4,12,0.9)',
            boxShadow: glitch
              ? `-3px 0 0 rgba(0,140,255,0.5), 3px 0 0 rgba(255,34,68,0.5), 0 0 28px ${RED}88`
              : `0 0 28px ${RED}44, 0 0 60px ${RED}18, inset 0 0 20px rgba(0,0,0,0.6)`,
            transition: 'box-shadow 0.05s',
          }}
        >
          <img src="/assets/icon-kai-cat3.png" alt="Kai Shi Avatar"
            className="w-20 h-20 object-contain"
            style={{ ...PIX, filter: `drop-shadow(0 0 10px ${RED})`, transform: glitch ? 'translateX(2px)' : 'none', transition: 'transform 0.05s' }}
          />
          <TinyCorner pos="top-0 left-0" />
          <TinyCorner pos="top-0 right-0" flip="x" />
          <TinyCorner pos="bottom-0 left-0" flip="y" />
          <TinyCorner pos="bottom-0 right-0" flip="xy" />
        </div>

        {/* Outer glow ring */}
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: `0 0 0 1px ${RED}22, 0 0 0 3px ${RED}11`,
        }} />
      </motion.div>

      {/* Name */}
      <div className="text-center">
        <div className="font-pixel text-xl text-white tracking-widest"
          style={{
            textShadow: glitch ? `3px 0 #ff0044,-3px 0 #0088ff,0 0 20px ${RED}` : `0 0 20px ${RED}88, 0 0 40px ${RED}33`,
            transition: 'text-shadow 0.05s',
          }}>
          KAI SHI
        </div>
        <div className="font-pixel text-[8px] tracking-[0.25em] mt-1" style={{ color: '#7a6068' }}>
          WEB ADVENTURER
        </div>
      </div>

      {/* Level + EXP */}
      <div className="w-full space-y-2 px-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-pixel text-[8px]" style={{ color: '#7a6068' }}>LVL</span>
            <span className="font-pixel text-base text-white" style={{ textShadow: `0 0 10px ${RED}88` }}>23</span>
            <span className="font-pixel text-[8px]" style={{ color: RED }}>75%</span>
          </div>
          <SegmentedBar value={75} color={RED} segments={12} />
        </motion.div>

        <div className="flex items-center gap-2">
          <img src="/assets/icon-kai-petir.png" alt="" className="w-4 h-4 object-contain" style={PIX} />
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-pixel text-[7px]" style={{ color: '#7a6068' }}>EXP</span>
              <span className="font-pixel text-[7px]" style={{ color: RED }}>12,580 / 16,680</span>
            </div>
            <SegmentedBar value={75} color={RED} segments={12} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img src="/assets/icon-kai-heart.png" alt="" className="w-4 h-4 object-contain" style={PIX} />
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-pixel text-[7px]" style={{ color: '#7a6068' }}>HP</span>
              <span className="font-pixel text-[7px]" style={{ color: '#22c55e' }}>550 / 550</span>
            </div>
            <SegmentedBar value={100} color="#22c55e" segments={12} />
          </div>
        </div>
      </div>
    </HudPanel>
  );
}

/* ═══════════════════════════════════════════
   BIOGRAPHY PANEL
═══════════════════════════════════════════ */
function BiographyPanel({ inView }: { inView: boolean }) {
  return (
    <HudPanel className="flex flex-col gap-4 py-5 px-5">
      <SectionLabel label="BIOGRAPHY" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="space-y-3 font-mono text-sm leading-relaxed"
        style={{ color: 'rgba(232,224,227,0.78)' }}
      >
        <p>A digital traveler building immersive worlds through code, creativity, and endless nights.</p>
        <p>I turn ideas into interactive experiences and bring anime vibes to the web.</p>
      </motion.div>

      {/* Quote block */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative py-3 px-4 flex-1"
        style={{
          background: `linear-gradient(135deg, rgba(204,17,51,0.07) 0%, rgba(204,17,51,0.03) 100%)`,
          borderTop: '1px solid rgba(204,17,51,0.25)',
          borderRight: '1px solid rgba(204,17,51,0.15)',
          borderBottom: '1px solid rgba(204,17,51,0.15)',
          borderLeft: `3px solid ${RED}`,
          boxShadow: `inset 0 0 20px rgba(204,17,51,0.04), -4px 0 20px rgba(204,17,51,0.1)`,
        }}
      >
        <span className="absolute top-1 left-2 font-mono text-2xl leading-none" style={{ color: `${RED}66` }}>"</span>
        <div className="font-mono text-sm leading-relaxed pl-2 pt-2" style={{ color: 'rgba(232,224,227,0.7)' }}>
          Code is my weapon.<br />
          Creativity is my power.<br />
          The web is my playground.
        </div>
        <img src="/assets/icon-kai-cat2.png" alt=""
          className="absolute bottom-2 right-2 w-6 h-6 object-contain opacity-50" style={PIX} />
      </motion.div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span className="font-pixel text-[8px] tracking-widest" style={{ color: '#7a6068' }}>STATUS:</span>
        <motion.span className="font-pixel text-[8px]" style={{ color: '#22c55e' }}
          animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          ONLINE
        </motion.span>
        <motion.div className="w-2 h-2 rounded-full"
          style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e, 0 0 16px #22c55e44' }}
          animate={{ opacity: [1, 0.3, 1], boxShadow: ['0 0 6px #22c55e', '0 0 14px #22c55e', '0 0 6px #22c55e'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </HudPanel>
  );
}

/* ═══════════════════════════════════════════
   CORE STATS PANEL
═══════════════════════════════════════════ */
function CoreStatsPanel({ inView }: { inView: boolean }) {
  return (
    <HudPanel className="flex flex-col gap-3 py-5 px-5">
      <SectionLabel label="CORE STATS" />
      <div className="space-y-3 flex-1">
        {CORE_STATS.map((stat, i) => (
          <motion.div key={stat.label}
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
            className="group"
          >
            <div className="flex items-center gap-2 mb-1">
              <img src={stat.icon} alt="" className="w-4 h-4 object-contain shrink-0"
                style={{ ...PIX, filter: `drop-shadow(0 0 4px ${RED}99)` }}
              />
              <span className="font-pixel text-[8px] flex-1 tracking-wide" style={{ color: '#a09098' }}>
                {stat.label}
              </span>
              <span className="font-pixel text-[9px]" style={{ color: RED, textShadow: `0 0 8px ${RED}88` }}>
                {stat.value}
              </span>
            </div>
            <SegmentedBar value={stat.value} color={RED} segments={14} inView={inView} delay={0.2 + i * 0.08} />
          </motion.div>
        ))}
      </div>
    </HudPanel>
  );
}

/* ═══════════════════════════════════════════
   SKILL TREE PANEL
═══════════════════════════════════════════ */
function SkillTreePanel({ inView }: { inView: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <HudPanel className="flex flex-col gap-3 py-5 px-5">
      <SectionLabel label="SKILL TREE" />

      <div className="grid grid-cols-3 gap-3 flex-1">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
            onHoverStart={() => !skill.locked && setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            className="flex flex-col items-center gap-1.5 cursor-default"
          >
            <motion.div
              className="relative w-14 h-14 flex items-center justify-center"
              animate={hovered === i
                ? { boxShadow: `0 0 20px ${RED}99, 0 0 40px ${RED}44` }
                : { boxShadow: `0 0 8px ${RED}28` }
              }
              style={{
                border: skill.locked ? '1px solid rgba(61,15,26,0.5)' : `1px solid ${RED}66`,
                background: skill.locked ? 'rgba(10,4,8,0.8)' : `linear-gradient(135deg, rgba(30,4,16,0.95), rgba(12,3,8,0.95))`,
                transition: 'background 0.2s',
              }}
            >
              {skill.locked ? (
                <span style={{ color: '#3d1a22', fontSize: '22px' }}>🔒</span>
              ) : (
                <motion.img
                  src={skill.icon}
                  alt={skill.label}
                  className="w-9 h-9 object-contain"
                  style={PIX}
                  animate={hovered === i
                    ? { filter: `drop-shadow(0 0 10px ${RED}) brightness(1.4)` }
                    : { filter: `drop-shadow(0 0 4px ${RED}99) brightness(1)` }
                  }
                  transition={{ duration: 0.2 }}
                />
              )}
              <TinyCorner pos="top-0 left-0" size={6} />
              <TinyCorner pos="top-0 right-0" flip="x" size={6} />
              <TinyCorner pos="bottom-0 left-0" flip="y" size={6} />
              <TinyCorner pos="bottom-0 right-0" flip="xy" size={6} />
            </motion.div>
            <span className="font-pixel text-[7px] tracking-wider text-center"
              style={{ color: skill.locked ? '#3d1a22' : hovered === i ? RED : '#a09098', transition: 'color 0.2s' }}>
              {skill.label}
            </span>
            {i < 3 && (
              <div className="w-px h-3 mt-0.5" style={{ background: `${RED}33` }} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative flex justify-around px-2" style={{ marginTop: '-8px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-px h-4" style={{ background: `${RED}33` }} />
          </div>
        ))}
      </div>

      <button
        className="w-full font-pixel text-[8px] py-2 tracking-widest transition-all"
        style={{ border: `1px solid ${RED}55`, color: RED, background: 'transparent' }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = `${RED}18`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${RED}55, inset 0 0 10px ${RED}11`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'transparent';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        VIEW DETAILS &gt;
      </button>
    </HudPanel>
  );
}

/* ═══════════════════════════════════════════
   GALLERY SECTION
═══════════════════════════════════════════ */
function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [filter, setFilter] = useState<GalleryFilter>('ALL');
  const [selected, setSelected] = useState(1);

  const filtered = filter === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.category === filter);

  const prev = () => setSelected(s => (s - 1 + filtered.length) % filtered.length);
  const next = () => setSelected(s => (s + 1) % filtered.length);

  useEffect(() => { setSelected(0); }, [filter]);

  return (
    <div ref={ref}>
      <HudPanel className="p-0 overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: '260px 1fr' }}>

          {/* LEFT: gallery meta */}
          <div className="px-5 py-5 flex flex-col gap-4 border-r"
            style={{ borderColor: 'rgba(61,15,26,0.7)' }}>
            <SectionLabel label="GALLERY" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-pixel text-base text-white leading-tight mb-2"
                style={{ textShadow: `0 0 16px ${RED}55` }}>
                MY DIGITAL<br />LOGS
              </h2>
              <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(160,144,152,0.75)' }}>
                Snapshots of ideas, experiments, and worlds I've built.
              </p>
            </motion.div>

            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-2"
            >
              <span className="font-pixel text-[7px] tracking-widest" style={{ color: '#4a3040' }}>FILTER:</span>
              <div className="flex flex-wrap gap-1.5">
                {GALLERY_FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className="font-pixel text-[7px] px-2.5 py-1 tracking-wide transition-all"
                    style={{
                      border: `1px solid ${filter === f ? RED : '#3d0f1a'}`,
                      background: filter === f ? RED : 'transparent',
                      color: filter === f ? '#fff' : '#7a6068',
                      boxShadow: filter === f ? `0 0 12px ${RED}66, 0 0 24px ${RED}22` : 'none',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Total projects */}
            <div className="mt-auto">
              <div className="flex items-center justify-between p-3"
                style={{
                  border: `1px solid rgba(61,15,26,0.7)`,
                  background: 'rgba(10,3,6,0.6)',
                  boxShadow: `inset 0 0 12px rgba(204,17,51,0.05)`,
                }}>
                <div>
                  <div className="font-pixel text-[7px] tracking-widest" style={{ color: '#4a3040' }}>TOTAL PROJECTS</div>
                  <div className="font-pixel text-2xl mt-1" style={{ color: RED, textShadow: `0 0 16px ${RED}` }}>23</div>
                </div>
                <img src="/assets/icon-kai-cat1.png" alt="" className="w-8 h-8 object-contain opacity-40" style={PIX} />
              </div>
            </div>
          </div>

          {/* RIGHT: image carousel with side arrows + bottom dots */}
          <div className="relative py-5 px-5 overflow-hidden">
            {/* Left Arrow — absolutely positioned on left edge */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
              <NavArrow dir="left" onClick={prev} />
            </div>
            {/* Right Arrow — absolutely positioned on right edge */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
              <NavArrow dir="right" onClick={next} />
            </div>

            {/* Carousel images */}
            <div className="flex gap-3 items-stretch pb-10" style={{ minHeight: '260px', paddingLeft: '36px', paddingRight: '36px' }}>
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => {
                  const isSelected = i === selected;
                  return (
                    <motion.div
                      key={`${filter}-${item.id}`}
                      onClick={() => setSelected(i)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1, scale: 1,
                        flex: isSelected ? 2.5 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden cursor-pointer shrink-0"
                      style={{
                        border: isSelected ? `1.5px solid ${RED}` : '1px solid rgba(61,15,26,0.5)',
                        boxShadow: isSelected
                          ? `0 0 24px ${RED}77, 0 0 48px ${RED}33, inset 0 0 12px rgba(204,17,51,0.06)`
                          : '0 0 8px rgba(0,0,0,0.5)',
                        minWidth: 0,
                        transition: 'border 0.3s, box-shadow 0.3s',
                      }}
                    >
                      {/* Image */}
                      <img src={item.image} alt={item.title}
                        className="w-full h-full object-cover"
                        style={{
                          filter: isSelected
                            ? 'brightness(0.85) saturate(1.3) contrast(1.05)'
                            : 'brightness(0.35) saturate(0.5)',
                          transition: 'filter 0.4s',
                        }}
                      />

                      {/* Red tint overlay for unselected */}
                      {!isSelected && (
                        <div className="absolute inset-0 pointer-events-none"
                          style={{ background: `rgba(204,17,51,0.05)`, mixBlendMode: 'multiply' }} />
                      )}

                      {/* Gradient for selected */}
                      {isSelected && (
                        <div className="absolute inset-0 pointer-events-none"
                          style={{ background: 'linear-gradient(to top, rgba(4,1,10,0.92) 0%, rgba(4,1,10,0.2) 45%, transparent 60%)' }} />
                      )}

                      {/* SELECTED badge */}
                      {isSelected && (
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="absolute top-0 left-1/2 -translate-x-1/2"
                          style={{
                            background: RED,
                            padding: '2px 14px',
                            boxShadow: `0 2px 16px ${RED}88`,
                            clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
                          }}
                        >
                          <span className="font-pixel text-[7px] text-white tracking-widest">SELECTED</span>
                        </motion.div>
                      )}

                      {/* Bottom info for selected */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-0 left-0 right-0 p-3"
                          >
                            <div className="font-pixel text-[10px] text-white tracking-wider"
                              style={{ textShadow: `0 0 10px ${RED}88` }}>
                              {item.title}
                            </div>
                            <div className="font-pixel text-[7px] mt-0.5" style={{ color: RED }}>{item.tag}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* View project button for selected */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                        >
                          <motion.button
                            whileHover={{ boxShadow: `0 0 20px ${RED}88` }}
                            className="font-pixel text-[7px] px-4 py-1.5 tracking-widest whitespace-nowrap"
                            style={{
                              border: `1px solid ${RED}88`,
                              color: RED,
                              background: 'rgba(10,3,8,0.85)',
                              backdropFilter: 'blur(4px)',
                            }}
                          >
                            VIEW PROJECT &gt;
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Corner marks on selected */}
                      {isSelected && (
                        <>
                          <TinyCorner pos="top-0 left-0" />
                          <TinyCorner pos="top-0 right-0" flip="x" />
                          <TinyCorner pos="bottom-0 left-0" flip="y" />
                          <TinyCorner pos="bottom-0 right-0" flip="xy" />
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Dot indicators — inside container at the bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {filtered.map((_, i) => (
                <button key={i} onClick={() => setSelected(i)}>
                  <motion.span
                    className="block border"
                    animate={{
                      width: i === selected ? '12px' : '8px',
                      height: i === selected ? '12px' : '8px',
                      background: i === selected ? RED : 'transparent',
                      borderColor: i === selected ? RED : `${RED}55`,
                      rotate: 45,
                      boxShadow: i === selected ? `0 0 10px ${RED}, 0 0 20px ${RED}55` : 'none',
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </HudPanel>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SYSTEM STATUS BAR
═══════════════════════════════════════════ */
function SystemStatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');
  const ss = String(time.getSeconds()).padStart(2, '0');

  return (
    <div className="flex items-center justify-between px-3 py-2"
      style={{
        border: `1px solid rgba(61,15,26,0.6)`,
        background: 'rgba(6,2,4,0.9)',
        boxShadow: `0 -1px 0 ${RED}22`,
      }}>
      <div className="flex items-center gap-2">
        <img src="/assets/icon-kai-cat1.png" alt="" className="w-4 h-4 object-contain opacity-60" style={PIX} />
        <span className="font-pixel text-[7px]" style={{ color: '#7a6068' }}>
          <span style={{ color: RED }}>TIP:</span> Explore more. The deeper you go, the more you'll discover.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <motion.span
          className="font-pixel text-[7px]"
          style={{ color: '#4a3040' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ◆ SYSTEM LOG: PROFILE DATA SYNCED
        </motion.span>
        <span className="font-pixel text-[8px]" style={{ color: '#7a6068' }}>
          {hh}:{mm}:{ss}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REUSABLE PRIMITIVES
═══════════════════════════════════════════ */

/* HUD Panel wrapper */
function HudPanel({ children, className = '', glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        border: `1px solid rgba(61,15,26,0.85)`,
        background: 'rgba(7,2,5,0.88)',
        boxShadow: glow
          ? `0 0 30px rgba(204,17,51,0.1), 0 0 60px rgba(204,17,51,0.05), inset 0 0 20px rgba(0,0,0,0.5)`
          : `0 0 20px rgba(204,17,51,0.06), inset 0 0 20px rgba(0,0,0,0.4)`,
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${RED}55, transparent)` }} />
      {/* Bottom border subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${RED}22, transparent)` }} />
      {children}
    </div>
  );
}

/* Section label */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="font-pixel text-[8px] tracking-widest flex items-center gap-1" style={{ color: RED }}>
      <span style={{ color: `${RED}88` }}>//</span> {label}
    </div>
  );
}

/* Segmented progress bar */
function SegmentedBar({
  value, color, segments = 20, inView, delay = 0,
}: {
  value: number; color: string; segments?: number; inView?: boolean; delay?: number;
}) {
  const filled = Math.round((value / 100) * segments);
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: segments }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0.3 }}
          animate={inView !== undefined
            ? (inView && i < filled
              ? { opacity: 1, scaleY: 1 }
              : { opacity: i < filled ? 0.15 : 0.08, scaleY: 1 })
            : (i < filled ? { opacity: 1, scaleY: 1 } : { opacity: 0.12, scaleY: 1 })
          }
          transition={{ delay: delay + i * 0.02, duration: 0.25 }}
          style={{
            flex: 1, height: '6px',
            background: i < filled ? color : `${color}22`,
            boxShadow: i < filled ? `0 0 5px ${color}99` : 'none',
          }}
        />
      ))}
    </div>
  );
}

/* Tiny L-shaped corner mark */
function TinyCorner({ pos, flip = '', size = 8 }: { pos: string; flip?: string; size?: number }) {
  const sx: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderTop: `1.5px solid ${RED}`,
    borderLeft: `1.5px solid ${RED}`,
    pointerEvents: 'none',
    transform: flip.includes('x') && flip.includes('y')
      ? 'scaleX(-1) scaleY(-1)'
      : flip.includes('x') ? 'scaleX(-1)'
      : flip.includes('y') ? 'scaleY(-1)'
      : 'none',
  };
  return <div style={{
    ...sx,
    top: pos.includes('top') ? 0 : undefined,
    bottom: pos.includes('bottom') ? 0 : undefined,
    left: pos.includes('left') ? 0 : undefined,
    right: pos.includes('right') ? 0 : undefined,
    filter: `drop-shadow(0 0 2px ${RED}88)`,
  }} />;
}

/* Corner mark for section header */
function CornerMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 10 L1 1 L10 1" stroke={RED} strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 4px ${RED})` }} />
      <rect x="0" y="0" width="4" height="4" fill={RED} opacity="0.9" />
    </svg>
  );
}

/* Gallery nav arrow */
function NavArrow({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.12, boxShadow: `0 0 20px ${RED}77, 0 0 40px ${RED}33` }}
      whileTap={{ scale: 0.9 }}
      className="w-9 h-9 flex items-center justify-center font-pixel text-xs"
      style={{
        border: `1px solid ${RED}77`,
        color: RED,
        background: 'rgba(10,3,8,0.9)',
        boxShadow: `0 0 8px ${RED}33`,
        clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)',
        flexShrink: 0,
        backdropFilter: 'blur(4px)',
      }}
    >
      {dir === 'left' ? '◀' : '▶'}
    </motion.button>
  );
}