import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { SectionId } from '../../App';

/* ─── Types ─── */
interface AboutProps { onNavigate: (id: SectionId) => void; }
interface GalleryItem { id: number; title: string; sub: string; tag: string; image: string; }

/* ─── Data ─── */
const GALLERY_FILTERS = ['ALL','WORK','LIFE','CODE','EXPERIMENT'] as const;
type GFilter = typeof GALLERY_FILTERS[number];

const GALLERY: GalleryItem[] = [
  { id:1, title:'DARK DASHBOARD',   sub:'UI/UX • WEB APP',   tag:'WORK',       image:'/assets/gallery/KaiShiPose1.png' },
  { id:2, title:'NEON CODE',        sub:'UI DESIGN ◆',       tag:'CODE',       image:'/assets/gallery/KaiShiPose2.png' },
  { id:3, title:'MIDNIGHT SESSION', sub:'CODING ◆',          tag:'LIFE',       image:'/assets/gallery/KaiShiPose3.png' },
  { id:4, title:'GAME DEV',         sub:'PROJECT ◆',         tag:'WORK',       image:'/assets/gallery/KaiShiPose4.png' },
  { id:5, title:'CONTENT CREATOR',  sub:'YOUTUBE • TIKTOK',  tag:'LIFE',       image:'/assets/gallery/KaiShiPose5.png' },
  { id:6, title:'CHAOS MODE',       sub:'EXPERIMENT ◆',      tag:'EXPERIMENT', image:'/assets/gallery/KaiShiPose6.png' },
];

const CORE_STATS = [
  { label:'CODING POWER',    value:86, icon:'code'     },
  { label:'PROBLEM SOLVING', value:92, icon:'puzzle'   },
  { label:'DESIGN SENSE',    value:78, icon:'palette'  },
  { label:'CREATIVITY',      value:89, icon:'lightning'},
  { label:'LOGIC',           value:90, icon:'brain'    },
  { label:'ADAPTABILITY',    value:87, icon:'cycle'    },
];

const TAGS = ['FRONTEND BUILDER','CONTENT CREATOR','ANIME ENTHUSIAST','PROBLEM SOLVER'];

const R   = '#cc1133';
const R2  = '#ff2244';
const R3  = '#ff6688';
const DIM = '#3d0f1a';

/* ─── Custom Styles & Keyframes ─── */
const injectedStyles = `
  @keyframes heartbeat {
    0%, 100% { transform: scaleX(1); }
    10% { transform: scaleX(1.8); }
    20% { transform: scaleX(0.6); }
    30% { transform: scaleX(1.4); }
    40% { transform: scaleX(0.8); }
    50% { transform: scaleX(1); }
  }
  @keyframes scanH {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; filter: blur(60px); }
    50% { opacity: 1; filter: blur(40px); }
  }
  @keyframes borderSweep {
    0% { left: -150px; }
    100% { left: 110%; }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-7px); }
  }
  @keyframes neonFlicker {
    0%, 94%, 96%, 100% { opacity: 1; }
    95% { opacity: 0.3; }
    97% { opacity: 0.8; }
    99% { opacity: 0.4; }
  }
  
  .animate-float-y { animation: floatY 3.5s ease-in-out infinite; }
  .animate-neon-flicker { animation: neonFlicker 6s infinite; }
  .animate-glow-pulse { animation: glowPulse 5s ease-in-out infinite; }
  .animate-glow-pulse-delayed { animation: glowPulse 7s ease-in-out infinite 2s; }
  .animate-scan-h { animation: scanH 8s linear infinite; }
  .animate-border-sweep { animation: borderSweep 6s linear infinite; }

  .skill-tree-scroll::-webkit-scrollbar { width: 3px; }
  .skill-tree-scroll::-webkit-scrollbar-thumb { background: #cc113366; border-radius: 2px; }
  .skill-tree-scroll { scrollbar-width: thin; scrollbar-color: #cc113344 transparent; }
`;

export function About({ onNavigate }: AboutProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <>
      <style>{injectedStyles}</style>
      <div ref={ref} className="relative w-full h-full overflow-y-auto overflow-x-hidden overscroll-contain bg-[#060408] text-[#e8e0e3]">
        <div className="relative z-10 flex flex-col pt-[80px] px-[40px] pb-0 min-h-full gap-[14px]">
          <BG />
          <OuterFrame />
          
          {/* ── TOP FOUR PANELS ── */}
          <motion.div
            initial={{opacity:0,y:16}}
            animate={inView?{opacity:1,y:0}:{}}
            transition={{duration:0.55,delay:0.05}}
            className="grid grid-cols-1 min-[1100px]:grid-cols-[290px_1fr_270px_270px] gap-[14px] items-stretch"
          >
            <ProfileCard inView={inView}/>
            <BiographyPanel inView={inView}/>
            <CoreStatsPanel inView={inView}/>
            <SkillTreePanel inView={inView}/>
          </motion.div>

          {/* ── LOWER CONTENT / GALLERY ── */}
          <motion.div
            className="grid grid-cols-1 min-[1100px]:grid-cols-[290px_minmax(0,1fr)] gap-[14px] items-stretch"
            initial={{opacity:0,y:20}}
            animate={inView?{opacity:1,y:0}:{}}
            transition={{duration:0.55,delay:0.2}}
          >
            <AboutRailStack onNavigate={onNavigate} inView={inView}/>
            <GallerySection/>
          </motion.div>

          <NavDotsBar onNavigate={onNavigate}/>
        </div>
      </div>
    </>
  );
}

function BG() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_25%,rgba(36,4,14,0.95)_0%,#060408_68%)]"/>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(204,17,51,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(204,17,51,0.055)_1px,transparent_1px)] [background-size:38px_38px]"/>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.28)_3px,rgba(0,0,0,0.28)_4px)]"/>
      <div className="absolute -top-[80px] -left-[80px] w-[500px] h-[400px] bg-[radial-gradient(circle,#cc113355_0%,transparent_70%)] animate-glow-pulse"/>
      <div className="absolute -bottom-[100px] -right-[100px] w-[600px] h-[500px] bg-[radial-gradient(circle,#cc113333_0%,transparent_70%)] animate-glow-pulse-delayed"/>
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#cc1133]/30 to-transparent opacity-0 animate-scan-h"/>
      {[18,38,62,82].map((p,i) => (
        <motion.div key={i} className="absolute top-0 bottom-0 w-[1px]"
          animate={{opacity:[0.02,0.07,0.02]}}
          transition={{duration:4+i,repeat:Infinity,delay:i*1.4}}
          style={{background:`linear-gradient(to bottom,transparent,${R},transparent)`,left:`${p}%`}}
        />
      ))}
    </div>
  );
}

function OuterFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {['top-0','bottom-0'].map((c,i) => (
        <div key={i} className={`absolute left-0 right-0 h-[1.5px] bg-[linear-gradient(90deg,transparent,#cc1133,#cc1133,transparent)] shadow-[0_0_10px_#cc113388,0_0_24px_#cc113333] ${c}`}/>
      ))}
      {['left-0','right-0'].map((c,i) => (
        <div key={i} className={`absolute top-0 bottom-0 w-[1.5px] bg-[linear-gradient(180deg,transparent,#cc1133,#cc1133,transparent)] shadow-[0_0_10px_#cc113388,0_0_24px_#cc113333] ${c}`}/>
      ))}
      {([
        ['top-0 left-0',    `M2 44L2 2L44 2`,   0, 0 ],
        ['top-0 right-0',   `M6 2L50 2L50 44`,  42,0 ],
        ['bottom-0 left-0', `M2 6L2 50L44 50`,  0, 42],
        ['bottom-0 right-0',`M6 50L50 50L50 6`, 42,42],
      ] as [string,string,number,number][]).map(([pos,d,sx,sy],i)=>(
        <svg key={i} className={`absolute ${pos}`} width="52" height="52" viewBox="0 0 52 52" fill="none" style={{filter:`drop-shadow(0 0 5px ${R})`}}>
          <path d={d} stroke={R} strokeWidth="2.5" />
          <rect x={sx} y={sy} width="10" height="10" fill={R} opacity="0.95" style={{filter:`drop-shadow(0 0 4px ${R})`}}/>
        </svg>
      ))}
      {[20,40,60,80].map(p=><div key={`t${p}`} className="absolute w-[1px] h-[12px] bg-[#cc1133]/40 top-0" style={{left:`${p}%`}}/>)}
      {[20,40,60,80].map(p=><div key={`b${p}`} className="absolute w-[1px] h-[12px] bg-[#cc1133]/40 bottom-0" style={{left:`${p}%`}}/>)}
      <div className="absolute top-0 h-[1.5px] w-[130px] bg-[linear-gradient(90deg,transparent,#ff2244,transparent)] shadow-[0_0_14px_#cc1133] animate-border-sweep"/>
    </div>
  );
}

function ProfileCard({inView}:{inView:boolean}) {
  const [glitch,setGlitch] = useState(false);
  useEffect(()=>{
    const id = setInterval(()=>{
      setGlitch(true);
      setTimeout(()=>setGlitch(false),80);
      setTimeout(()=>{setGlitch(true);setTimeout(()=>setGlitch(false),55);},150);
    },5500+Math.random()*3000);
    return()=>clearInterval(id);
  },[]);

  return (
    <Panel className="!p-0 overflow-hidden flex-1 h-auto min-h-0">
      <Corners c={R} s={9} />
      {/* Header label */}
      <div className="flex items-center gap-[8px] p-[12px_12px_4px]">
        <img src="/assets/icon-kai-cat1.png" alt="" className="w-[14px] h-[14px] [image-rendering:pixelated] drop-shadow-[0_0_4px_#cc1133]"/>
        <span className="font-pixel text-[9px] tracking-[0.1em] text-[#cc1133]">/ USER PROFILE</span>
        <div className="flex items-center gap-[2px] ml-[4px]">
          {[1,0.6,0.4].map((o,i)=>(
            <motion.div key={i} className="w-[3px] h-[10px] bg-[#cc1133]" style={{opacity:o}}
              animate={{opacity:[o,o*0.2,o]}} transition={{duration:1.2,repeat:Infinity,delay:i*0.2}}/>
          ))}
        </div>
      </div>

      {/* Character image in glowing circular frame */}
      <div className="relative flex items-center justify-center h-[226px] overflow-hidden">
        <motion.div animate={{rotate:360}} transition={{duration:22,repeat:Infinity,ease:'linear'}} className="w-[196px] h-[196px] rounded-full border border-dashed border-[#cc1133]/20 absolute"/>
        <div className="w-[208px] h-[208px] rounded-full border border-transparent absolute">
          {[0,60,120,180,240,300].map((deg,i)=>(
            <div key={i} style={{
              position:'absolute',top:'50%',left:'50%', width:'6px',height:'3px',
              background: i%2===0 ? R : `${R}55`,
              transform:`translate(-50%,-50%) rotate(${deg}deg) translateX(104px)`,
              boxShadow: i%2===0 ? `0 0 6px ${R}` : 'none',
            }}/>
          ))}
        </div>
        <motion.div animate={{rotate:-360}} transition={{duration:35,repeat:Infinity,ease:'linear'}} className="w-[182px] h-[182px] rounded-full border border-dashed border-[#cc1133]/20 absolute"/>
        <div className="w-[176px] h-[176px] rounded-full shadow-[0_0_22px_#cc113399,0_0_55px_#cc113344,inset_0_0_30px_rgba(0,0,0,0.6)] border-2 border-[#cc1133] absolute"/>
        <div className="w-[156px] h-[156px] rounded-full border border-[#cc1133]/30 shadow-[inset_0_0_14px_#cc113322] absolute"/>
        
        {/* Character image */}
        <div className="absolute overflow-hidden w-[160px] h-[160px] rounded-full bg-[#10040a]/90">
          <img src="/assets/kai-icon-anime-wink.png" alt="Kai Shi" className="w-full h-full object-cover object-top transition-transform duration-75"
            style={{
              filter: glitch
                ? `drop-shadow(0 0 12px ${R}) brightness(1.1) saturate(1.3)`
                : `drop-shadow(0 0 8px ${R}88) brightness(0.95) saturate(1.2)`,
              transform: glitch ? 'translateX(2px)' : 'none',
            }}
          />
        </div>
        
        {/* Pixel heart icon */}
        <motion.img src="/assets/icon-kai-love.png" alt="" className="absolute top-[12px] right-[18px] w-[30px] h-[30px] object-contain [image-rendering:pixelated] drop-shadow-[0_0_8px_#cc1133]"
          animate={{scale:[1,1.18,1],opacity:[0.85,1,0.85]}}
          transition={{duration:2,repeat:Infinity}}
        />
        
        {/* Bottom arc label tick marks */}
        {[-40,-20,0,20,40].map((deg,i)=>(
          <div key={i} style={{
            position:'absolute',top:'50%',left:'50%',
            width:'2px',height: i===2?'8px':'5px', background: i===2?R:`${R}55`,
            transform:`translate(-50%,-50%) rotate(${90+deg}deg) translateY(90px)`,
            boxShadow: i===2?`0 0 4px ${R}`:'none',
          }}/>
        ))}
      </div>

      {/* Name + title */}
      <div className="text-center px-[12px] mt-[4px]">
        <div className="font-pixel text-[22px] text-white leading-none flex items-center justify-center gap-[8px] tracking-[0.05em] transition-all"
          style={{
            textShadow: glitch
              ? `3px 0 #ff0044,-3px 0 #0088ff,0 0 24px ${R}`
              : `0 0 18px ${R}88,2px 2px 0 rgba(204,17,51,0.4)`,
          }}>
          <span className="text-[#cc1133] text-[14px]">✦</span> KAI SHI <span className="text-[#cc1133] text-[14px]">✦</span>
        </div>
        <div className="font-pixel text-[9px] tracking-[0.22em] mt-[10px] text-[#8a6878]">
          FRONTEND BUILDER <br></br> CONTENT CREATOR
        </div>
      </div>

      {/* Stats section */}
      <div className="p-[20px_14px_8px]">
        {/* LVL + EXP */}
        <div className="flex flex-col items-stretch gap-[18px] mb-[10px]">
          <motion.div className="self-center min-w-[64px] p-[6px_12px_5px] border border-[#cc1133]/85 bg-[linear-gradient(180deg,rgba(255,34,68,0.24),rgba(204,17,51,0.12)),rgba(16,4,10,0.96)] shadow-[0_0_0_1px_rgba(255,102,136,0.12)_inset,0_0_14px_rgba(204,17,51,0.3),0_0_22px_rgba(204,17,51,0.12)] relative flex flex-col items-center justify-center [clip-path:polygon(0_0,calc(100%-7px)_0,100%_7px,100%_100%,7px_100%,0_calc(100%-7px))]"
            initial={{opacity:0,scale:0.7}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:0.35}}>
            {/* Box pseudo corners */}
            <div className="absolute w-[8px] h-[8px] border-t border-l border-[#ff6688]/55 top-[3px] left-[3px] pointer-events-none" />
            <div className="absolute w-[8px] h-[8px] border-b border-r border-[#ff6688]/55 bottom-[3px] right-[3px] pointer-events-none" />

            <span className="font-pixel text-[7px]" style={{color:R}}>Lv.</span>
            <span className="font-pixel text-[20px] text-white" style={{textShadow:`0 0 12px ${R}`,lineHeight:1}}>21</span>
          </motion.div>
          <div className="flex-1 flex flex-col gap-[7px]">
            <div className="flex justify-between items-center px-[2px]">
              <span className="font-pixel text-[7px] text-[#7a6068]">EXP</span>
              <span className="font-pixel text-[7px]" style={{color:R3}}>12,340 / 16,000</span>
            </div>
            <SegBar value={77} color={R} segs={16} inView={inView} delay={0.4}/>
          </div>
        </div>

        {/* HP bar */}
        <div className="flex flex-col gap-[7px] mb-[6px]">
          <div className="flex justify-between items-center px-[2px]">
            <span className="font-pixel text-[7px] text-[#7a6068]">HP</span>
            <span className="font-pixel text-[7px] text-[#ff6688]">850 / 850</span>
          </div>
          <div className="w-full">
            <SegBar value={100} color={R} segs={14} inView={inView} delay={0.5}/>
          </div>
        </div>

        {/* CP bar */}
        <div className="flex flex-col gap-[7px] mb-[6px] pb-1">
          <div className="flex justify-between items-center px-[2px]">
            <span className="font-pixel text-[7px] text-[#7a6068]">CP</span>
            <span className="font-pixel text-[7px] text-[#22aaff]">640 / 640</span>
          </div>
          <div className="w-full">
            <SegBar value={100} color="#22aaff" segs={14} inView={inView} delay={0.58}/>
          </div>
        </div>

        {/* STATUS: ONLINE with Diogram */}
        <div className="border border-[#cc1133]/30 bg-[#cc1133]/10 p-[6px_10px] flex items-center gap-[8px] my-[15px] mb-[12px]">
          <span className="font-pixel text-[7px] text-[#7a6068]">STATUS:</span>
          <span className="font-pixel text-[7px] text-[#cc1133]/50 tracking-[0.1em]">●</span>
          <motion.span className="font-pixel text-[8px] text-[#22c55e]"
            animate={{opacity:[1,0.3,1]}} transition={{duration:2,repeat:Infinity}}>
            ONLINE
          </motion.span>
          <img src="/assets/kai-icon-diogram.png" alt="waveform" className="ml-auto h-[16px] drop-shadow-[0_0_4px_#cc1133] object-contain" />
        </div>

        {/* ─── Social Platforms ─── */}
        <div className="px-[14px] pb-[10px]">
          <div className="flex items-center gap-[8px] mb-[8px]">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#cc1133]/20 to-transparent"/>
            <span className="font-pixel text-[6px] text-[#4a3040] tracking-[0.14em] whitespace-nowrap">PLATFORMS</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#cc1133]/20 to-transparent"/>
          </div>
          <div className="flex flex-col gap-[5px]">
            {([
              {label:'YOUTUBE', color:R},
              {label:'TIKTOK',  color:R3},
              {label:'GITHUB',  color:'#9090b8'},
            ] as const).map((s,i)=>(
              <motion.div key={s.label} className="flex items-center gap-[8px] p-[5px_10px] border bg-[#0a0208]/80 cursor-default relative [clip-path:polygon(0_0,calc(100%-6px)_0,100%_6px,100%_100%,6px_100%,0_calc(100%-6px))] transition-all duration-200"
                initial={{opacity:0,x:-10}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.72+i*0.08}}
                whileHover={{scale:1.04, boxShadow:`0 0 12px ${s.color}44`}}
                style={{borderColor:`${s.color}33`, color:s.color}}
              >
                <motion.span style={{fontSize:'7px', color:s.color}}
                  animate={{opacity:[1,0.35,1]}} transition={{duration:1.8+i*0.5,repeat:Infinity}}>●</motion.span>
                <span className="font-pixel text-[7px] tracking-[0.1em] flex-1">{s.label}</span>
                <div className="text-[12px] leading-none font-mono" style={{color:`${s.color}66`}}>›</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Faction Row ─── */}
        <div className="px-[14px] pb-[14px] flex flex-col items-center gap-[6px]">
          <span className="font-pixel text-[6px] text-[#4a3040] tracking-[0.14em] whitespace-nowrap">FACTION</span>
          <div className="flex items-center gap-[8px] p-[6px_14px] border border-[#cc1133]/15 bg-[#cc1133]/5 w-full justify-center">
            <motion.span style={{color:R,fontSize:'7px'}} animate={{opacity:[0.6,1,0.6]}} transition={{duration:2.5,repeat:Infinity}}>◆</motion.span>
            <span className="font-pixel text-[8px] text-[#c0a8b4] tracking-[0.12em]">INDIE CREATORS</span>
            <motion.span style={{color:R,fontSize:'7px'}} animate={{opacity:[0.6,1,0.6]}} transition={{duration:2.5,repeat:Infinity,delay:1.25}}>◆</motion.span>
          </div>
        </div>

      </div>
    </Panel>
  );
}

function BiographyPanel({inView}:{inView:boolean}) {
  return (
    <Panel>
      <Corners c={R} s={9} />
      <PanelHeader icon="/assets/icon-kai-cat1.png" label="BIOGRAPHY"/>

      <div className="p-[18px_17px_14px]">
        {/* Main quote row */}
        <motion.div className="relative flex gap-[14px] my-[14px] min-h-[88px]"
          initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.2,duration:0.5}}
        >
          {/* Quote text side */}
          <div className="relative flex-1">
            <img src="/assets/kai-icon-kutip-atas.png" className="absolute top-[6px] -left-[4px] w-[30px] h-[30px] object-contain opacity-80 [image-rendering:pixelated] drop-shadow-[0_0_4px_#cc1133]" alt='"'/>
            <p className="font-display text-[20px] leading-[1.7] text-[#e8e0e3]/90 pl-[30px] pt-[8px]">
              A digital builder crafting immersive<br/>
              web experiences through code,<br/>
              creativity, and{' '}
              <span className="font-bold text-[#ff2244] animate-neon-flicker">anime-powered vibes.</span>
              <img src="/assets/kai-icon-kutip-bawah.png" className="ml-[6px] align-bottom inline-block relative -top-[2px] w-[26px] h-[26px] object-contain opacity-80 [image-rendering:pixelated] drop-shadow-[0_0_4px_#cc1133]" alt='"'/>
            </p>
          </div>

          {/* Floating mascot */}
          <div className="relative w-[110px] top-[10px] shrink-0">
            <motion.div className="w-full h-[114px] relative animate-float-y">
              <img src="/assets/icon-kai-cat1.png" alt="" className="w-full h-full object-cover object-top drop-shadow-[0_0_16px_#cc113388] brightness-90 rounded-[4px]" />
              <div className="absolute inset-0 rounded-[4px] shadow-[inset_0_0_20px_rgba(204,17,51,0.3),0_0_20px_#cc113344] pointer-events-none" />
              <Corners c={R} s={6}/>
            </motion.div>
            <div className="absolute -bottom-[4px] left-[10%] right-[10%] h-[6px] bg-[radial-gradient(ellipse,#cc113366,transparent_70%)] blur-[4px]"/>
          </div>
        </motion.div>

        {/* Code block quote card */}
        <motion.div className="border border-[#cc1133]/30 bg-[#cc1133]/10 p-[5px_8px] mt-[40px] mb-[14px] flex gap-[14px] items-center relative overflow-hidden"
          initial={{opacity:0,x:-10}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.38,duration:0.48}}
        >
          <motion.div className="absolute top-0 bottom-0 w-[40%] bg-[linear-gradient(90deg,transparent,#cc113311,transparent)] pointer-events-none"
            animate={{x:['-120%','120%']}} transition={{duration:3.5,repeat:Infinity,repeatDelay:4,ease:'easeInOut'}}
          />
          <div className="w-[70px] h-[70px] border border-[#cc1133]/40 bg-[#cc1133]/10 flex mx-[14px] items-center justify-center shadow-[0_0_14px_#cc113344] rotate-45 shrink-0">
            <img src="/assets/icon-kai-code.png" alt="code" width={20} height={20} className="-rotate-45" style={{filter:`drop-shadow(0 0 6px ${R})`}} />
          </div>
          <div className="flex-1 flex items-center gap-[12px] justify-between">
            <div className="flex-1 min-w-0">
              <div className="font-pixel text-[16px] mb-1.5" style={{color:R,letterSpacing:'0.1em'}}>
                CODE IS MY WEAPON
              </div>
              <div className="font-mono text-[14px]" style={{color:'rgba(232,224,227,0.7)',lineHeight:1.625}}>
                Creativity is my power.<br/>The web is my playground.
              </div>
            </div>
            <div className="ml-auto w-[100px] h-[100px] shrink-0 flex items-center justify-end">
              <img src="/assets/kai-icon-chibi.png" alt="code" width={28} height={28} style={{filter:`drop-shadow(0 0 6px ${R})`}} className="w-full h-full object-contain [image-rendering:pixelated]" />
            </div>
          </div>
        </motion.div>

        {/* Tag chips */}
        <motion.div className="flex flex-wrap gap-[12px] mt-[30px]"
          initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.5,duration:0.45}}
        >
          {TAGS.map((tag,i) => (
            <motion.div key={tag} className="flex items-center gap-[7px] border border-[#cc1133]/30 rounded-[10px_0_10px_0] bg-[#0a0208]/85 p-[7px] cursor-default w-fit shadow-[0_0_6px_#cc113322] relative overflow-hidden"
              whileHover={{scale:1.06,boxShadow:`0 0 18px ${R}66`}}
            >
              <img src={['/assets/icon-kai-code.png','/assets/icon-kai-mekanik.png','/assets/kai-icon-cat-cyber.png','/assets/icon-kai-target.png'][i]}
                alt="" className="w-[14px] h-[14px] object-contain [image-rendering:pixelated] drop-shadow-[0_0_4px_#cc113388]" />
              <span className="font-pixel text-[11px] tracking-[0.05em] text-[#c0a8b4]">{tag}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Current Mission Terminal ─── */}
        <motion.div className="mt-[30px] border border-[#cc1133]/30 bg-[#030106]/95 relative overflow-hidden"
          initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.65,duration:0.48}}
        >
          <div className="flex items-center gap-[10px] p-[10px_12px] border-b border-[#cc1133]/15 bg-[#cc1133]/5">
            <div className="flex gap-[5px] items-center">
              {[R,'#ffcc33','#22c55e'].map((c,i)=>(
                <div key={i} style={{width:8,height:8,borderRadius:'50%',background:c,opacity:0.75}}/>
              ))}
            </div>
            <span className="font-pixel text-[9px] text-[#5a4858] tracking-[0.06em] flex-1">current_build.exe</span>
            <motion.span className="font-pixel text-[7px] text-[#22c55e]"
              animate={{opacity:[1,0.25,1]}} transition={{duration:1.1,repeat:Infinity}}>● RUNNING</motion.span>
          </div>
          <div className="p-[10px_14px_12px] flex flex-col gap-[5px]">
            {([
              {prompt:'$', pre:'project : ', val:'kai-portfolio v2.0',       col:R2, fsz:'13px'},
              {prompt:'$', pre:'stack   : ', val:'react · tailwind · framer', col:'#88c4ff', fsz:'13px'},
              {prompt:'$', pre:'status  : ', val:'HYPERFOCUS ENGAGED ▌',    col:'#22c55e', fsz:'13px'},
            ]).map((ln,i)=>(
              <motion.div key={i} className="font-mono text-[12px] flex gap-[6px] items-baseline whitespace-nowrap"
                initial={{opacity:0,x:-12}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.76+i*0.14}}
              >
                <span className="text-[#cc1133] font-bold shrink-0">{ln.prompt}</span>
                <span style={{color:'#6a5868', fontSize:ln.fsz}}>{ln.pre}</span>
                <span style={{color:ln.col, fontSize:ln.fsz}}>{ln.val}</span>
              </motion.div>
            ))}
          </div>
          <motion.div className="absolute top-0 bottom-0 w-[45%] bg-[linear-gradient(90deg,transparent,#cc113308,transparent)] pointer-events-none"
            animate={{x:['-110%','110%']}} transition={{duration:4,repeat:Infinity,repeatDelay:6,ease:'easeInOut'}}
          />
        </motion.div>

        {/* ─── Activity Mini Metrics ─── */}
        <motion.div className="flex mt-[30px] border border-[#cc1133]/15 bg-[#080206]/70 overflow-hidden"
          initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.85}}
        >
          {([
            {label:'PROJECTS', val:'12', icon:'◈', fsz:'11px'},
            {label:'COMMITS',  val:'340', icon:'◉', fsz:'11px'},
            {label:'STREAK',   val:'28D', icon:'▲', fsz:'11px'},
          ]).map((m,i)=>(
            <div key={m.label} className="flex-1 flex flex-col items-center p-[8px_6px] gap-[10px] border-r border-[#cc1133]/10 relative last:border-r-0">
              <span className="font-pixel text-[10px]" style={{color:i===2?'#22c55e':R, fontSize:m.fsz}}>{m.icon}</span>
              <span className="font-pixel text-[16px] text-[#e8e0e3] leading-none tracking-[-0.01em]" style={{fontSize:m.fsz}}>{m.val}</span>
              <span className="font-pixel text-[6px] text-[#4a3040] tracking-[0.1em]" style={{fontSize:m.fsz}}>{m.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </Panel>
  );
}

function CoreStatsPanel({inView}:{inView:boolean}) {
  const [hov,setHov] = useState<number|null>(null);
  return (
    <Panel>
      <Corners c={R} s={9} />
      <PanelHeader icon="/assets/icon-kai-piala.png" label="CORE STATS"/>
      <div className="p-[20px_14px_14px] flex flex-col gap-[30px]">
        {CORE_STATS.map((s,i) => (
          <motion.div key={s.label}
            initial={{opacity:0,x:14}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.1+i*0.07,duration:0.4}}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
          >
            <div className="flex items-center gap-[10px] mb-[16px]">
              <div className="w-[27px] h-[27px] shrink-0 flex items-center justify-center rotate-45 transition-all duration-200" style={{
                border:`1px solid ${hov===i?R:DIM}`,
                background: hov===i?'rgba(204,17,51,0.18)':'rgba(10,2,8,0.8)',
                boxShadow: hov===i?`0 0 12px ${R}55`:'none',
              }}>
                <StatIcon type={s.icon} active={hov===i}/>
              </div>
              <span className="font-pixel text-[10px] flex-1 tracking-[0.05em] transition-colors duration-200" style={{color: hov===i?'#e8e0e3':'#a09098'}}>
                {s.label}
              </span>
              <motion.span className="font-pixel text-[10px] transition-colors duration-200"
                animate={hov===i?{textShadow:`0 0 10px ${R},0 0 20px ${R}44`}:{textShadow:'none'}}
                style={{color: hov===i?R2:R}}>
                {s.value}%
              </motion.span>
            </div>
            <div className="flex items-center gap-[4px]">
              <div style={{flex:1}}>
                <SegBar value={s.value} color={R} segs={16} inView={inView} delay={0.15+i*0.07} active={hov===i}/>
              </div>
              <motion.div
                animate={hov===i ?{boxShadow:`0 0 10px ${R},0 0 20px ${R}44`,background:R2,scale:1.2} :{boxShadow:`0 0 5px ${R}88`,background:R,scale:1}}
                transition={{duration:0.2}} className="w-[8px] h-[8px] rounded-full shrink-0"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Overall Power Block ─── */}
      <motion.div className="p-[30px_14px_14px] border-t border-[#cc1133]/15 mt-[30px]"
        initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.72}}
      >
        <div className="flex items-center justify-between mb-[6px]">
          <span className="font-pixel" style={{fontSize:'7px',color:'#4a3040',letterSpacing:'0.12em'}}>OVERALL POWER</span>
          <motion.div className="p-[3px_10px] bg-[#cc1133] [clip-path:polygon(0_0,calc(100%-5px)_0,100%_5px,100%_100%,5px_100%,0_calc(100%-5px))]"
            animate={{boxShadow:[`0 0 8px ${R}55`,`0 0 22px ${R}99`,`0 0 8px ${R}55`]}}
            transition={{duration:2.6,repeat:Infinity}}
          >
            <span className="font-pixel" style={{fontSize:'7px',color:'#fff',letterSpacing:'0.1em'}}>S-RANK</span>
          </motion.div>
        </div>
        <div className="flex items-baseline gap-[8px] mb-[8px]">
          <motion.span className="font-pixel text-[25px] text-[#cc1133] leading-none tracking-[-0.02em]"
            animate={{textShadow:[`0 0 12px ${R}66`,`0 0 26px ${R}cc`,`0 0 12px ${R}66`]}}
            transition={{duration:3.2,repeat:Infinity}}
          >87.0</motion.span>
          <div className="flex items-center gap-[3px]">
            <span style={{color:'#22c55e',fontSize:'12px',marginBottom:'5px'}}>▲</span>
            <span className="font-pixel" style={{fontSize:'7px',color:'#22c55e',letterSpacing:'0.05em'}}>+2.4%</span>
          </div>
          <div className="ml-auto flex items-center">
            <span className="font-pixel" style={{fontSize:'6px',color:'#4a3040'}}>AVG / 6 STATS</span>
          </div>
        </div>
        <SegBar value={87} color={R} segs={20} inView={inView} delay={0.82}/>
      </motion.div>

    </Panel>
  );
}

function StatIcon({type,active=false}:{type:string;active?:boolean}) {
  const c = active ? R2 : R;
  const f = `drop-shadow(0 0 ${active?4:2}px ${c}${active?'cc':'77'})`;
  const sz = 16;
  const rotMap: Record<string, string> = {
    code: 'rotate(-45deg)',
    puzzle: 'rotate(-45deg)',
    palette: 'rotate(-45deg)',
    lightning: 'rotate(-45deg)',
    brain: 'rotate(-45deg)',
    cycle: 'rotate(-45deg)',
  };
  const rot = rotMap[type] ?? 'rotate(0deg)';
  const p = (type === 'brain' || type === 'lightning' || type === 'cycle' || type === 'palette' || type === 'puzzle') ? 1 : 0;
  switch(type) {
    case 'code': return (
      <img src="/assets/icon-kai-code.png" alt="" width={sz} height={sz} style={{filter:f, transform:rot, padding: `${p}px`}} />
    );
    case 'puzzle': return (
      <img src="/assets/icon-kai-lego.png" alt="" width={sz} height={sz} style={{filter:f, transform:rot, padding: `${p}px`}} />
    );
    case 'palette': return (
      <img src="/assets/icon-kai-star.png" alt="" width={sz} height={sz} style={{filter:f, transform:rot, padding: `${p}px`}} />
    );
    case 'lightning': return (
      <img src="/assets/kai-icon-pen.png" alt="" width={sz} height={sz} style={{filter:f, transform:rot, padding: `${p}px`}} />
    );
    case 'brain': return (
      <img src="/assets/icon-kai-ring.png" alt="" width={sz} height={sz} style={{filter:f, transform:rot, padding: `${p}px`}} />
    );
    case 'cycle': return (
      <img src="/assets/icon-kai-re.png" alt="" width={sz} height={sz} style={{filter:f, transform:rot, padding: `${p}px`}} />
    );
    default: return null;
  }
}

function SkillTreePanel({inView}:{inView:boolean}) {
  const [hov,setHov] = useState<number|null>(null);

  const skills = [
    { label:'FRONTEND',   icon:<SkillCodeIcon/>,    locked:false, color:R,         id:0  },
    { label:'DESIGN',     icon:<SkillPenIcon/>,     locked:false, color:R,         id:1  },
    { label:'REACT',      icon:<SkillReactIcon/>,   locked:false, color:'#61dafb', id:2  },
    { label:'TAILWIND',   icon:<SkillWindIcon/>,    locked:false, color:'#38bdf8', id:3  },
    { label:'JAVASCRIPT', icon:<SkillJSIcon/>,      locked:false, color:'#f7df1e', id:4  },
    { label:'TYPESCRIPT', icon:<SkillTSIcon/>,      locked:false, color:'#3178c6', id:5  },
    { label:'NEXT.JS',    icon:<SkillNextIcon/>,    locked:false, color:'#e8e0e3', id:6  },
    { label:'NODE.JS',    icon:<SkillNodeIcon/>,    locked:false, color:'#68a063', id:7  },
    { label:'HTML5',      icon:<SkillHTMLIcon/>,    locked:false, color:'#e34f26', id:8  },
    { label:'GSAP',       icon:<SkillGSAPIcon/>,    locked:false, color:'#88ce02', id:9  },
    { label:'GIT',        icon:<SkillGitIcon/>,     locked:false, color:'#f05032', id:10 },
    { label:'???',        icon:null,                locked:true,  color:DIM,       id:11 },
    { label:'???',        icon:null,                locked:true,  color:DIM,       id:12 },
    { label:'???',        icon:null,                locked:true,  color:DIM,       id:13 },
  ];

  return (
    <Panel style={{display:'flex',flexDirection:'column'}}>
      <Corners c={R} s={9} />
      <PanelHeader icon="/assets/icon-kai-mekanik.png" label="SKILL TREE"/>

      <div className="p-[4px_14px_0] flex-1 overflow-y-auto overflow-x-hidden skill-tree-scroll">
        {/* ── ROW 1: FRONTEND ◄─── heart ───► DESIGN ── */}
        <div className="flex justify-center items-center gap-0 mb-0 relative">
          <SkillHex skill={skills[0]} hov={hov} setHov={setHov} inView={inView} delay={0.15}/>
          <div className="flex items-center flex-1 px-[4px] mb-[22px]">
            <span className="font-pixel text-[7px]" style={{color:`${R}88`}}>◄</span>
            <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,#cc113355,#cc113388,#cc113355)]"/>
            <motion.div className="w-[20px] h-[20px] shrink-0 mx-[4px] relative"
              animate={{ scale:[1,1.15,1]}}
              transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
            >
              <svg viewBox="0 0 24 24" fill={R} style={{filter:`drop-shadow(0 0 6px ${R})`}}>
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </motion.div>
            <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,#cc113355,#cc113388,#cc113355)]"/>
            <span className="font-pixel text-[7px]" style={{color:`${R}88`}}>►</span>
          </div>
          <SkillHex skill={skills[1]} hov={hov} setHov={setHov} inView={inView} delay={0.23}/>
        </div>

        {/* v connector 1→2 */}
        <div className="flex justify-between h-[14px] px-[26px]">
          <div className="w-[1px] h-full bg-[linear-gradient(to_bottom,#cc113355,#cc113322)]"/><div className="w-[1px] h-full bg-[linear-gradient(to_bottom,#cc113355,#cc113322)]"/><div className="w-[1px] h-full bg-[linear-gradient(to_bottom,#cc113355,#cc113322)]"/>
        </div>

        {/* ── ROW 2: REACT · TAILWIND · JS ── */}
        <div className="flex justify-between mb-0 relative">
          <div className="absolute top-[30px] left-[26px] right-[26px] h-[1px] pointer-events-none" style={{background:`linear-gradient(90deg,transparent,#cc113344,#cc113355,#cc113344,transparent)`}}/>
          {skills.slice(2,5).map((sk,i)=>(
            <SkillHex key={sk.id} skill={sk} hov={hov} setHov={setHov} inView={inView} delay={0.32+i*0.09}/>
          ))}
        </div>

        {/* v connector 2→3 */}
        <div className="flex justify-between h-[14px] px-[26px]">
          {[0,1,2].map(i=>(<div key={i} className="w-[1px] h-full bg-[linear-gradient(to_bottom,#cc113355,#cc113322)]"/>))}
        </div>

        {/* ── ROW 3: TYPESCRIPT · NEXT.JS · NODE.JS ── */}
        <div className="flex justify-between mb-0 relative">
          <div className="absolute top-[30px] left-[26px] right-[26px] h-[1px] pointer-events-none" style={{background:`linear-gradient(90deg,transparent,#3178c644,#3178c666,#3178c644,transparent)`}}/>
          {skills.slice(5,8).map((sk,i)=>(
            <SkillHex key={sk.id} skill={sk} hov={hov} setHov={setHov} inView={inView} delay={0.44+i*0.09}/>
          ))}
        </div>

        {/* v connector 3→4 */}
        <div className="flex justify-between h-[14px] px-[26px]">
          {[0,1,2].map(i=>(<div key={i} className="w-[1px] h-full bg-[linear-gradient(to_bottom,#cc113355,#cc113322)]"/>))}
        </div>

        {/* ── ROW 4: HTML5 · GSAP · GIT ── */}
        <div className="flex justify-between mb-0 relative">
          <div className="absolute top-[30px] left-[26px] right-[26px] h-[1px] pointer-events-none" style={{background:`linear-gradient(90deg,transparent,#e34f2644,#88ce0244,transparent)`}}/>
          {skills.slice(8,11).map((sk,i)=>(
            <SkillHex key={sk.id} skill={sk} hov={hov} setHov={setHov} inView={inView} delay={0.56+i*0.09}/>
          ))}
        </div>

        {/* v connector 4→5 (dim = locked) */}
        <div className="flex justify-between h-[14px] px-[26px]">
          {[0,1,2].map(i=>(<div key={i} className="w-[1px] h-full bg-[linear-gradient(to_bottom,#3d0f1a88,#3d0f1a22)]"/>))}
        </div>

        {/* ── ROW 5: Locked ── */}
        <div className="flex justify-between mb-[14px]">
          {skills.slice(11).map((sk,i)=>(
            <SkillHex key={sk.id} skill={sk} hov={hov} setHov={setHov} inView={inView} delay={0.68+i*0.07}/>
          ))}
        </div>
      </div>

      {/* ─── Skill Summary Bar ─── */}
      <div className="flex items-stretch mx-[14px] my-[10px] mt-[4px] border border-[#3d0f1a]/30 bg-[#080206]/80 overflow-hidden min-h-[58px]">
        <div className="flex-1 flex flex-col items-center justify-center p-[8px_4px] gap-[3px]">
          <span className="font-pixel text-[6px] text-[#4a3040] tracking-[0.1em] whitespace-nowrap">UNLOCKED</span>
          <div className="flex items-baseline gap-[2px]">
            <motion.span className="font-pixel text-[22px] text-[#cc1133] leading-none"
              animate={{textShadow:[`0 0 8px ${R}55`,`0 0 18px ${R}bb`,`0 0 8px ${R}55`]}}
              transition={{duration:2.8,repeat:Infinity}}
            >11</motion.span>
            <span className="font-pixel text-[9px] text-[#4a3040]">/14</span>
          </div>
        </div>
        <div className="w-[1px] bg-[linear-gradient(to_bottom,transparent,#cc113333,transparent)] shrink-0 self-stretch"/>
        <div className="flex-1 flex flex-col items-center justify-center p-[8px_4px] gap-[3px]" style={{flex:2,alignItems:'flex-start',paddingLeft:'10px'}}>
          <span className="font-pixel text-[6px] text-[#4a3040] tracking-[0.1em] whitespace-nowrap">NEXT UNLOCK</span>
          <span className="font-pixel" style={{fontSize:'8px',color:'#c0a8b4',letterSpacing:'0.08em',marginBottom:'5px'}}>VUE 3</span>
          <SegBar value={42} color={`${R}99`} segs={10} inView={inView} delay={0.62}/>
        </div>
        <div className="w-[1px] bg-[linear-gradient(to_bottom,transparent,#cc113333,transparent)] shrink-0 self-stretch"/>
        <div className="flex-1 flex flex-col items-center justify-center p-[8px_4px] gap-[3px]">
          <span className="font-pixel text-[6px] text-[#4a3040] tracking-[0.1em] whitespace-nowrap">MASTERY</span>
          <motion.span className="font-pixel text-[20px] text-[#ff8844] leading-none"
            animate={{textShadow:[`0 0 8px #ff884455`,`0 0 18px #ff884499`,`0 0 8px #ff884455`]}}
            transition={{duration:3.5,repeat:Infinity}}
          >A+</motion.span>
        </div>
      </div>

      {/* VIEW DETAILS button */}
      <div className="px-[14px] pb-[14px]">
        <motion.button className="w-full font-pixel text-[8px] tracking-[0.1em] py-[10px] border border-[#cc1133]/40 text-[#cc1133] bg-[#cc1133]/10 transition-all duration-200 relative overflow-hidden cursor-pointer"
          whileHover={{scale:1.02,boxShadow:`0 0 22px ${R}55`}} whileTap={{scale:0.97}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=`rgba(204,17,51,0.18)`;}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=`rgba(204,17,51,0.08)`;}}
        >
          VIEW DETAILS →
        </motion.button>
      </div>
    </Panel>
  );
}

function SkillHex({skill,hov,setHov,inView,delay}:{
  skill:{label:string;icon:React.ReactNode;locked:boolean;color:string;id:number};
  hov:number|null;setHov:(n:number|null)=>void;inView:boolean;delay:number;
}) {
  const isHov = hov===skill.id;
  const c = skill.locked ? DIM : skill.color;

  /* ─── per-hex random glitch ─── */
  const [glitch,    setGlitch   ] = useState(false);
  const [glitchDir, setGlitchDir] = useState(1);
  useEffect(()=>{
    if (skill.locked) return;
    const interval = setInterval(()=>{
      if (Math.random()>0.6){
        const dir = Math.random()>0.5?1:-1;
        setGlitchDir(dir);
        setGlitch(true);
        setTimeout(()=>setGlitch(false),55);
        setTimeout(()=>{setGlitchDir(-dir);setGlitch(true);setTimeout(()=>setGlitch(false),40);},110);
      }
    }, 2800+skill.id*650);
    return ()=>clearInterval(interval);
  },[skill.locked,skill.id]);

  return (
    <motion.div className="flex flex-col items-center gap-[5px]"
      initial={{opacity:0,scale:0.6}}
      animate={inView?{opacity:1,scale:1}:{}}
      transition={{delay,duration:0.38,type:'spring',stiffness:200}}
      onMouseEnter={()=>!skill.locked&&setHov(skill.id)}
      onMouseLeave={()=>setHov(null)}
      style={{cursor:skill.locked?'default':'pointer'}}
    >
      <motion.div className="w-[56px] h-[56px] relative flex items-center justify-center transition-colors duration-200 [clip-path:polygon(50%_0%,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)]"
        animate={{
          boxShadow: skill.locked ? 'none'
            : glitch ? `0 0 28px ${c}cc, 0 0 6px #ff0044 inset`
            : isHov  ? `0 0 24px ${c}99, 0 0 10px ${c}66`
            :          `0 0 10px ${c}44`,
          x: glitch ? glitchDir*2 : 0,
        }}
        transition={{duration: glitch?0.04:0.2}}
        style={{
          background: skill.locked?'rgba(8,2,6,0.6)':'rgba(14,4,10,0.95)',
          borderColor: skill.locked?`${DIM}44`:glitch?R2:isHov?c:`${c}55`,
        }}
      >
        {/* Glitch scan-slice overlay */}
        <AnimatePresence>
          {glitch && !skill.locked && (
            <motion.div key="gscan"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{
                position:'absolute',inset:0,zIndex:3,pointerEvents:'none',
                background:'linear-gradient(transparent 28%,rgba(0,136,255,0.18) 28%,rgba(0,136,255,0.18) 46%,transparent 46%)',
              }}
            />
          )}
        </AnimatePresence>

        {skill.locked ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="4" y="9" width="12" height="9" rx="1" stroke={`${DIM}99`} strokeWidth="1.5"/>
            <path d="M7 9V6a3 3 0 016 0v3" stroke={`${DIM}99`} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <motion.div
            animate={{
              scale:  isHov?1.15:1,
              opacity:isHov?1:0.9,
              filter: glitch
                ? `drop-shadow(2px 0 #ff0044) drop-shadow(-2px 0 #0088ff)`
                : isHov
                  ? `drop-shadow(0 0 8px ${c})`
                  : 'none',
            }}
            transition={{duration:glitch?0.04:0.2}}
          >
            {skill.icon}
          </motion.div>
        )}
      </motion.div>

      <span className="font-pixel text-[6px] tracking-[0.08em] text-center transition-colors duration-200" style={{
        color:       skill.locked?'#2a1020':glitch?R2:isHov?c:'#887078',
        textShadow:  glitch&&!skill.locked?`0 0 10px ${R}`:'none',
      }}>
        {skill.label}
      </span>
    </motion.div>
  );
}

function SkillCodeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M8 8L4 12L8 16" stroke={R} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8L20 12L16 16" stroke={R} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 6L11 18" stroke={R2} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function SkillPenIcon() {
  return <img src="/assets/kai-icon-pen.png" alt="pen" style={{width:'20px',height:'20px',filter:`drop-shadow(0 0 6px ${R})`}}/>;
}
function SkillReactIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="2.2" fill="#61dafb"/>
    </svg>
  );
}
function SkillWindIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M5 8a4 4 0 018 0" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 12h14a3 3 0 000-6h-1" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 16h10a3 3 0 010 6h-1" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function SkillJSIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="2" fill="#f7df1e" opacity="0.15"/>
      <rect width="24" height="24" rx="2" stroke="#f7df1e" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M8 16c0 1.5 1 2.5 3 2.5s3-1 3-2.5V9h-2v7" stroke="#f7df1e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SkillTSIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="2" fill="#3178c6" opacity="0.15"/>
      <rect width="24" height="24" rx="2" stroke="#3178c6" strokeWidth="1" fill="none" opacity="0.5"/>
      {/* T */}
      <path d="M4 8h6M7 8v8" stroke="#3178c6" strokeWidth="1.8" strokeLinecap="round"/>
      {/* S */}
      <path d="M13 9.5c.5-1 1.2-1.5 2.5-1.5s2.5.8 2.5 2-.8 1.8-2.5 2-2.5.8-2.5 2 1 2 2.5 2 2-.5 2.5-1.5" stroke="#3178c6" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function SkillNextIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#e8e0e3" strokeWidth="1.2" opacity="0.35"/>
      {/* N shape */}
      <path d="M8 16V8l8 8V8" stroke="#e8e0e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
    </svg>
  );
}
function SkillNodeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      {/* Hexagon */}
      <path d="M12 3L20.5 7.5v9L12 21 3.5 16.5v-9L12 3z" stroke="#68a063" strokeWidth="1.4" opacity="0.5"/>
      {/* N */}
      <path d="M9 16V8l6 8V8" stroke="#68a063" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
    </svg>
  );
}
function SkillHTMLIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      {/* Shield/document */}
      <path d="M4 4l1.4 15L12 21l6.6-2L20 4H4z" stroke="#e34f26" strokeWidth="1.4" opacity="0.45"/>
      {/* < > slashes */}
      <path d="M8 10l-2.5 2L8 14" stroke="#e34f26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 10l2.5 2L16 14" stroke="#e34f26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 9l-2 6" stroke="#e34f26" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}
function SkillGSAPIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      {/* Animated wave / timeline */}
      <path d="M2 12h3l2-6 3 12 2-7 2 4 2-3h6" stroke="#88ce02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* playhead */}
      <line x1="12" y1="4" x2="12" y2="20" stroke="#88ce02" strokeWidth="1" opacity="0.3" strokeDasharray="2 2"/>
    </svg>
  );
}
function SkillGitIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      {/* Main branch vertical */}
      <line x1="8" y1="4" x2="8" y2="20" stroke="#f05032" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Commit nodes */}
      <circle cx="8" cy="6"  r="2.2" fill="#f05032" opacity="0.9"/>
      <circle cx="8" cy="18" r="2.2" fill="#f05032" opacity="0.9"/>
      {/* Branch off */}
      <path d="M8 10 Q8 14 16 14" stroke="#f05032" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="16" cy="14" r="2" fill="#f05032" opacity="0.65"/>
    </svg>
  );
}

function AboutRailStack({inView}: {onNavigate:(id:SectionId)=>void;inView:boolean}) {
  const broadcastNotes = [
    { label: 'MODE', value: 'ACTIVE', color: '#22c55e' },
    { label: 'SIGNAL', value: 'STABLE', color: R3 },
    { label: 'FOCUS', value: 'NIGHT BUILD', color: '#88c4ff' },
  ];

  return (
    <div className="flex flex-col gap-[14px] h-full">
      <Panel className="min-h-0 flex-1">
        <Corners c={R} s={9} />
        <PanelHeader icon="/assets/icon-kai-diamond.png" label="BROADCAST LOG" />
        <div className="flex-1 flex flex-col gap-[12px] p-[12px_14px_14px]">
          <div className="flex gap-[12px] items-stretch">
            <div className="relative w-[100px] shrink-0 overflow-hidden border border-[#cc1133]/30 bg-[#0a0208]/90">
              <img src="/assets/KaiShi-Main.png" alt="Kai Shi" className="w-full h-full min-h-[108px] object-cover object-top block" />
              <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(204,17,51,0.22),0_0_18px_rgba(204,17,51,0.12)] pointer-events-none" />
            </div>
            <div className="min-w-0 flex-1 flex flex-col justify-center gap-[8px]">
              <div className="font-pixel text-[7px] tracking-[0.14em] text-[#cc1133]">CHANNEL NOTES</div>
              <p className="m-0 text-[10px] leading-[1.65] text-[#c7b6bd]">
                Built for late-night pushes, polished motion, and a clean red-signal UI that keeps the archive readable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[8px]">
            {broadcastNotes.map((note, i) => (
              <motion.div
                key={note.label}
                className="flex items-center justify-between gap-[12px] border border-[#3d0f1a]/75 bg-[#0a0208]/80 p-[8px_10px]"
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.22 + i * 0.06 }}
                style={{ borderColor: `${note.color}33` }}
              >
                <span className="text-[6px] tracking-[0.12em] text-[#8a6878]">{note.label}</span>
                <span className="font-pixel text-[8px] tracking-[0.1em]" style={{ color: note.color }}>
                  {note.value}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-[10px] border border-[#cc1133]/20 bg-[#cc1133]/5 p-[8px_10px]">
            <img src="/assets/kai-icon-diogram.png" alt="" className="w-[54px] h-[18px] object-contain [image-rendering:pixelated] drop-shadow-[0_0_6px_rgba(204,17,51,0.65)] shrink-0" />
            <span className="font-pixel text-[7px] tracking-[0.12em] text-[#c0a8b4]">LIVE ARCHIVE FEED</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function GallerySection() {
  const ref = useRef(null);
  const [filter,   setFilter  ] = useState<GFilter>('ALL');
  const [selected, setSelected] = useState(0);
  const [time,     setTime    ] = useState(new Date());

  const items = filter==='ALL' ? GALLERY : GALLERY.filter(g=>g.tag===filter);
  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(t);},[]);

  const prev = ()=>setSelected(s=>(s-1+items.length)%items.length);
  const next = ()=>setSelected(s=>(s+1)%items.length);
  const pad  = (n:number)=>String(n).padStart(2,'0');

  return (
    <div ref={ref}>
      <Panel className="p-0 overflow-visible relative w-full min-[1100px]:w-auto ml-0 justify-center flex-1">
        <Corners c={R} s={9} />
        {/* Outer nav arrows */}
        <GalleryArrow dir="left"  onClick={prev} className="-left-[24px]"/>
        <GalleryArrow dir="right" onClick={next} className="-right-[24px]"/>

        {/* Header row */}
        <div className="flex items-center gap-[10px] p-[10px_16px] border-b border-[#3d0f1a]/70 flex-wrap row-gap-[6px]">
          <div className="flex items-center gap-[8px] shrink-0">
            <img src="/assets/icon-kai-cat1.png" alt="" className="w-[16px] h-[16px] object-contain [image-rendering:pixelated] drop-shadow-[0_0_5px_#cc1133]"/>
            <span className="font-pixel text-[10px] tracking-widest" style={{color:R}}>DIGITAL LOGS</span>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-[6px] items-center">
            {GALLERY_FILTERS.map(f=>(
              <motion.button key={f} onClick={() => {
                setFilter(f);
                setSelected(0);
              }}
                whileHover={{scale:1.06}} whileTap={{scale:0.94}}
                className="font-pixel text-[7px] tracking-[0.05em] p-[5px_12px] transition-all duration-150 cursor-pointer"
                style={{
                  border:`1px solid ${filter===f?R:'rgba(61,15,26,0.6)'}`,
                  background: filter===f?R:'rgba(8,2,6,0.8)',
                  color: filter===f?'#fff':'#7a6068',
                  boxShadow: filter===f?`0 0 12px ${R}66`:'none',
                }}
              >{f}</motion.button>
            ))}
          </div>

          {/* Right: sync text + live clock */}
          <div className="ml-auto flex items-center gap-[10px]">
            <motion.span className="font-pixel text-[7px]" style={{color:'#3a2030'}}
              animate={{opacity:[0.4,0.9,0.4]}} transition={{duration:3,repeat:Infinity}}>
              SWITCH LOG • PROFILE DATA SYNCED
            </motion.span>
            <span className="font-pixel text-[8px] tabular-nums text-[#e8e0e3] bg-[#cc1133]/10 border border-[#cc1133]/30 p-[3px_8px]">
              {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
            </span>
          </div>
        </div>

        {/* Cards strip */}
        <div className="p-[14px_16px_0] overflow-hidden">
          <div className="flex gap-[10px] items-stretch min-h-[240px]">
            <AnimatePresence mode="popLayout">
              {items.map((item,i)=>{
                const isSel = i===selected;
                return (
                  <motion.div key={`${filter}-${item.id}`} className="relative overflow-hidden cursor-pointer min-w-0 shrink-0 transition-all duration-300"
                    layout onClick={()=>setSelected(i)}
                    initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1,flex:isSel?2.8:1}} exit={{opacity:0,scale:0.88}}
                    transition={{duration:0.35,ease:[0.16,1,0.3,1]}}
                    style={{
                      border: isSel?`1.5px solid ${R}`:`1px solid rgba(61,15,26,0.5)`,
                      boxShadow: isSel ?`0 0 28px ${R}77,0 0 60px ${R}33,inset 0 0 20px rgba(0,0,0,0.4)` :'0 0 3px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Background image */}
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover absolute inset-0 transition-all duration-300"
                      style={{ filter: isSel?'brightness(0.75) saturate(1.2)':'brightness(0.45) saturate(0.65)' }}
                    />
                    {isSel && <div className="absolute inset-0 bg-[#cc1133]/10 pointer-events-none"/>}
                    <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(to_top,rgba(4,1,10,0.98)_0%,rgba(4,1,10,0.65)_45%,transparent_85%)] pointer-events-none h-full"/>

                    {/* SELECTED badge */}
                    {isSel && (
                      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#cc1133] p-[4px_18px] [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))] shadow-[0_0_18px_#cc1133,0_2px_8px_rgba(204,17,51,0.4)] z-10" initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}}>
                        <span className="font-pixel text-[7px] text-white tracking-[0.1em]">SELECTED</span>
                      </motion.div>
                    )}

                    {/* Card labels */}
                    <div className="absolute bottom-0 left-0 right-0 p-[12px_12px] z-[4]">
                      {isSel ? (
                        <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
                          <div className="font-pixel text-[12px] text-white" style={{textShadow:`0 0 10px ${R}`,letterSpacing:'0.05em'}}>
                            {item.title}
                          </div>
                          <div className="font-pixel text-[7px] mt-0.5" style={{color:R}}>{item.sub}</div>
                        </motion.div>
                      ) : (
                        <div>
                          <div className="font-pixel text-[7px] text-white" style={{opacity:0.85,letterSpacing:'0.04em'}}>
                            {item.title}
                          </div>
                          <div className="font-pixel text-[6px] mt-0.5" style={{color:R,opacity:0.9}}>
                            {item.sub}
                          </div>
                        </div>
                      )}
                    </div>

                    {isSel && <Corners c={R} s={7}/>}
                    {!isSel && (
                      <motion.div whileHover={{background:`rgba(204,17,51,0.12)`}} transition={{duration:0.2}}
                        style={{position:'absolute',inset:0,pointerEvents:'none',background:'transparent'}}/>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Diamond dot row */}
        <div className="flex justify-center items-center gap-[12px] p-[12px_16px_14px]">
          {items.map((_,i)=>(
            <button key={i} onClick={()=>setSelected(i)} className="w-[20px] h-[20px] flex items-center justify-center bg-transparent border-none cursor-pointer p-0">
              <motion.div className="border-[1.5px] border-[#cc1133]/30 block"
                animate={{
                  width:  i===selected?'12px':'8px', height: i===selected?'12px':'8px',
                  background: i===selected?R:'transparent', borderColor: i===selected?R:`${R}44`,
                  rotate:45, boxShadow: i===selected?`0 0 12px ${R},0 0 24px ${R}44`:'none',
                }}
                transition={{duration:0.2}}
              />
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function NavDotsBar({onNavigate}:{onNavigate:(id:SectionId)=>void}) {
  const sections: SectionId[] = ['hero','about','skills','projects','contact'];
  const labels: Record<SectionId,string> = {hero:'INTRO',about:'PROFILE',skills:'INVENTOR',projects:'QUEST BOARD',contact:'PORTAL'};
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.78, duration: 0.5 }}
      className="flex items-center justify-center gap-4 pb-[30px] mt-[15px]"
    >
      <NavBtn label="PREV" icon="◀" onClick={() => onNavigate('hero')} side="left" />

      <div className="flex items-center gap-2.5">
        {sections.map((s) => {
          const active = s === 'about';
          return (
            <button
              key={s}
              onClick={() => onNavigate(s)}
              title={labels[s]}
              className="group relative flex items-center justify-center"
              style={{ width: '22px', height: '22px' }}
            >
              <motion.span
                className="block border"
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
              <span
                className="absolute -top-7 left-1/2 -translate-x-1/2 font-pixel whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ fontSize: '6px', color: '#cc1133', textShadow: '0 0 8px #cc1133' }}
              >
                {labels[s]}
              </span>
            </button>
          );
        })}
      </div>

      <NavBtn label="NEXT" icon="▶" onClick={() => onNavigate('skills')} side="right" />
    </motion.div>
  );
}

function NavBtn({label,icon,onClick,side}:{label:string;icon:string;onClick:()=>void;side:'left'|'right'}) {
  const clip = side==='left'
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
      onMouseEnter={(e)=>{const el=e.currentTarget as HTMLElement;el.style.color='#cc1133';el.style.borderColor='#cc1133';el.style.boxShadow='0 0 12px rgba(204,17,51,0.3)';}}
      onMouseLeave={(e)=>{const el=e.currentTarget as HTMLElement;el.style.color='#7a6068';el.style.borderColor='rgba(61,15,26,0.9)';el.style.boxShadow='none';}}
    >
      {side==='left' && <span style={{fontSize:'13px'}}>{icon}</span>}
      {label}
      {side==='right' && <span style={{fontSize:'13px'}}>{icon}</span>}
    </motion.button>
  );
}

function Panel({children,style={},className=''}:{children:React.ReactNode;style?:React.CSSProperties;className?:string}) {
  return (
    <div className={`relative border border-[#3d0f1a]/85 bg-[#070205]/92 shadow-[0_0_0_1px_rgba(204,17,51,0.05),0_0_24px_rgba(204,17,51,0.08),inset_0_0_28px_rgba(0,0,0,0.55)] backdrop-blur-[6px] h-auto flex flex-col ${className}`} style={style}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#cc113344,transparent)] pointer-events-none"/>
      {children}
    </div>
  );
}

function PanelHeader({icon,label}:{icon:string;label:string}) {
  return (
    <div className="flex items-center gap-[8px] p-[10px_14px_8px] border-b border-[#3d0f1a]/60 mb-[2px]">
      <img src={icon} alt="" className="w-[16px] h-[16px] object-contain [image-rendering:pixelated] drop-shadow-[0_0_5px_#cc1133]"/>
      <span className="font-pixel text-[9px] tracking-widest text-[#cc1133]">{label}</span>
      <motion.span className="font-pixel text-[7px] ml-0.5 text-[#cc1133]/55"
        animate={{opacity:[0.3,0.8,0.3]}} transition={{duration:2.5,repeat:Infinity}}>✕</motion.span>
      <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,#cc113333,transparent)] ml-[4px]"/>
      <div className="flex gap-[3px]">
        {[0.4,0.7,1].map((o,i)=>(
          <div key={i} className="w-[4px] h-[4px] rounded-full bg-[#cc1133]" style={{opacity:o,boxShadow:'0 0 4px #cc1133'}}/>
        ))}
      </div>
    </div>
  );
}

function SegBar({value,color,segs=18,inView,delay=0,active=false}:{
  value:number;color:string;segs?:number;inView?:boolean;delay?:number;active?:boolean;
}) {
  const filled = Math.round((value/100)*segs);
  return (
    <div className="flex gap-[2px] w-full">
      {Array.from({length:segs}).map((_,i)=>(
        <motion.div key={i} className="flex-1 h-[7px] transition-shadow duration-150"
          initial={{opacity:0,scaleY:0.3}}
          animate={inView!==undefined
            ?(inView&&i<filled?{opacity:1,scaleY:1}:{opacity:i<filled?0.15:0.07,scaleY:1})
            :(i<filled?{opacity:1,scaleY:1}:{opacity:0.1,scaleY:1})}
          transition={{delay:delay+i*0.018,duration:0.22}}
          style={{
            background:i<filled?color:`${color}18`,
            boxShadow:i<filled?`0 0 ${active?8:4}px ${color}${active?'dd':'88'}`:'none',
          }}
        />
      ))}
    </div>
  );
}

function GalleryArrow({dir,onClick,className=''}:{dir:'left'|'right';onClick:()=>void;className?:string}) {
  return (
    <motion.button onClick={onClick} whileHover={{scale:1.14,boxShadow:`0 0 20px ${R}77`}} whileTap={{scale:0.9}}
      className={`font-pixel absolute top-1/2 -translate-y-1/2 z-20 w-[36px] h-[36px] flex items-center justify-center border-[1.5px] border-[#cc1133]/40 text-[#cc1133] bg-[#060208]/95 text-[12px] cursor-pointer [clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%,0_4px)] shadow-[0_0_10px_#cc113333] ${className}`}>
      {dir==='left'?'◀':'▶'}
    </motion.button>
  );
}

function Corners({c=R,s=9}:{c?:string;s?:number}) {
  const base:React.CSSProperties = {position:'absolute',width:s,height:s,pointerEvents:'none'};
  return (
    <>
      <div style={{...base,top:0,left:0,borderTop:`1.5px solid ${c}`,borderLeft:`1.5px solid ${c}`}}/>
      <div style={{...base,top:0,right:0,borderTop:`1.5px solid ${c}`,borderRight:`1.5px solid ${c}`}}/>
      <div style={{...base,bottom:0,left:0,borderBottom:`1.5px solid ${c}`,borderLeft:`1.5px solid ${c}`}}/>
      <div style={{...base,bottom:0,right:0,borderBottom:`1.5px solid ${c}`,borderRight:`1.5px solid ${c}`}}/>
    </>
  );
}