import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import komponen PixelGrid (sesuaikan path jika berbeda folder)
import { PixelGrid } from '../ui/PixelGrid';

const ICON_MAP: Record<string, string> = {
  code: '⌨️',
  'file-code': '📄',
  brush: '🖌️',
  'file-json': '🧾',
  'file-type': '🗂️',
  boxes: '📦',
  atom: '⚛️',
  'arrow-right': '➡️',
  triangle: '🔺',
  mountain: '⛰️',
  wind: '🌬️',
  move: '🔀',
  hexagon: '⬢',
  'message-square': '💬',
  wrench: '🔧',
  cursor: '🖱️',
  zap: '⚡',
  box: '🗃️',
  'git-branch': '🌿',
  github: '🐙',
  server: '🖥️',
  book: '📚',
  scissors: '✂️',
  'pen-tool': '🖊️',
  paintbrush: '🖌️',
  banana: '🍌',
  cpu: '🧠',
  'message-circle': '💭',
  brain: '🧠',
  sparkles: '✨',
  eye: '👁️',
  target: '🎯',
  'monitor-smartphone': '📱',
  layout: '🗔',
  'app-window': '🪟',
  'layout-dashboard': '📊',
  bot: '🤖',
  network: '🌐',
  cat: '🐈',
};

type IconProps = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

function Icon({ name, className }: IconProps) {
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ''}`}>
      {ICON_MAP[name] ?? '❔'}
    </span>
  );
}

const makeIcon = (name: string) => (props: Omit<IconProps, 'name'>) => <Icon name={name} {...props} />;

const Code2 = makeIcon('code');
const FileCode2 = makeIcon('file-code');
const Brush = makeIcon('brush');
const FileJson = makeIcon('file-json');
const FileType2 = makeIcon('file-type');
const Boxes = makeIcon('boxes');
const Atom = makeIcon('atom');
const ArrowRightCircle = makeIcon('arrow-right');
const Triangle = makeIcon('triangle');
const Mountain = makeIcon('mountain');
const Wind = makeIcon('wind');
const Move = makeIcon('move');
const Hexagon = makeIcon('hexagon');
const MessageSquare = makeIcon('message-square');
const Wrench = makeIcon('wrench');
const Code = makeIcon('code');
const MousePointer2 = makeIcon('cursor');
const Zap = makeIcon('zap');
const Box = makeIcon('box');
const GitBranch = makeIcon('git-branch');
const Github = makeIcon('github');
const Server = makeIcon('server');
const Book = makeIcon('book');
const Scissors = makeIcon('scissors');
const PenTool = makeIcon('pen-tool');
const Paintbrush = makeIcon('paintbrush');
const Banana = makeIcon('banana');
const Cpu = makeIcon('cpu');
const MessageCircle = makeIcon('message-circle');
const Brain = makeIcon('brain');
const Sparkles = makeIcon('sparkles');
const Eye = makeIcon('eye');
const Target = makeIcon('target');
const MonitorSmartphone = makeIcon('monitor-smartphone');
const Layout = makeIcon('layout');
const AppWindow = makeIcon('app-window');
const LayoutDashboard = makeIcon('layout-dashboard');
const Bot = makeIcon('bot');
const Network = makeIcon('network');
const Cat = makeIcon('cat');

// --- DATA STRUCTURE ---

type SkillIcon = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

type SkillNodeData = {
  id: string;
  title: string;
  icon: SkillIcon;
  x: number;
  y: number;
};

type SkillEdge = {
  from: string;
  to: string;
};

type SkillColumnData = {
  id: string;
  title: string;
  subtitle: string;
  icon: SkillIcon;
  nodes: SkillNodeData[];
  edges: SkillEdge[];
};

const SKILL_COLUMNS: SkillColumnData[] = [
  {
    id: "core",
    title: "CODE CORE",
    subtitle: "Languages",
    icon: Code2,
    nodes: [
      { id: "html", title: "HTML5", icon: FileCode2, x: 50, y: 0 },
      { id: "css", title: "CSS3", icon: Brush, x: 25, y: 1 },
      { id: "js", title: "JavaScript\n(ES6+)", icon: FileJson, x: 75, y: 1 },
      { id: "ts", title: "TypeScript", icon: FileType2, x: 75, y: 2 },
    ],
    edges: [
      { from: "html", to: "css" },
      { from: "html", to: "js" },
      { from: "js", to: "ts" },
    ]
  },
  {
    id: "frameworks",
    title: "FRAMEWORK FORGE",
    subtitle: "Frameworks & Libraries",
    icon: Boxes,
    nodes: [
      { id: "react", title: "React 18", icon: Atom, x: 50, y: 0 },
      { id: "next", title: "Next.js", icon: ArrowRightCircle, x: 30, y: 1 },
      { id: "vue", title: "Vue 3", icon: Triangle, x: 70, y: 1 },
      { id: "nuxt", title: "Nuxt", icon: Mountain, x: 15, y: 2 },
      { id: "tailwind", title: "Tailwind CSS", icon: Wind, x: 50, y: 2 },
      { id: "gsap", title: "GSAP", icon: Move, x: 85, y: 2 },
      { id: "lucide", title: "Lucide React", icon: Hexagon, x: 15, y: 3 },
      { id: "discord", title: "Discord.js v14", icon: MessageSquare, x: 85, y: 3 },
    ],
    edges: [
      { from: "react", to: "next" },
      { from: "react", to: "vue" },
      { from: "next", to: "nuxt" },
      { from: "next", to: "tailwind" },
      { from: "vue", to: "tailwind" },
      { from: "vue", to: "gsap" },
      { from: "nuxt", to: "lucide" },
      { from: "gsap", to: "discord" },
    ]
  },
  {
    id: "devtools",
    title: "DEV TOOLS",
    subtitle: "Tools & Platforms",
    icon: Wrench,
    nodes: [
      { id: "vscode", title: "VS Code", icon: Code, x: 50, y: 0 },
      { id: "cursor", title: "Cursor", icon: MousePointer2, x: 30, y: 1 },
      { id: "vite", title: "Vite", icon: Zap, x: 70, y: 1 },
      { id: "node", title: "Node.js", icon: Box, x: 15, y: 2 },
      { id: "git", title: "Git", icon: GitBranch, x: 50, y: 2 },
      { id: "github", title: "GitHub", icon: Github, x: 85, y: 2 },
      { id: "vercel", title: "Vercel", icon: Triangle, x: 10, y: 3 },
      { id: "vps", title: "VPS (Linux)", icon: Server, x: 36, y: 3 },
      { id: "notion", title: "Notion", icon: Book, x: 63, y: 3 },
      { id: "capcut", title: "CapCut", icon: Scissors, x: 90, y: 3 },
    ],
    edges: [
      { from: "vscode", to: "cursor" },
      { from: "vscode", to: "vite" },
      { from: "cursor", to: "node" },
      { from: "cursor", to: "git" },
      { from: "vite", to: "git" },
      { from: "vite", to: "github" },
      { from: "node", to: "vercel" },
      { from: "node", to: "vps" },
      { from: "git", to: "vps" },
      { from: "git", to: "notion" },
      { from: "github", to: "notion" },
      { from: "github", to: "capcut" },
    ]
  },
  {
    id: "design",
    title: "DESIGN ARMORY",
    subtitle: "Design Tools",
    icon: PenTool,
    nodes: [
      { id: "canva", title: "Canva", icon: Paintbrush, x: 50, y: 0 },
      { id: "nano", title: "Nano Banana", icon: Banana, x: 50, y: 2 },
    ],
    edges: [
      { from: "canva", to: "nano" },
    ]
  },
  {
    id: "ai",
    title: "AI COMPANIONS",
    subtitle: "AI Tools",
    icon: Cpu,
    nodes: [
      { id: "openai", title: "OpenAI API", icon: Cpu, x: 50, y: 0 },
      { id: "chatgpt", title: "ChatGPT", icon: MessageCircle, x: 30, y: 1 },
      { id: "claude", title: "Claude", icon: Brain, x: 70, y: 1 },
      { id: "gemini", title: "Gemini", icon: Sparkles, x: 30, y: 2 },
      { id: "grok", title: "Grok", icon: Eye, x: 70, y: 2 },
    ],
    edges: [
      { from: "openai", to: "chatgpt" },
      { from: "openai", to: "claude" },
      { from: "chatgpt", to: "gemini" },
      { from: "claude", to: "grok" },
      { from: "chatgpt", to: "grok" }, // Forces the horizontal crossbar
    ]
  },
  {
    id: "roles",
    title: "BATTLE ROLES",
    subtitle: "Focus Areas",
    icon: Target,
    nodes: [
      { id: "responsive", title: "Responsive UI", icon: MonitorSmartphone, x: 50, y: 0 },
      { id: "landing", title: "Landing Pages", icon: Layout, x: 30, y: 1 },
      { id: "webapps", title: "Web Apps", icon: AppWindow, x: 70, y: 1 },
      { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, x: 30, y: 2 },
      { id: "uiux", title: "UI/UX Design", icon: PenTool, x: 70, y: 2 },
      { id: "bot", title: "Bot Dev", icon: Bot, x: 30, y: 3 },
      { id: "aiint", title: "AI Integration", icon: Network, x: 70, y: 3 },
    ],
    edges: [
      { from: "responsive", to: "landing" },
      { from: "responsive", to: "webapps" },
      { from: "landing", to: "dashboard" },
      { from: "landing", to: "uiux" }, // Crossbar
      { from: "webapps", to: "uiux" },
      { from: "dashboard", to: "bot" },
      { from: "dashboard", to: "aiint" }, // Crossbar
      { from: "uiux", to: "aiint" },
    ]
  }
];

// --- COMPONENTS ---

export function Skills() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#050000] text-[#ff003c] font-mono selection:bg-[#ff003c] selection:text-white relative overflow-hidden">
      
      {/* Background Effects */}
      <PixelGrid />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'radial-gradient(circle at 50% 50%, #ff003c 0%, transparent 60%), linear-gradient(0deg, transparent 24%, rgba(255, 0, 60, .3) 25%, rgba(255, 0, 60, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 60, .3) 75%, rgba(255, 0, 60, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 60, .3) 25%, rgba(255, 0, 60, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 60, .3) 75%, rgba(255, 0, 60, .3) 76%, transparent 77%, transparent)',
             backgroundSize: '100% 100%, 40px 40px, 40px 40px'
           }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

      <main className="relative z-10 max-w-[1800px] mx-auto px-4 py-8 flex flex-col min-h-screen">
        
        {/* Header Section */}
        <header className="flex flex-col items-center mb-16 relative">
          <div className="flex items-center gap-4 mb-2">
            <Cat className="w-8 h-8 text-[#ff003c] animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] text-[#ff003c] uppercase" style={{ textShadow: '0 0 15px rgba(255,0,60,0.8)' }}>
              // Inventor's Skill Tree
            </h1>
          </div>
          <p className="text-[#ff003c]/70 text-sm md:text-base tracking-widest uppercase">
            Every skill is a weapon. Every project is a quest.
          </p>
          
          {/* Decorative side elements */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 text-[#ff003c]/40 text-xs">
            <div className="w-16 h-px bg-[#ff003c]/40" />
            <span>[ SYSTEM . ONLINE ]</span>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 text-[#ff003c]/40 text-xs">
            <span>[ STATUS . OPTIMAL ]</span>
            <div className="w-16 h-px bg-[#ff003c]/40" />
          </div>
        </header>

        {/* Tree Grid Container */}
        <div className="flex flex-col xl:flex-row xl:justify-center gap-12 xl:gap-8 overflow-x-auto pb-20 scrollbar-hide px-4 xl:px-0">
          {SKILL_COLUMNS.map((col, idx) => (
            <motion.div 
              key={col.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Column 
                data={col} 
                hoveredNode={hoveredNode} 
                setHoveredNode={setHoveredNode} 
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-auto pt-10">
          <div className="relative border border-[#ff003c]/40 bg-[#ff003c]/5 p-4 text-center group cursor-default overflow-hidden">
            <div className="absolute inset-0 bg-[#ff003c]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            
            {/* Corner Details */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#ff003c]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#ff003c]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#ff003c]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#ff003c]" />
            
            <p className="text-lg md:text-xl font-bold tracking-[0.3em] text-[#ff003c]" style={{ textShadow: '0 0 10px rgba(255,0,60,0.5)' }}>
              LEVEL UP YOUR SKILLS. UNLOCK NEW POSSIBILITIES.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Skills;

// --- SUBCOMPONENTS ---

interface ColumnProps {
  data: SkillColumnData;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
}

function Column({ data, hoveredNode, setHoveredNode }: ColumnProps) {
  const colWidth = 260; // Fixed width for precise SVG rendering
  const rowHeight = 130;
  const nodeHeight = 84;
  
  // Calculate total height based on max row index
  const maxY = Math.max(...data.nodes.map((n) => n.y));
  const treeHeight = (maxY * rowHeight) + nodeHeight + 40; 

  // Chamfered corner clip-path for cyberpunk look
  const chamferedStyle = {
    clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'
  };

  return (
    <div className="flex-shrink-0 flex flex-col items-center" style={{ width: colWidth }}>
      
      {/* Column Header */}
      <div className="w-full flex flex-col items-center mb-8 relative z-20 group">
        <div className="w-full h-[60px] bg-[#ff003c] p-[1px] shadow-[0_0_15px_rgba(255,0,60,0.2)] group-hover:shadow-[0_0_25px_rgba(255,0,60,0.5)] transition-shadow duration-300" style={chamferedStyle}>
          <div className="w-full h-full bg-[#050000] flex flex-col items-center justify-center relative overflow-hidden" style={chamferedStyle}>
             {/* Scanline effect */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,60,0.1)_50%)] bg-[length:100%_4px] opacity-50 pointer-events-none" />
             
             <div className="flex items-center gap-2">
               <data.icon className="w-4 h-4 text-[#ff003c]" />
               <span className="font-bold text-sm tracking-wider text-[#ff003c]">{data.title}</span>
             </div>
          </div>
        </div>
        <span className="text-[10px] text-[#ff003c]/60 mt-2 uppercase tracking-widest">{data.subtitle}</span>
        
        {/* Connector from header to first row */}
        <div className="w-px h-8 bg-[#ff003c]/40 mt-2" />
      </div>

      {/* Tree Content */}
      <div className="relative w-full" style={{ height: treeHeight }}>
        <Edges 
          edges={data.edges} 
          nodes={data.nodes} 
          hoveredNode={hoveredNode} 
          colWidth={colWidth} 
          rowHeight={rowHeight} 
          nodeHeight={nodeHeight} 
        />
        
        {data.nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isConnected = hoveredNode
            ? data.edges.some((e) => (e.from === node.id && e.to === hoveredNode) || (e.to === node.id && e.from === hoveredNode))
            : false;
          const isHighlighted = isHovered || isConnected;

          return (
            <SkillNode
              key={node.id}
              node={node}
              colWidth={colWidth}
              rowHeight={rowHeight}
              isHighlighted={isHighlighted}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            />
          );
        })}
      </div>
    </div>
  );
}

// --- EDGES RENDERER ---

interface EdgesProps {
  edges: SkillEdge[];
  nodes: SkillNodeData[];
  hoveredNode: string | null;
  colWidth: number;
  rowHeight: number;
  nodeHeight: number;
}

function Edges({ edges, nodes, hoveredNode, colWidth, rowHeight, nodeHeight }: EdgesProps) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {edges.map((edge, idx) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);
        
        if (!fromNode || !toNode) return null;

        const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
        
        const startX = (fromNode.x / 100) * colWidth;
        const startY = fromNode.y * rowHeight + nodeHeight;
        const endX = (toNode.x / 100) * colWidth;
        const endY = toNode.y * rowHeight;
        const busY = startY + 22; // Midpoint for bus connection

        let d: string;
        const circles: React.ReactNode[] = [];

        if (fromNode.y === toNode.y - 1) {
          // Standard bus routing (Manhattan)
          d = `M ${startX} ${startY} L ${startX} ${busY} L ${endX} ${busY} L ${endX} ${endY}`;
          circles.push(
            <circle key="c1" cx={startX} cy={busY} r={2} className="fill-[#ff003c]" />,
            <circle key="c2" cx={endX} cy={busY} r={2} className="fill-[#ff003c]" />
          );
        } else {
          // Direct straight connection (for skipped rows)
          d = `M ${startX} ${startY} L ${startX} ${endY}`;
        }

        return (
          <g key={`${edge.from}-${edge.to}-${idx}`}>
            {/* Base Line */}
            <path
              d={d}
              fill="none"
              stroke={isHighlighted ? "#ff003c" : "rgba(255, 0, 60, 0.3)"}
              strokeWidth={isHighlighted ? 2 : 1}
              filter={isHighlighted ? "url(#glow)" : ""}
              className="transition-all duration-300 ease-in-out"
            />
            {/* Animated dashed line overlay for tech vibe */}
            {isHighlighted && (
              <motion.path
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={1}
                strokeDasharray="4 8"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -24 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="opacity-50"
              />
            )}
            {/* Connection joints */}
            {circles}
          </g>
        );
      })}
    </svg>
  );
}

// --- NODE COMPONENT ---

interface SkillNodeProps {
  node: SkillNodeData;
  colWidth: number;
  rowHeight: number;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function SkillNode({ node, colWidth, rowHeight, isHighlighted, onMouseEnter, onMouseLeave }: SkillNodeProps) {
  const nodeWidth = 72;
  const nodeHeight = 84;
  
  const leftPx = (node.x / 100) * colWidth;
  const topPx = node.y * rowHeight;

  const nodeChamfer = {
    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
  };

  return (
    <div
      className="absolute z-10 cursor-pointer transform -translate-x-1/2 group"
      style={{
        left: leftPx,
        top: topPx,
        width: nodeWidth,
        height: nodeHeight,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Outer Border Box */}
      <div 
        className={`w-full h-full p-[1px] transition-all duration-300 ${
          isHighlighted ? 'bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.8)] scale-110' : 'bg-[#ff003c]/40 hover:bg-[#ff003c]/80'
        }`}
        style={nodeChamfer}
      >
        {/* Inner Dark Box */}
        <div 
          className="w-full h-full bg-[#080000] flex flex-col items-center justify-center gap-2 relative overflow-hidden group-hover:bg-[#110000] transition-colors"
          style={nodeChamfer}
        >
          {/* subtle scanline in node */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,60,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />

          {/* Icon - Note: In a real environment with local assets, replace <node.icon /> with <img src={`/icons/${node.id}.png`} /> */}
          <div className={`transition-transform duration-300 ${isHighlighted ? 'scale-110 text-white' : 'text-[#ff003c]'}`}>
            <node.icon strokeWidth={1.5} className="w-7 h-7 drop-shadow-[0_0_5px_rgba(255,0,60,0.8)]" />
          </div>

          {/* Title Text */}
          <span className={`text-[9px] text-center font-semibold leading-[1.1] tracking-wide px-1 ${isHighlighted ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-[#ff003c]/80'}`}>
            {node.title.split('\n').map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i !== node.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
