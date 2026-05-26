import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { SectionId } from '../../App';

/* ─────────────────────────── Types ─── */
interface StatItem  { label: string; value: number; icon: string; }
interface SkillNode { label: string; icon: string; locked: boolean; }
interface GalleryItem { id: number; title: string; tag: string; image: string; }
interface AboutProps { onNavigate: (id: SectionId) => void; }

/* ─────────────────────────── Data ─── */
const CORE_STATS: StatItem[] = [
  { label: 'CODING SPEED',    value: 88, icon: '/assets/icon-kai-petir.png'  },
  { label: 'PROBLEM SOLVING', value: 92, icon: '/assets/icon-kai-target.png' },
  { label: 'FOCUS',           value: 85, icon: '/assets/icon-kai-ring.png'   },
  { label: 'CREATIVITY',      value: 95, icon: '/assets/icon-kai-star.png'   },
  { label: 'LOGIC',           value: 80, icon: '/assets/icon-kai-blok.png'   },
  { label: 'ADAPTABILITY',    value: 87, icon: '/assets/icon-kai-re.png'     },
];

const SKILLS: SkillNode[] = [
  { label: 'FRONTEND', icon: '/assets/icon-kai-code.png',    locked: false },
  { label: 'DESIGN',   icon: '/assets/icon-kai-diamond.png', locked: false },
  { label: 'INTERACT', icon: '/assets/icon-kai-lego.png',    locked: false },
  { label: '???',      icon: '',                              locked: true  },
  { label: '???',      icon: '',                              locked: true  },
  { label: '???',      icon: '',                              locked: true  },
];

const GALLERY_FILTERS = ['ALL','UI/UX','WEB','ART','EXPERIMENT'] as const;
type GFilter = typeof GALLERY_FILTERS[number];

const GALLERY: GalleryItem[] = [
  { id:1, title:'DARK DASHBOARD',   tag:'UI/UX',      image:'/assets/gallery/KaiShiPose1.png' },
  { id:2, title:'CYBER DAWN',       tag:'ART',        image:'https://picsum.photos/seed/kd2/600/400' },
  { id:3, title:'PORTAL INTERFACE', tag:'WEB',        image:'https://picsum.photos/seed/kd3/600/400' },
  { id:4, title:'VOID LAB',         tag:'EXPERIMENT', image:'https://picsum.photos/seed/kd4/600/400' },
  { id:5, title:'NEON GRID',        tag:'ART',        image:'https://picsum.photos/seed/kd5/600/400' },
  { id:6, title:'PIXEL QUEST',      tag:'UI/UX',      image:'https://picsum.photos/seed/kd6/600/400' },
];

/* ─────────────────────────── Constants ─── */
const PIX: React.CSSProperties = { imageRendering: 'pixelated' };
const R  = '#cc1133';
const R2 = '#ff2244';
const SECTIONS: SectionId[] = ['hero', 'about', 'skills', 'projects', 'contact'];
const SECTION_LABELS: Record<SectionId, string> = {
  hero: 'INTRO',
  about: 'PROFILE',
  skills: 'INVENTOR',
  projects: 'QUEST BOARD',
  contact: 'PORTAL',
};

/* ══════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════ */
export function About({ onNavigate }: AboutProps) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    /* Outer: fills the viewport slot from App; inner scrolls */
    <div
      ref={ref}
      className="relative w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ background: '#060408', color: '#e8e0e3' }}
    >
      {/* ── Animated cyberpunk background ── */}
      <CyberpunkBg />

      {/* ── Outer HUD frame (full page) ── */}
      <OuterFrame />

      {/* ── Content ── */}
      <div className="relative z-10 p-4 xl:p-6 space-y-4" style={{ paddingTop: '90px', paddingLeft: '60px', paddingRight: '60px' }}>

        {/* Section label row */}
        <motion.div
          initial={{ opacity:0, x:-20 }}
          animate={inView ? { opacity:1, x:0 } : {}}
          transition={{ duration:0.5 }}
          className="flex items-center gap-3"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 11L1 1L11 1" stroke={R} strokeWidth="1.5" style={{ filter:`drop-shadow(0 0 3px ${R})` }}/>
            <rect width="4" height="4" fill={R} opacity="0.9"/>
          </svg>
          <span className="font-pixel text-[9px] tracking-[0.35em]" style={{ color:R }}>// USER PROFILE</span>
          <div className="flex-1 h-px" style={{ background:`linear-gradient(90deg,${R}55,transparent)` }}/>
          {/* Right corner mark */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 11L13 1L3 1" stroke={R} strokeWidth="1.5" style={{ filter:`drop-shadow(0 0 3px ${R})` }}/>
            <rect x="10" width="4" height="4" fill={R} opacity="0.9"/>
          </svg>
        </motion.div>

        {/* ─── TOP ROW: 4 panels ─── */}
        <motion.div
          initial={{ opacity:0, y:18 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.1 }}
          className="grid gap-3"
          style={{ gridTemplateColumns:'minmax(200px,240px) 1fr minmax(250px,300px) minmax(220px,280px)' }}
        >
          <ProfileCard  inView={inView} />
          <BioPanel     inView={inView} />
          <StatsPanel   inView={inView} />
          <SkillsPanel  inView={inView} />
        </motion.div>

        {/* ─── GALLERY ROW ─── */}
        <motion.div
          initial={{ opacity:0, y:22 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.25 }}
        >
          <GallerySection />
        </motion.div>

        {/* ─── SYSTEM STATUS BAR ─── */}
        <motion.div
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ duration:0.5, delay:0.4 }}
        >
          <StatusBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-4 pt-2 pb-2"
        >
          <NavBtn label="PREV" icon="◀" onClick={() => onNavigate('hero')} side="left" />

          <div className="flex items-center gap-2.5">
            {SECTIONS.map((section) => {
              const active = section === 'about';
              return (
                <button
                  key={section}
                  onClick={() => onNavigate(section)}
                  title={SECTION_LABELS[section]}
                  className="group relative flex items-center justify-center"
                  style={{ width: '22px', height: '22px' }}
                >
                  <motion.span
                    className="block border"
                    animate={{
                      width: active ? '14px' : '10px',
                      height: active ? '14px' : '10px',
                      background: active ? R : 'transparent',
                      borderColor: active ? R : 'rgba(204,17,51,0.5)',
                      boxShadow: active ? `0 0 12px ${R}, 0 0 24px rgba(204,17,51,0.4)` : 'none',
                      rotate: 45,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <span
                    className="absolute -top-7 left-1/2 -translate-x-1/2 font-pixel whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ fontSize: '6px', color: R, textShadow: `0 0 8px ${R}` }}
                  >
                    {SECTION_LABELS[section]}
                  </span>
                </button>
              );
            })}
          </div>

          <NavBtn label="NEXT" icon="▶" onClick={() => onNavigate('skills')} side="right" />
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ANIMATED CYBERPUNK BACKGROUND
══════════════════════════════════════════════ */
function CyberpunkBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex:0 }}>
      {/* Base dark radial */}
      <div className="absolute inset-0" style={{
        background:'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(40,4,16,0.9) 0%, rgba(6,4,8,1) 70%)',
      }}/>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.12]" style={{
        backgroundImage:'linear-gradient(rgba(204,17,51,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(204,17,51,0.5) 1px,transparent 1px)',
        backgroundSize:'40px 40px',
      }}/>

      {/* Horizontal glow band top */}
      <div className="absolute left-0 right-0 h-px opacity-30" style={{ top:'58px', background:`linear-gradient(90deg,transparent,${R},transparent)`, boxShadow:`0 0 12px ${R}` }}/>

      {/* Scanlines */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.5) 3px,rgba(0,0,0,0.5) 4px)',
      }}/>

      {/* Glowing corner blobs */}
      <div className="absolute top-0 left-0 w-96 h-64 opacity-10" style={{
        background:`radial-gradient(circle, ${R} 0%, transparent 70%)`,
        filter:'blur(60px)',
      }}/>
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-8" style={{
        background:`radial-gradient(circle, ${R} 0%, transparent 70%)`,
        filter:'blur(80px)',
      }}/>

      {/* Floating diagonal accent lines */}
      {[15, 35, 65, 82].map((pct, i) => (
        <motion.div key={i}
          className="absolute top-0 bottom-0 w-px opacity-[0.06]"
          style={{ left:`${pct}%`, background:`linear-gradient(to bottom,transparent,${R},transparent)` }}
          animate={{ opacity:[0.04,0.1,0.04] }}
          transition={{ duration:4+i, repeat:Infinity, delay:i*1.2 }}
        />
      ))}

      {/* Animated horizontal sweep */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{ background:`linear-gradient(90deg,transparent,${R},transparent)`, top:'40%' }}
        animate={{ opacity:[0,0.25,0], scaleX:[0.3,1,0.3] }}
        transition={{ duration:5, repeat:Infinity, repeatDelay:3 }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   OUTER HUD FRAME (red border + corner marks)
══════════════════════════════════════════════ */
function OuterFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {/* 4 borders */}
      {['top-0 left-0 right-0 h-[1.5px]','bottom-0 left-0 right-0 h-[1.5px]',
        'top-0 bottom-0 left-0 w-[1.5px]','top-0 bottom-0 right-0 w-[1.5px]'].map((c,i) => (
        <div key={i} className={`absolute ${c}`}
          style={{ background:R, boxShadow:`0 0 8px ${R}88, 0 0 20px ${R}33` }}/>
      ))}
      {/* Corner L-brackets */}
      {([
        ['top-0 left-0',    `M2 44L2 2L44 2`,    0,    0   ],
        ['top-0 right-0',   `M6 2L50 2L50 44`,   44,   0   ],
        ['bottom-0 left-0', `M2 6L2 50L44 50`,   0,    44  ],
        ['bottom-0 right-0',`M6 50L50 50L50 6`,  44,   44  ],
      ] as [string,string,number,number][]).map(([pos,path,sx,sy],i) => (
        <svg key={i} className={`absolute ${pos}`} width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path d={path} stroke={R} strokeWidth="2" style={{ filter:`drop-shadow(0 0 4px ${R})` }}/>
          <rect x={sx} y={sy} width="8" height="8" fill={R} opacity="0.9" style={{ filter:`drop-shadow(0 0 3px ${R})` }}/>
        </svg>
      ))}
      {/* Tick marks */}
      {[20,40,60,80].map(p => <div key={`t${p}`} className="absolute top-0 w-px h-3 opacity-40" style={{ left:`${p}%`,background:R }}/>)}
      {[20,40,60,80].map(p => <div key={`b${p}`} className="absolute bottom-0 w-px h-3 opacity-40" style={{ left:`${p}%`,background:R }}/>)}
      {[25,50,75].map(p => <div key={`l${p}`} className="absolute left-0 h-px w-3 opacity-35" style={{ top:`${p}%`,background:R }}/>)}
      {[25,50,75].map(p => <div key={`r${p}`} className="absolute right-0 h-px w-3 opacity-35" style={{ top:`${p}%`,background:R }}/>)}
      {/* Sweeping glow top */}
      <motion.div className="absolute top-0 h-[1.5px]"
        style={{ width:100, background:`linear-gradient(90deg,transparent,${R2},transparent)`, boxShadow:`0 0 12px ${R}` }}
        animate={{ left:[-100,'100%'] }}
        transition={{ duration:5.5, repeat:Infinity, ease:'linear', repeatDelay:2 }}
      />
      <motion.div className="absolute bottom-0 h-[1.5px]"
        style={{ width:100, background:`linear-gradient(90deg,transparent,${R2},transparent)`, boxShadow:`0 0 12px ${R}` }}
        animate={{ left:['100%',-100] }}
        transition={{ duration:5.5, repeat:Infinity, ease:'linear', repeatDelay:2, delay:2.75 }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   PROFILE CARD
══════════════════════════════════════════════ */
function ProfileCard({ inView }: { inView:boolean }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(()=>setGlitch(false), 80);
      setTimeout(()=>{ setGlitch(true); setTimeout(()=>setGlitch(false),55); }, 150);
    }, 5200 + Math.random()*2800);
    return () => clearInterval(id);
  }, []);

  return (
    <Panel className="flex flex-col items-center gap-3 py-5 px-4">
      {/* Avatar */}
      <motion.div
        animate={{ y:[0,-7,0] }}
        transition={{ duration:4.2, repeat:Infinity, ease:'easeInOut' }}
        className="relative"
      >
        <div className="relative w-[120px] h-[120px] flex items-center justify-center"
          style={{
            border:`1px solid ${R}55`,
            background:'rgba(16,4,10,0.95)',
            boxShadow: glitch
              ? `-3px 0 ${R2}66, 3px 0 #0088ff66, 0 0 24px ${R}55`
              : `0 0 24px ${R}28, inset 0 0 24px rgba(0,0,0,0.7)`,
            transition:'box-shadow 0.05s',
          }}
        >
          <img src="/assets/icon-kai-cat3.png" alt="Kai Shi"
            className="w-[90px] h-[90px] object-contain"
            style={{ ...PIX,
              filter:`drop-shadow(0 0 10px ${R})`,
              transform: glitch ? 'translateX(3px)' : 'none',
              transition:'transform 0.05s',
            }}
          />
          <Corners size={7} />
        </div>
      </motion.div>

      {/* Name */}
      <div className="text-center">
        <div className="font-pixel text-lg text-white leading-none"
          style={{
            textShadow: glitch ? `3px 0 #ff0044,-3px 0 #0088ff,0 0 20px ${R}` : `0 0 16px ${R}55`,
            transition:'text-shadow 0.05s',
            letterSpacing:'0.06em',
          }}>
          KAI SHI
        </div>
        <div className="font-pixel text-[7px] tracking-[0.28em] mt-1.5" style={{ color:'#7a6068' }}>
          WEB ADVENTURER
        </div>
      </div>

      {/* Stats */}
      <div className="w-full space-y-2.5 px-1">
        {/* LVL */}
        <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.35}}>
          <div className="flex justify-between mb-1">
            <span className="font-pixel text-[8px]" style={{color:'#7a6068'}}>LVL</span>
            <span className="font-pixel text-[15px] leading-none text-white" style={{textShadow:`0 0 10px ${R}88`}}>21</span>
            <span className="font-pixel text-[8px]" style={{color:R}}>75%</span>
          </div>
          <SegBar value={75} color={R} segs={16} inView={inView} delay={0.4}/>
        </motion.div>

        {/* EXP */}
        <StatRow icon="/assets/icon-kai-petir.png" label="EXP" display="12,580 / 16,680"
          value={75} color={R} inView={inView} delay={0.48}/>

        {/* HP */}
        <StatRow icon="/assets/icon-kai-heart.png" label="HP" display="550 / 550"
          value={100} color="#22c55e" inView={inView} delay={0.56}/>
      </div>
    </Panel>
  );
}

/* ══════════════════════════════════════════════
   BIOGRAPHY PANEL
══════════════════════════════════════════════ */
function BioPanel({ inView }: { inView:boolean }) {
  return (
    <Panel className="flex flex-col gap-4 py-5 px-5">
      <SecLabel label="BIOGRAPHY" />

      <motion.div
        initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.22,duration:0.5}}
        className="space-y-3 font-mono text-sm leading-relaxed" style={{color:'rgba(232,224,227,0.75)'}}
      >
        <p>A digital traveler building immersive worlds through code, creativity, and endless nights.</p>
        <p>I turn ideas into interactive experiences and bring anime vibes to the web.</p>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{opacity:0,x:-8}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.38,duration:0.5}}
        className="relative py-3 px-4"
        style={{
          borderTop:`1px solid ${R}22`, borderRight:`1px solid ${R}22`,
          borderBottom:`1px solid ${R}22`, borderLeft:`3px solid ${R}`,
          background:`rgba(204,17,51,0.05)`,
        }}
      >
        <span className="absolute top-1 left-2 font-mono text-2xl leading-none" style={{color:`${R}55`}}>"</span>
        <div className="font-mono text-sm leading-relaxed pl-2 pt-2" style={{color:'rgba(232,224,227,0.65)'}}>
          Code is my weapon.<br/>Creativity is my power.<br/>The web is my playground.
        </div>
        <img src="/assets/icon-kai-cat2.png" alt=""
          className="absolute bottom-2 right-2 w-5 h-5 object-contain opacity-40" style={PIX}/>
      </motion.div>

      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[8px] tracking-widest" style={{color:'#7a6068'}}>STATUS:</span>
          <motion.span className="font-pixel text-[8px]" style={{color:'#22c55e'}}
            animate={{opacity:[1,0.35,1]}} transition={{duration:2,repeat:Infinity}}>ONLINE</motion.span>
          <motion.div className="w-2 h-2 rounded-full" style={{background:'#22c55e',boxShadow:'0 0 6px #22c55e'}}
            animate={{opacity:[1,0.2,1]}} transition={{duration:2,repeat:Infinity}}/>
        </div>
      </div>
    </Panel>
  );
}

/* ══════════════════════════════════════════════
   CORE STATS PANEL
══════════════════════════════════════════════ */
function StatsPanel({ inView }: { inView:boolean }) {
  const [hover, setHover] = useState<number|null>(null);
  return (
    <Panel className="flex flex-col gap-3 py-5 px-5">
      <SecLabel label="CORE STATS"/>
      <div className="space-y-3 flex-1">
        {CORE_STATS.map((s,i) => (
          <motion.div key={s.label}
            initial={{opacity:0,x:14}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.12+i*0.07,duration:0.42}}
            className="group cursor-default"
            onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}
          >
            <div className="flex items-center gap-2 mb-1">
              <img src={s.icon} alt="" className="w-4 h-4 object-contain shrink-0"
                style={{ ...PIX,
                  filter: hover===i ? `drop-shadow(0 0 6px ${R}) brightness(1.3)` : `drop-shadow(0 0 3px ${R}88)`,
                  transition:'filter 0.15s',
                }}
              />
              <span className="font-pixel text-[8px] flex-1 tracking-wide"
                style={{color: hover===i ? '#e8e0e3' : '#a09098', transition:'color 0.15s'}}>
                {s.label}
              </span>
              <span className="font-pixel text-[9px]"
                style={{color: hover===i ? R2 : R, transition:'color 0.15s',
                  textShadow: hover===i ? `0 0 8px ${R}` : 'none'}}>
                {s.value}
              </span>
            </div>
            <SegBar value={s.value} color={R} segs={14} inView={inView} delay={0.18+i*0.08} active={hover===i}/>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

/* ══════════════════════════════════════════════
   SKILL TREE PANEL
══════════════════════════════════════════════ */
function SkillsPanel({ inView }: { inView:boolean }) {
  const [hover, setHover] = useState<number|null>(null);
  return (
    <Panel className="flex flex-col gap-4 py-5 px-5">
      <SecLabel label="SKILL TREE"/>

      {/* Row 1: unlocked */}
      <div className="grid grid-cols-3 gap-2">
        {SKILLS.slice(0,3).map((sk,i) => (
          <SkillNode key={i} skill={sk} inView={inView} delay={0.18+i*0.09}
            hovered={hover===i} onHover={()=>setHover(i)} onLeave={()=>setHover(null)}/>
        ))}
      </div>

      {/* Connector lines */}
      <div className="relative h-4 flex justify-around px-6">
        {[0,1,2].map(i=>(
          <div key={i} className="flex flex-col items-center">
            <div className="w-px flex-1" style={{background:`${R}33`}}/>
          </div>
        ))}
        <div className="absolute top-1/2 left-6 right-6 h-px" style={{background:`${R}22`}}/>
      </div>

      {/* Row 2: locked */}
      <div className="grid grid-cols-3 gap-2">
        {SKILLS.slice(3).map((sk,i) => (
          <SkillNode key={i+3} skill={sk} inView={inView} delay={0.36+i*0.09}
            hovered={false} onHover={()=>{}} onLeave={()=>{}}/>
        ))}
      </div>

      <button
        className="w-full font-pixel text-[8px] py-2 mt-auto tracking-widest transition-all"
        style={{ border:`1px solid ${R}44`, color:R, background:'transparent' }}
        onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=`${R}18`; el.style.boxShadow=`0 0 12px ${R}44`; el.style.borderColor=R; }}
        onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.boxShadow='none'; el.style.borderColor=`${R}44`; }}
      >
        VIEW DETAILS &gt;
      </button>
    </Panel>
  );
}

function SkillNode({ skill, inView, delay, hovered, onHover, onLeave }: {
  skill:SkillNode; inView:boolean; delay:number;
  hovered:boolean; onHover:()=>void; onLeave:()=>void;
}) {
  return (
    <motion.div
      initial={{opacity:0,scale:0.75}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay,duration:0.38}}
      className="flex flex-col items-center gap-1.5 cursor-default"
      onMouseEnter={onHover} onMouseLeave={onLeave}
    >
      <motion.div
        className="relative w-[52px] h-[52px] flex items-center justify-center"
        animate={{
          boxShadow: skill.locked ? 'none' : hovered
            ? `0 0 18px ${R}88, 0 0 8px ${R}55, inset 0 0 12px rgba(0,0,0,0.5)`
            : `0 0 8px ${R}33, inset 0 0 8px rgba(0,0,0,0.6)`,
        }}
        style={{
          border: skill.locked ? `1px solid rgba(61,15,26,0.35)` : `1px solid ${R}${hovered?'88':'44'}`,
          background: skill.locked ? 'rgba(8,3,6,0.6)' : 'rgba(16,4,10,0.9)',
          transition:'border-color 0.2s, background 0.2s',
        }}
      >
        {skill.locked ? (
          <span style={{color:'#2a0f16', fontSize:'20px'}}>🔒</span>
        ) : (
          <motion.img src={skill.icon} alt={skill.label} className="w-8 h-8 object-contain" style={PIX}
            animate={{ filter: hovered ? `drop-shadow(0 0 8px ${R}) brightness(1.4)` : `drop-shadow(0 0 4px ${R}88) brightness(1)` }}
            transition={{duration:0.2}}
          />
        )}
        <Corners size={5}/>
      </motion.div>
      <span className="font-pixel text-[6px] tracking-wider text-center"
        style={{color: skill.locked ? '#2a0f16' : hovered ? R : '#8a7078'}}>
        {skill.label}
      </span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   GALLERY SECTION
══════════════════════════════════════════════ */
function GallerySection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });
  const [filter,   setFilter  ] = useState<GFilter>('ALL');
  const [selected, setSelected] = useState(1);

  const items = filter==='ALL' ? GALLERY : GALLERY.filter(g=>g.tag===filter);

  const prev = () => setSelected(s => (s-1+items.length)%items.length);
  const next = () => setSelected(s => (s+1)%items.length);

  useEffect(() => { setSelected(0); }, [filter]);

  return (
    <div ref={ref}>
      <Panel className="p-0 overflow-hidden">
        {/* Separator line top */}
        <div className="h-px w-full" style={{background:`linear-gradient(90deg,transparent,${R}44,transparent)`}}/>

        <div className="flex" style={{minHeight:'300px'}}>

          {/* ── LEFT META PANEL ── */}
          <div className="flex flex-col gap-4 px-5 py-5 shrink-0"
            style={{ width:'240px', borderRight:`1px solid rgba(61,15,26,0.7)` }}>

            <SecLabel label="GALLERY"/>

            <motion.div initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.18}}>
              <h2 className="font-pixel text-[13px] text-white leading-tight mb-2"
                style={{textShadow:`0 0 12px ${R}44`}}>
                MY DIGITAL<br/>LOGS
              </h2>
              <p className="font-mono text-xs leading-relaxed" style={{color:'rgba(160,144,152,0.7)'}}>
                Snapshots of ideas, experiments,<br/>and worlds I've built.
              </p>
            </motion.div>

            {/* Filter buttons */}
            <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.3}}
              className="flex flex-col gap-1">
              <span className="font-pixel text-[7px] tracking-widest" style={{color:'#3a2030'}}>FILTER:</span>
              <div className="flex flex-wrap gap-1.5">
                {GALLERY_FILTERS.map(f=>(
                  <motion.button key={f} onClick={()=>setFilter(f)}
                    whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                    className="font-pixel text-[7px] px-2.5 py-1 tracking-wide transition-all"
                    style={{
                      border:`1px solid ${filter===f ? R : '#3d0f1a'}`,
                      background: filter===f ? R : 'rgba(10,3,8,0.8)',
                      color: filter===f ? '#fff' : '#7a6068',
                      boxShadow: filter===f ? `0 0 10px ${R}66` : 'none',
                    }}
                  >{f}</motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── CAROUSEL AREA ── */}
          <div className="relative flex-1 flex flex-col">

            {/* Images row with side arrows */}
            <div className="relative flex-1 flex items-stretch gap-0" style={{minHeight:'240px'}}>

              {/* LEFT ARROW — vertically centered on left edge of carousel */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
                <CarouselArrow dir="left" onClick={prev}/>
              </div>

              {/* Cards */}
              <div className="flex-1 flex gap-2 p-3 pl-12 pr-12 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {items.map((item,i) => {
                    const isSel = i===selected;
                    return (
                      <motion.div key={`${filter}-${item.id}`}
                        onClick={()=>setSelected(i)}
                        layout
                        initial={{opacity:0,scale:0.88}}
                        animate={{
                          opacity:1, scale:1,
                          flex: isSel ? 2.8 : 1,
                          filter: isSel ? 'none' : 'brightness(0.55)',
                        }}
                        exit={{opacity:0,scale:0.88}}
                        transition={{duration:0.38,ease:[0.16,1,0.3,1]}}
                        className="relative overflow-hidden cursor-pointer"
                        style={{
                          minWidth:0,
                          border: isSel ? `1.5px solid ${R}` : `1px solid rgba(61,15,26,0.5)`,
                          boxShadow: isSel
                            ? `0 0 24px ${R}66, 0 0 8px ${R}44, inset 0 0 20px rgba(0,0,0,0.3)`
                            : '0 0 4px rgba(0,0,0,0.5)',
                          transition:'border-color 0.3s, box-shadow 0.3s',
                        }}
                      >
                        {/* Image */}
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover absolute inset-0"
                          style={{transition:'filter 0.35s'}}/>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 pointer-events-none"
                          style={{background: isSel
                            ? 'linear-gradient(to top,rgba(4,1,10,0.9) 0%,rgba(4,1,10,0.2) 50%,transparent 100%)'
                            : 'rgba(4,1,10,0.35)'}}/>

                        {/* SELECTED badge */}
                        {isSel && (
                          <motion.div initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}}
                            className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                            style={{
                              background:R, padding:'3px 14px',
                              clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 10px))',
                              boxShadow:`0 0 16px ${R}`,
                            }}
                          >
                            <span className="font-pixel text-[7px] text-white tracking-widest">SELECTED</span>
                          </motion.div>
                        )}

                        {/* Card info */}
                        <AnimatePresence>
                          {isSel && (
                            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}
                              className="absolute bottom-0 left-0 right-0 p-3 z-10">
                              <div className="font-pixel text-[9px] text-white tracking-wider"
                                style={{textShadow:`0 0 8px ${R}`}}>{item.title}</div>
                              <div className="font-pixel text-[7px] mt-0.5" style={{color:R}}>{item.tag}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Corner marks on selected */}
                        {isSel && <Corners size={8}/>}

                        {/* Hover glow for non-selected */}
                        {!isSel && (
                          <motion.div className="absolute inset-0 pointer-events-none"
                            whileHover={{background:`rgba(204,17,51,0.08)`}}
                            style={{transition:'background 0.2s'}}/>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* RIGHT ARROW */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
                <CarouselArrow dir="right" onClick={next}/>
              </div>
            </div>

            {/* ── DOTS — bottom of carousel container ── */}
            <div className="flex justify-center items-center gap-3 py-3 border-t"
              style={{borderColor:'rgba(61,15,26,0.5)'}}>
              {items.map((_,i) => (
                <button key={i} onClick={()=>setSelected(i)} className="flex items-center justify-center w-5 h-5">
                  <motion.span className="block border"
                    animate={{
                      width:  i===selected ? '12px' : '8px',
                      height: i===selected ? '12px' : '8px',
                      background: i===selected ? R : 'transparent',
                      borderColor: i===selected ? R : `${R}50`,
                      rotate: 45,
                      boxShadow: i===selected ? `0 0 10px ${R}, 0 0 20px ${R}44` : 'none',
                    }}
                    transition={{duration:0.2}}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ══════════════════════════════════════════════
   STATUS BAR
══════════════════════════════════════════════ */
function StatusBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(()=>setTime(new Date()),1000);
    return ()=>clearInterval(t);
  },[]);
  const pad = (n:number) => String(n).padStart(2,'0');

  return (
    <div className="flex items-center justify-between px-4 py-2"
      style={{border:`1px solid rgba(61,15,26,0.6)`, background:'rgba(6,2,8,0.85)'}}>
      <div className="flex items-center gap-2">
        <img src="/assets/icon-kai-cat1.png" alt="" className="w-3.5 h-3.5 object-contain opacity-55" style={PIX}/>
        <span className="font-pixel text-[7px]" style={{color:'#5a3040'}}>
          <span style={{color:R}}>TIP:</span> Explore more. The deeper you go, the more you'll discover.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <motion.span className="font-pixel text-[7px]" style={{color:'#3a2030'}}
          animate={{opacity:[0.4,0.9,0.4]}} transition={{duration:3,repeat:Infinity}}>
          ◆ SYSTEM LOG: PROFILE DATA SYNCED
        </motion.span>
        <span className="font-pixel text-[8px] tabular-nums" style={{color:'#7a6068'}}>
          {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════ */

/* HUD panel */
function Panel({ children, className='' }: { children:React.ReactNode; className?:string }) {
  return (
    <div className={`relative ${className}`}
      style={{
        border:`1px solid rgba(61,15,26,0.75)`,
        background:'rgba(7,2,5,0.88)',
        boxShadow:`0 0 18px rgba(204,17,51,0.05), inset 0 0 18px rgba(0,0,0,0.45)`,
        backdropFilter:'blur(4px)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{background:`linear-gradient(90deg,transparent,${R}38,transparent)`}}/>
      {children}
    </div>
  );
}

/* Section label */
function SecLabel({ label }:{ label:string }) {
  return (
    <div className="font-pixel text-[8px] tracking-widest flex items-center gap-1" style={{color:R}}>
      <span style={{color:`${R}80`}}>//</span> {label}
    </div>
  );
}

/* Carousel arrow */
function CarouselArrow({ dir, onClick }:{ dir:'left'|'right'; onClick:()=>void }) {
  return (
    <motion.button onClick={onClick} whileHover={{scale:1.12}} whileTap={{scale:0.9}}
      className="w-8 h-8 flex items-center justify-center font-pixel text-xs"
      style={{
        border:`1px solid ${R}55`, color:R, background:'rgba(8,2,6,0.9)',
        clipPath:'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)',
        boxShadow:`0 0 8px ${R}33`,
      }}
      onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.boxShadow=`0 0 16px ${R}66`; el.style.borderColor=R; }}
      onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.boxShadow=`0 0 8px ${R}33`; el.style.borderColor=`${R}55`; }}
    >
      {dir==='left' ? '◀' : '▶'}
    </motion.button>
  );
}

/* PREV / NEXT button */
function NavBtn({ label, icon, onClick, side }:{
  label:string; icon:string; onClick:()=>void; side:'left'|'right';
}) {
  const clip = side === 'left'
    ? 'polygon(10px 0,100% 0,100% 100%,0 100%,0 10px)'
    : 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="flex items-center gap-2 font-pixel transition-all"
      style={{
        fontSize: '9px',
        color: '#7a6068',
        border: '1px solid rgba(61,15,26,0.9)',
        padding: '9px 18px',
        background: 'rgba(8,2,6,0.78)',
        clipPath: clip,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = R;
        el.style.borderColor = R;
        el.style.boxShadow = '0 0 12px rgba(204,17,51,0.3)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = '#7a6068';
        el.style.borderColor = 'rgba(61,15,26,0.9)';
        el.style.boxShadow = 'none';
      }}
    >
      {side === 'left' && <span style={{ fontSize: '13px' }}>{icon}</span>}
      {label}
      {side === 'right' && <span style={{ fontSize: '13px' }}>{icon}</span>}
    </motion.button>
  );
}

/* Segmented bar */
function SegBar({ value, color, segs=18, inView, delay=0, active=false }: {
  value:number; color:string; segs?:number; inView?:boolean; delay?:number; active?:boolean;
}) {
  const filled = Math.round((value/100)*segs);
  return (
    <div className="flex gap-[2px]">
      {Array.from({length:segs}).map((_,i) => (
        <motion.div key={i}
          initial={{opacity:0,scaleY:0.3}}
          animate={inView !== undefined
            ? (inView && i<filled ? {opacity:1,scaleY:1} : {opacity:i<filled?0.15:0.07,scaleY:1})
            : (i<filled ? {opacity:1,scaleY:1} : {opacity:0.1,scaleY:1})
          }
          transition={{delay:delay+i*0.018,duration:0.22}}
          style={{
            flex:1, height:'6px',
            background: i<filled ? color : `${color}1a`,
            boxShadow: i<filled ? `0 0 ${active?7:3}px ${color}${active?'cc':'88'}` : 'none',
            transition:'box-shadow 0.15s',
          }}
        />
      ))}
    </div>
  );
}

/* Stat row with icon */
function StatRow({ icon, label, display, value, color, inView, delay }:{
  icon:string; label:string; display:string; value:number; color:string; inView:boolean; delay:number;
}) {
  return (
    <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay}} className="flex items-center gap-2">
      <img src={icon} alt="" className="w-4 h-4 object-contain shrink-0" style={PIX}/>
      <div className="flex-1">
        <div className="flex justify-between mb-0.5">
          <span className="font-pixel text-[7px]" style={{color:'#7a6068'}}>{label}</span>
          <span className="font-pixel text-[7px]" style={{color}}>{display}</span>
        </div>
        <SegBar value={value} color={color} segs={14} inView={inView} delay={delay}/>
      </div>
    </motion.div>
  );
}

/* Corner L-marks */
function Corners({ size=8 }:{ size?:number }) {
  const s: React.CSSProperties = {
    position:'absolute', width:size, height:size,
    borderTop:`1.5px solid ${R}`, borderLeft:`1.5px solid ${R}`, pointerEvents:'none',
  };
  return (
    <>
      <div style={{...s, top:0, left:0}}/>
      <div style={{...s, top:0, right:0, borderLeft:'none', borderRight:`1.5px solid ${R}`, transform:'none'}}/>
      <div style={{...s, bottom:0, left:0, borderTop:'none', borderBottom:`1.5px solid ${R}`}}/>
      <div style={{...s, bottom:0, right:0, borderTop:'none', borderLeft:'none', borderBottom:`1.5px solid ${R}`, borderRight:`1.5px solid ${R}`}}/>
    </>
  );
}
