import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { SectionId } from '../../App';
import '../../style/about.css';

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

/* ══════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════ */
export function About({ onNavigate }: AboutProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="about-root">
      <BG />
      <OuterFrame />

      <div className="about-content-wrapper">
        {/* ── TOP FOUR PANELS ── */}
        <motion.div
          initial={{opacity:0,y:16}}
          animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.55,delay:0.05}}
          className="about-top-grid"
        >
          <ProfileCard inView={inView}/>
          <BiographyPanel inView={inView}/>
          <CoreStatsPanel inView={inView}/>
          <SkillTreePanel inView={inView}/>
        </motion.div>

        {/* ── DIGITAL LOGS / GALLERY ── */}
        <motion.div
          initial={{opacity:0,y:20}}
          animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.55,delay:0.2}}
        >
          <GallerySection/>
        </motion.div>

        <NavDotsBar onNavigate={onNavigate}/>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   BACKGROUND
══════════════════════════════════════════════════ */
function BG() {
  return (
    <div className="bg-root">
      <div className="bg-layer-1"/>
      <div className="bg-layer-2"/>
      <div className="bg-layer-3"/>
      <div className="bg-glow-top"/>
      <div className="bg-glow-bottom"/>
      <div className="bg-scan-h"/>
      {[18,38,62,82].map((p,i) => (
        <motion.div key={i} className="bg-vert-line"
          animate={{opacity:[0.02,0.07,0.02]}}
          transition={{duration:4+i,repeat:Infinity,delay:i*1.4}}
          style={{background:`linear-gradient(to bottom,transparent,${R},transparent)`,left:`${p}%`}}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OUTER FRAME
══════════════════════════════════════════════════ */
function OuterFrame() {
  return (
    <div className="outer-frame-root">
      {['pos-top','pos-bottom'].map((c,i) => (
        <div key={i} className={`outer-edge-h ${c}`}/>
      ))}
      {['pos-left','pos-right'].map((c,i) => (
        <div key={i} className={`outer-edge-v ${c}`}/>
      ))}
      {([
        ['pos-top pos-left',    `M2 44L2 2L44 2`,   0, 0 ],
        ['pos-top pos-right',   `M6 2L50 2L50 44`,  42,0 ],
        ['pos-bottom pos-left', `M2 6L2 50L44 50`,  0, 42],
        ['pos-bottom pos-right',`M6 50L50 50L50 6`, 42,42],
      ] as [string,string,number,number][]).map(([pos,d,sx,sy],i)=>(
        <svg key={i} className={`outer-svg-corner ${pos}`} width="52" height="52" viewBox="0 0 52 52" fill="none" style={{filter:`drop-shadow(0 0 5px ${R})`}}>
          <path d={d} stroke={R} strokeWidth="2.5" />
          <rect x={sx} y={sy} width="10" height="10" fill={R} opacity="0.95" style={{filter:`drop-shadow(0 0 4px ${R})`}}/>
        </svg>
      ))}
      {[20,40,60,80].map(p=><div key={`t${p}`} className="outer-tick-h pos-top" style={{left:`${p}%`}}/>)}
      {[20,40,60,80].map(p=><div key={`b${p}`} className="outer-tick-h pos-bottom" style={{left:`${p}%`}}/>)}
      <div className="outer-sweep"/>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROFILE CARD
══════════════════════════════════════════════════ */
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
    <Panel className="profile-panel-inner">
      <Corners c={R} s={9} />
      {/* Header label */}
      <div className="profile-header">
        <img src="/assets/icon-kai-cat1.png" alt="" className="profile-cat-icon"/>
        <span className="font-pixel profile-header-title">/ USER PROFILE</span>
        <div className="profile-header-bars">
          {[1,0.6,0.4].map((o,i)=>(
            <motion.div key={i} className="header-bar" style={{opacity:o}}
              animate={{opacity:[o,o*0.2,o]}} transition={{duration:1.2,repeat:Infinity,delay:i*0.2}}/>
          ))}
        </div>
      </div>

      {/* Character image in glowing circular frame */}
      <div className="avatar-wrapper">
        <motion.div animate={{rotate:360}} transition={{duration:22,repeat:Infinity,ease:'linear'}} className="avatar-ring-outer"/>
        <div className="avatar-tech-arcs">
          {[0,60,120,180,240,300].map((deg,i)=>(
            <div key={i} style={{
              position:'absolute',top:'50%',left:'50%', width:'6px',height:'3px',
              background: i%2===0 ? R : `${R}55`,
              transform:`translate(-50%,-50%) rotate(${deg}deg) translateX(104px)`,
              boxShadow: i%2===0 ? `0 0 6px ${R}` : 'none',
            }}/>
          ))}
        </div>
        <motion.div animate={{rotate:-360}} transition={{duration:35,repeat:Infinity,ease:'linear'}} className="avatar-ring-counter"/>
        <div className="avatar-ring-glow"/>
        <div className="avatar-ring-inner"/>
        
        {/* Character image (New Icon Applied) */}
        <div className="avatar-image-container">
          <img src="/assets/kai-icon-anime-wink.png" alt="Kai Shi" className="profile-avatar-img"
            style={{
              filter: glitch
                ? `drop-shadow(0 0 12px ${R}) brightness(1.1) saturate(1.3)`
                : `drop-shadow(0 0 8px ${R}88) brightness(0.95) saturate(1.2)`,
              transform: glitch ? 'translateX(2px)' : 'none',
            }}
          />
        </div>
        
        {/* Pixel heart icon (New Icon Applied) */}
        <motion.img src="/assets/icon-kai-love.png" alt="" className="profile-heart-icon"
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
      <div className="profile-name-section">
        <div className="font-pixel profile-name"
          style={{
            textShadow: glitch
              ? `3px 0 #ff0044,-3px 0 #0088ff,0 0 24px ${R}`
              : `0 0 18px ${R}88,2px 2px 0 rgba(204,17,51,0.4)`,
          }}>
          <span style={{color:R,fontSize:'14px'}}>✦</span> KAI SHI <span style={{color:R,fontSize:'14px'}}>✦</span>
        </div>
        <div className="font-pixel profile-title">
          FRONTEND BUILDER · CONTENT CREATOR
        </div>
      </div>

      {/* Stats section */}
      <div className="stats-container">
        {/* LVL + EXP */}
        <div className="lvl-exp-row">
          <motion.div className="lvl-box"
            initial={{opacity:0,scale:0.7}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:0.35}}>
            <span className="font-pixel text-[7px]" style={{color:R}}>Lv.</span>
            <span className="font-pixel text-[20px] text-white" style={{textShadow:`0 0 12px ${R}`,lineHeight:1}}>21</span>
          </motion.div>
          <div style={{flex:1}}>
            <div className="flex justify-between mb-1">
              <span className="font-pixel text-[7px]" style={{color:'#7a6068'}}>EXP</span>
              <span className="font-pixel text-[7px]" style={{color:R3}}>12,340 / 16,000</span>
            </div>
            <SegBar value={77} color={R} segs={16} inView={inView} delay={0.4}/>
          </div>
        </div>

        {/* HP bar */}
        <div className="hp-cp-row">
          <span className="font-pixel hp-cp-label">HP</span>
          <div style={{flex:1}}><SegBar value={100} color={R} segs={14} inView={inView} delay={0.5}/></div>
          <span className="font-pixel text-[7px]" style={{color:R}}>850 / 850</span>
        </div>

        {/* CP bar */}
        <div className="hp-cp-row mb-3">
          <span className="font-pixel hp-cp-label">CP</span>
          <div style={{flex:1}}><SegBar value={100} color="#22aaff" segs={14} inView={inView} delay={0.58}/></div>
          <span className="font-pixel text-[7px]" style={{color:'#22aaff'}}>640 / 640</span>
        </div>

        {/* STATUS: ONLINE with Diogram */}
        <div className="status-online-box">
          <span className="font-pixel status-label">STATUS:</span>
          <span className="font-pixel status-dot">●</span>
          <motion.span className="font-pixel status-text"
            animate={{opacity:[1,0.3,1]}} transition={{duration:2,repeat:Infinity}}>
            ONLINE
          </motion.span>
          <img src="/assets/kai-icon-diogram.png" alt="waveform" className="status-diogram" />
        </div>
      </div>
    </Panel>
  );
}

/* ══════════════════════════════════════════════════
   BIOGRAPHY PANEL
══════════════════════════════════════════════════ */
function BiographyPanel({inView}:{inView:boolean}) {
  return (
    <Panel>
      <Corners c={R} s={9} />
      <PanelHeader icon="/assets/icon-kai-cat1.png" label="BIOGRAPHY"/>

      <div className="bio-content">
        {/* Main quote row */}
        <motion.div className="bio-quote-row"
          initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.2,duration:0.5}}
        >
          {/* Quote text side */}
          <div className="bio-text-side">
            <img src="/assets/kai-icon-kutip-atas.png" className="quote-icon quote-start" alt='"'/>
            <p className="font-display bio-text">
              A digital builder crafting immersive<br/>
              web experiences through code,<br/>
              creativity, and{' '}
              <span className="neon-flicker" style={{color:R2,fontWeight:'bold'}}>anime-powered vibes.</span>
              <img src="/assets/kai-icon-kutip-bawah.png" className="quote-icon quote-end" alt='"'/>
            </p>
          </div>

          {/* Floating mascot (New Icon Applied) */}
          <div className="bio-mascot-wrapper">
            <motion.div className="float-y bio-mascot-inner">
              <img src="/assets/icon-kai-cat1.png" alt="" className="bio-mascot-img" />
              <div className="bio-mascot-shadow" />
              <Corners c={R} s={6}/>
            </motion.div>
            <div className="bio-mascot-base"/>
          </div>
        </motion.div>

        {/* Code block quote card */}
        <motion.div className="code-quote-card"
          initial={{opacity:0,x:-10}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.38,duration:0.48}}
        >
          <motion.div className="code-quote-sweep"
            animate={{x:['-120%','120%']}} transition={{duration:3.5,repeat:Infinity,repeatDelay:4,ease:'easeInOut'}}
          />
          <div className="code-quote-icon-box">
            <img src="/assets/icon-kai-code.png" alt="code" width={20} height={20} style={{filter:`drop-shadow(0 0 6px ${R})`}} />
          </div>
          <div>
            <div className="font-pixel text-[10px] mb-1.5" style={{color:R,letterSpacing:'0.1em'}}>
              CODE IS MY WEAPON
            </div>
            <div className="font-mono text-[11px]" style={{color:'rgba(232,224,227,0.7)',lineHeight:1.625}}>
              Creativity is my power.<br/>The web is my playground.
            </div>
            <div className="side-img" style={{filter:`drop-shadow(0 0 6px ${R})`}}>
              <img src="/assets/kai-icon-chibi.png" alt="code" width={32} height={32} style={{filter:`drop-shadow(0 0 6px ${R})`}} />
            </div>
          </div>
        </motion.div>

        {/* Tag chips */}
        <motion.div className="tags-container"
          initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.5,duration:0.45}}
        >
          {TAGS.map((tag,i) => (
            <motion.div key={tag} className="tag-chip"
              whileHover={{scale:1.06,boxShadow:`0 0 18px ${R}66`}}
            >
              <img src={['/assets/icon-kai-code.png','/assets/icon-kai-mekanik.png','/assets/kai-icon-cat-cyber.png','/assets/icon-kai-target.png'][i]}
                alt="" className="tag-icon" />
              <span className="font-pixel tag-text">{tag}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Panel>
  );
}

/* ══════════════════════════════════════════════════
   CORE STATS PANEL
══════════════════════════════════════════════════ */
function CoreStatsPanel({inView}:{inView:boolean}) {
  const [hov,setHov] = useState<number|null>(null);
  return (
    <Panel>
      <Corners c={R} s={9} />
      <PanelHeader icon="/assets/icon-kai-piala.png" label="CORE STATS"/>
      <div className="stats-list">
        {CORE_STATS.map((s,i) => (
          <motion.div key={s.label}
            initial={{opacity:0,x:14}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.1+i*0.07,duration:0.4}}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
          >
            <div className="stat-row-header">
              <div className="stat-icon-box" style={{
                border:`1px solid ${hov===i?R:DIM}`,
                background: hov===i?'rgba(204,17,51,0.18)':'rgba(10,2,8,0.8)',
                boxShadow: hov===i?`0 0 12px ${R}55`:'none',
              }}>
                <StatIcon type={s.icon} active={hov===i}/>
              </div>
              <span className="font-pixel stat-label" style={{color: hov===i?'#e8e0e3':'#a09098'}}>
                {s.label}
              </span>
              <motion.span className="font-pixel stat-value"
                animate={hov===i?{textShadow:`0 0 10px ${R},0 0 20px ${R}44`}:{textShadow:'none'}}
                style={{color: hov===i?R2:R}}>
                {s.value}%
              </motion.span>
            </div>
            <div className="stat-bar-container">
              <div style={{flex:1}}>
                <SegBar value={s.value} color={R} segs={16} inView={inView} delay={0.15+i*0.07} active={hov===i}/>
              </div>
              <motion.div
                animate={hov===i ?{boxShadow:`0 0 10px ${R},0 0 20px ${R}44`,background:R2,scale:1.2} :{boxShadow:`0 0 5px ${R}88`,background:R,scale:1}}
                transition={{duration:0.2}} style={{width:'8px',height:'8px',borderRadius:'50%',flexShrink:0}}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function StatIcon({type,active=false}:{type:string;active?:boolean}) {
  const c = active ? R2 : R;
  const f = `drop-shadow(0 0 ${active?4:2}px ${c}${active?'cc':'77'})`;
  const sz = 13;
  switch(type) {
    case 'code': return (
      <img src="/assets/icon-kai-code.png" alt="" width={sz} height={sz} style={{filter:f}} />
    );
    case 'puzzle': return (
      <img src="/assets/icon-kai-lego.png" alt="" width={sz} height={sz} style={{filter:f}} />
    );
    case 'palette': return (
      <img src="/assets/icon-kai-star.png" alt="" width={sz} height={sz} style={{filter:f}} />
    );
    case 'lightning': return (
      <img src="/assets/kai-icon-pen.png" alt="" width={sz} height={sz} style={{filter:f}} />
    );
    case 'brain': return (
      <img src="/assets/icon-kai-ring.png" alt="" width={sz} height={sz} style={{filter:f}} />
    );
    case 'cycle': return (
      <img src="/assets/icon-kai-re.png" alt="" width={sz} height={sz} style={{filter:f}} />
    );
    default: return null;
  }
}

/* ══════════════════════════════════════════════════
   SKILL TREE PANEL
══════════════════════════════════════════════════ */
function SkillTreePanel({inView}:{inView:boolean}) {
  const [hov,setHov] = useState<number|null>(null);

  const skills = [
    { label:'FRONTEND',   icon:<SkillCodeIcon/>,    locked:false, color:R,         id:0 },
    { label:'DESIGN',     icon:<SkillPenIcon/>,     locked:false, color:R,         id:1 },
    { label:'REACT',      icon:<SkillReactIcon/>,   locked:false, color:'#61dafb', id:2 },
    { label:'TAILWIND',   icon:<SkillWindIcon/>,    locked:false, color:'#38bdf8', id:3 },
    { label:'JAVASCRIPT', icon:<SkillJSIcon/>,      locked:false, color:'#f7df1e', id:4 },
    { label:'???',        icon:null,                locked:true,  color:DIM,       id:5 },
    { label:'???',        icon:null,                locked:true,  color:DIM,       id:6 },
    { label:'???',        icon:null,                locked:true,  color:DIM,       id:7 },
  ];

  return (
    <Panel style={{display:'flex',flexDirection:'column'}}>
      <Corners c={R} s={9} />
      <PanelHeader icon="/assets/icon-kai-mekanik.png" label="SKILL TREE"/>

      <div className="skill-tree-content">
        {/* ── ROW 1: FRONTEND ◄─── center heart ───► DESIGN ── */}
        <div className="skill-row">
          <SkillHex skill={skills[0]} hov={hov} setHov={setHov} inView={inView} delay={0.15}/>
          {/* Connector: left arrow + line */}
          <div className="skill-connector-h">
            <span className="font-pixel text-[7px]" style={{color:`${R}88`}}>◄</span>
            <div className="skill-connector-line"/>
            {/* Center heart node (pulsing) */}
            <motion.div className="skill-heart-node"
              animate={{ scale: [1, 1.15, 1], boxShadow: [`0 0 8px ${R}66`, `0 0 22px ${R}cc`, `0 0 8px ${R}66`] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill={R} style={{ filter: `drop-shadow(0 0 6px ${R})` }}>
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </motion.div>
            <div className="skill-connector-line"/>
            <span className="font-pixel text-[7px]" style={{color:`${R}88`}}>►</span>
          </div>
          <SkillHex skill={skills[1]} hov={hov} setHov={setHov} inView={inView} delay={0.23}/>
        </div>

        {/* Vertical connectors row 1 → row 2 */}
        <div className="skill-connector-v">
          <div className="skill-v-line"/><div className="skill-v-line"/><div className="skill-v-line"/>
        </div>

        {/* ── ROW 2: REACT · TAILWIND · JS ── */}
        <div className="skill-row-2">
          <div className="skill-row-2-bg"/>
          {skills.slice(2,5).map((sk,i)=>(
            <SkillHex key={sk.id} skill={sk} hov={hov} setHov={setHov} inView={inView} delay={0.32+i*0.09}/>
          ))}
        </div>

        {/* Vertical connectors row 2 → row 3 */}
        <div className="skill-connector-v">
          {[0,1,2].map(i=>(<div key={i} className="skill-v-line-dim"/>))}
        </div>

        {/* ── ROW 3: Locked ── */}
        <div className="skill-row-3">
          {skills.slice(5).map((sk,i)=>(
            <SkillHex key={sk.id} skill={sk} hov={hov} setHov={setHov} inView={inView} delay={0.5+i*0.07}/>
          ))}
        </div>
      </div>

      {/* VIEW DETAILS button */}
      <div className="skill-btn-wrapper">
        <motion.button className="font-pixel skill-btn"
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
  return (
    <motion.div className="skill-hex-wrapper"
      initial={{opacity:0,scale:0.6}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay,duration:0.38,type:'spring',stiffness:200}}
      onMouseEnter={()=>!skill.locked&&setHov(skill.id)} onMouseLeave={()=>setHov(null)}
      style={{cursor:skill.locked?'default':'pointer'}}
    >
      <motion.div className="skill-hex-shape"
        animate={{ boxShadow: skill.locked?'none':isHov?`0 0 24px ${c}99,0 0 10px ${c}66`:`0 0 10px ${c}44` }}
        transition={{duration:0.2}}
        style={{
          background: skill.locked?'rgba(8,2,6,0.6)':'rgba(14,4,10,0.95)',
          borderColor: skill.locked?DIM+'44':isHov?c:c+'55',
        }}
      >
        {skill.locked ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="4" y="9" width="12" height="9" rx="1" stroke={`${DIM}99`} strokeWidth="1.5"/>
            <path d="M7 9V6a3 3 0 016 0v3" stroke={`${DIM}99`} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <motion.div animate={{scale:isHov?1.15:1,opacity:isHov?1:0.9}} transition={{duration:0.2}}>
            {skill.icon}
          </motion.div>
        )}
      </motion.div>
      <span className="font-pixel skill-hex-label" style={{color:skill.locked?'#2a1020':isHov?c:'#887078'}}>
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
  return (
    <img src="/assets/kai-icon-pen.png" alt="pen" style={{width:'20px',height:'20px',filter:`drop-shadow(0 0 6px ${R})`}} />
  );
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
    <svg width="26" height="26" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="2" fill="#f7df1e" opacity="0.15"/>
      <rect width="24" height="24" rx="2" stroke="#f7df1e" strokeWidth="1" fill="none" opacity="0.4"/>
      <text x="4" y="18" fontFamily="monospace" fontWeight="bold" fontSize="13" fill="#f7df1e">JS</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   GALLERY / DIGITAL LOGS
══════════════════════════════════════════════════ */
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
      <Panel className="gallery-panel">
        <Corners c={R} s={9} />
        {/* Outer nav arrows */}
        <GalleryArrow dir="left"  onClick={prev} className="gallery-nav-left"/>
        <GalleryArrow dir="right" onClick={next} className="gallery-nav-right"/>

        {/* Header row */}
        <div className="gallery-header">
          <div className="gallery-header-title">
            <img src="/assets/icon-kai-cat1.png" alt="" className="panel-header-icon"/>
            <span className="font-pixel text-[10px] tracking-widest" style={{color:R}}>DIGITAL LOGS</span>
          </div>

          {/* Filter tabs */}
          <div className="gallery-filters">
            {GALLERY_FILTERS.map(f=>(
              <motion.button key={f} onClick={() => {
                setFilter(f);
                setSelected(0);
              }}
                whileHover={{scale:1.06}} whileTap={{scale:0.94}}
                className="font-pixel gallery-filter-btn"
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
          <div className="gallery-sync-info">
            <motion.span className="font-pixel text-[7px]" style={{color:'#3a2030'}}
              animate={{opacity:[0.4,0.9,0.4]}} transition={{duration:3,repeat:Infinity}}>
              SWITCH LOG • PROFILE DATA SYNCED
            </motion.span>
            <span className="font-pixel gallery-clock">
              {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
            </span>
          </div>
        </div>

        {/* Cards strip */}
        <div className="gallery-cards-viewport">
          <div className="gallery-cards-track">
            <AnimatePresence mode="popLayout">
              {items.map((item,i)=>{
                const isSel = i===selected;
                return (
                  <motion.div key={`${filter}-${item.id}`} className="gallery-card"
                    layout onClick={()=>setSelected(i)}
                    initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1,flex:isSel?2.8:1}} exit={{opacity:0,scale:0.88}}
                    transition={{duration:0.35,ease:[0.16,1,0.3,1]}}
                    style={{
                      border: isSel?`1.5px solid ${R}`:`1px solid rgba(61,15,26,0.5)`,
                      boxShadow: isSel ?`0 0 28px ${R}77,0 0 60px ${R}33,inset 0 0 20px rgba(0,0,0,0.4)` :'0 0 3px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Background image */}
                    <img src={item.image} alt={item.title} className="gallery-card-img"
                      style={{ filter: isSel?'brightness(0.75) saturate(1.2)':'brightness(0.45) saturate(0.65)' }}
                    />
                    {isSel && <div className="gallery-card-tint"/>}
                    <div className="gallery-card-gradient"/>

                    {/* SELECTED badge */}
                    {isSel && (
                      <motion.div className="gallery-badge" initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}}>
                        <span className="font-pixel gallery-badge-text">SELECTED</span>
                      </motion.div>
                    )}

                    {/* Card labels */}
                    <div className="gallery-card-labels">
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
        <div className="gallery-dots">
          {items.map((_,i)=>(
            <button key={i} onClick={()=>setSelected(i)} className="gallery-dot-btn">
              <motion.div className="gallery-dot-shape"
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

/* ══════════════════════════════════════════════════
   NAV DOTS BAR
══════════════════════════════════════════════════ */
function NavDotsBar({onNavigate}:{onNavigate:(id:SectionId)=>void}) {
  const sections: SectionId[] = ['hero','about','skills','projects','contact'];
  const labels: Record<SectionId,string> = {hero:'INTRO',about:'PROFILE',skills:'INVENTOR',projects:'QUEST BOARD',contact:'PORTAL'};
  return (
    <div className="nav-dots-bar">
      {sections.map((s,i)=>(
        <motion.button key={s} onClick={()=>onNavigate(s)} title={labels[s]} className="nav-dot-btn"
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5+i*0.05}} whileHover={{scale:1.2}}
        >
          <motion.div className="gallery-dot-shape"
            animate={{
              width:  s==='about'?'12px':'8px', height: s==='about'?'12px':'8px',
              background: s==='about'?R:'transparent', borderColor: s==='about'?R:`${R}44`,
              rotate:45, boxShadow: s==='about'?`0 0 10px ${R}`:'none',
            }}
            transition={{duration:0.2}}
          />
        </motion.button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════ */
function Panel({children,style={},className=''}:{children:React.ReactNode;style?:React.CSSProperties;className?:string}) {
  return (
    <div className={`kai-panel ${className}`} style={style}>
      <div className="panel-highlight"/>
      {children}
    </div>
  );
}

function PanelHeader({icon,label}:{icon:string;label:string}) {
  return (
    <div className="panel-header-root">
      <img src={icon} alt="" className="panel-header-icon"/>
      <span className="font-pixel text-[9px] tracking-widest" style={{color:R}}>{label}</span>
      <motion.span className="font-pixel text-[7px] ml-0.5" style={{color:`${R}55`}}
        animate={{opacity:[0.3,0.8,0.3]}} transition={{duration:2.5,repeat:Infinity}}>✕</motion.span>
      <div style={{flex:1,height:'1px',background:`linear-gradient(90deg,${R}33,transparent)`,marginLeft:'4px'}}/>
      <div style={{display:'flex',gap:'3px'}}>
        {[0.4,0.7,1].map((o,i)=>(
          <div key={i} style={{width:'4px',height:'4px',borderRadius:'50%',background:R,opacity:o,boxShadow:`0 0 4px ${R}`}}/>
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
    <div className="seg-bar">
      {Array.from({length:segs}).map((_,i)=>(
        <motion.div key={i} className="seg-chunk"
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
      className={`font-pixel gallery-nav-arrow ${className}`}>
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
