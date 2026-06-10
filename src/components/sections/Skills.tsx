import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import komponen PixelGrid (sesuaikan path jika berbeda folder)
import { PixelGrid } from '../ui/PixelGrid';

type IconProps = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

type SvgIconProps = React.PropsWithChildren<Omit<IconProps, 'name'>>;

function SvgGlyph({ children, className, strokeWidth = 1.75 }: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const makeGlyph = (children: React.ReactNode) => (props: Omit<IconProps, 'name'>) => (
  <SvgGlyph {...props}>{children}</SvgGlyph>
);

const CodeGlyph = makeGlyph(<><polyline points="10 6 4 12 10 18" /><polyline points="14 6 20 12 14 18" /></>);
const FileGlyph = makeGlyph(<><path d="M7 3h6l4 4v14H7z" /><path d="M13 3v5h5" /><path d="M9 12h6" /></>);
const BrushGlyph = makeGlyph(<><path d="M15 4c-2 1-3 3-3 5 0 1 .2 2 .7 2.8L6 18l-2 2 2-2 6.2-6.2c.8.5 1.8.7 2.8.7 2 0 4-1 5-3l-5-5Z" /><path d="M16.5 12.5 20 16" /><path d="M7 17c0 1.7-1 3-2.5 3" /></>);
const BoxesGlyph = makeGlyph(<><path d="M7 7 12 4l5 3-5 3-5-3Z" /><path d="M7 7v6l5 3 5-3V7" /><path d="M12 10v6" /></>);
const AtomGlyph = makeGlyph(<><circle cx="12" cy="12" r="1.5" /><ellipse cx="12" cy="12" rx="7" ry="3.5" /><ellipse cx="12" cy="12" rx="7" ry="3.5" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="7" ry="3.5" transform="rotate(-60 12 12)" /></>);
const ArrowGlyph = makeGlyph(<><circle cx="12" cy="12" r="8" /><path d="M10 8l4 4-4 4" /><path d="M8 12h6" /></>);
const TriangleGlyph = makeGlyph(<path d="M12 5 19 17H5L12 5Z" />);
const MountainGlyph = makeGlyph(<><path d="M4 18 10 8l4 6 2-3 4 7H4Z" /><path d="M10 8l2.5 4" /></>);
const WindGlyph = makeGlyph(<><path d="M4 8h10c1.7 0 3-1.3 3-3s-1.3-3-3-3" /><path d="M4 12h14c1.7 0 3 1.3 3 3s-1.3 3-3 3" /><path d="M4 16h7" /></>);
const MoveGlyph = makeGlyph(<><path d="M12 3v18" /><path d="M3 12h18" /><path d="M12 3 9 6" /><path d="M12 3 15 6" /><path d="M12 21 9 18" /><path d="M12 21 15 18" /><path d="M3 12 6 9" /><path d="M3 12 6 15" /><path d="M21 12 18 9" /><path d="M21 12 18 15" /></>);
const HexagonGlyph = makeGlyph(<path d="M7 5h10l4 7-4 7H7l-4-7 4-7Z" />);
const MessageSquareGlyph = makeGlyph(<path d="M5 5h14v10H9l-4 4V5Z" />);
const WrenchGlyph = makeGlyph(<path d="M14.5 6.5a4.5 4.5 0 0 0-6 6L4 17v3h3l4.5-4.5a4.5 4.5 0 0 0 6-6l-3 3-2-2 3-3Z" />);
const CursorGlyph = makeGlyph(<path d="M5 4l11 11-4 .5L14 20l-3.5-4.5L8 19 5 4Z" />);
const ZapGlyph = makeGlyph(<path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z" />);
const BoxGlyph = makeGlyph(<><path d="M5 8 12 4l7 4-7 4-7-4Z" /><path d="M5 8v8l7 4 7-4V8" /></>);
const GitBranchGlyph = makeGlyph(<><path d="M7 5v10c0 2-1 3-3 3" /><circle cx="7" cy="5" r="1.5" /><circle cx="17" cy="7" r="1.5" /><circle cx="17" cy="19" r="1.5" /><path d="M7 10c3 0 4-3 10-3" /><path d="M7 15c3 0 4 4 10 4" /></>);
const GithubGlyph = makeGlyph(<path d="M12 4a8 8 0 0 0-2.5 15.6c.4.1.6-.2.6-.5v-1.8c-2.3.5-2.8-1-2.8-1-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.9.1 1.3 1 1.3 1 .8 1.3 2.1.9 2.6.7.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.3 0-.9.3-1.6.8-2.2-.1-.2-.4-1 .1-2 0 0 .7-.2 2.3.8a8 8 0 0 1 4.2 0c1.6-1 2.3-.8 2.3-.8.5 1 .2 1.8.1 2 .5.6.8 1.3.8 2.2 0 3.3-2 4.1-3.9 4.3.3.3.6.8.6 1.6v2.3c0 .3.2.6.6.5A8 8 0 0 0 12 4Z" />);
const ServerGlyph = makeGlyph(<><rect x="5" y="4" width="14" height="5" rx="1" /><rect x="5" y="11" width="14" height="5" rx="1" /><path d="M8 6h.01M8 13h.01" /><path d="M11 6h5M11 13h5" /></>);
const BookGlyph = makeGlyph(<><path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 0-2 2V4Z" /><path d="M8 6h8" /><path d="M8 10h8" /></>);
const ScissorsGlyph = makeGlyph(<><circle cx="6" cy="8" r="2" /><circle cx="6" cy="16" r="2" /><path d="M7.5 9.5 18 4" /><path d="M7.5 14.5 18 20" /></>);
const PenGlyph = makeGlyph(<><path d="M4 20c4-1 7-4 8-8l8-8-4-4-8 8c-4 1-7 4-8 8l4 4Z" /><path d="M12 12 8 8" /></>);
const PaintbrushGlyph = makeGlyph(<><path d="M14 4c-2 1-3 3-3 5 0 1 .2 2 .7 2.8L6 18l-2 2 2-2 5.2-5.2C12 13.3 13 13 14 13c2 0 4-1 5-3l-5-6Z" /><path d="M16 12l3 3" /></>);
const BananaGlyph = makeGlyph(<><path d="M6 8c2 6 8 9 12 7 1-.5 2-1.4 2-2.7 0-1.4-1-2.2-2.5-2.2-2 0-4-1-5.5-2.5C10 6 8.5 5 6.5 5 5 5 4 5.8 4 7c0 .7.4 1.3 1 1.5" /><path d="M6 8c2 2 5 3 8 2" /></>);
const CpuGlyph = makeGlyph(<><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M9 3v3M12 3v3M15 3v3M9 21v-3M12 21v-3M15 21v-3M21 9h-3M21 12h-3M21 15h-3M3 9h3M3 12h3M3 15h3" /><rect x="10" y="10" width="4" height="4" rx="0.5" /></>);
const MessageCircleGlyph = makeGlyph(<><circle cx="12" cy="12" r="8" /><path d="M8 13h6" /><path d="M8 10h4" /></>);
const BrainGlyph = makeGlyph(<><path d="M9 6c-2 0-3 1.5-3 3 0 .8.3 1.5.8 2-.5.5-.8 1.2-.8 2 0 1.5 1 3 3 3 0 1.7 1.3 3 3 3h1c1.7 0 3-1.3 3-3 2 0 3-1.5 3-3 0-.8-.3-1.5-.8-2 .5-.5.8-1.2.8-2 0-1.5-1-3-3-3 0-1.7-1.3-3-3-3h-1C10.3 3 9 4.3 9 6Z" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M12 16h.01" /></>);
const SparklesGlyph = makeGlyph(<><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="M19 13l.8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8L19 13Z" /><path d="M5 14l.7 2.3L8 17l-2.3.7L5 20l-.7-2.3L2 17l2.3-.7L5 14Z" /></>);
const EyeGlyph = makeGlyph(<><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" /><circle cx="12" cy="12" r="2.5" /></>);
const TargetGlyph = makeGlyph(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1.5" /></>);
const DeviceGlyph = makeGlyph(<><rect x="3" y="5" width="13" height="12" rx="1.5" /><path d="M8 19h3" /><rect x="17" y="8" width="4" height="10" rx="1" /><path d="M18.5 10h1" /></>);
const LayoutGlyph = makeGlyph(<><rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M4 9h16M9 9v11" /></>);
const AppWindowGlyph = makeGlyph(<><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M4 9h16" /><path d="M8 13h3M13 13h3M8 16h8" /></>);
const DashboardGlyph = makeGlyph(<><rect x="4" y="4" width="6" height="7" rx="1" /><rect x="12" y="4" width="8" height="4" rx="1" /><rect x="12" y="10" width="8" height="10" rx="1" /><rect x="4" y="13" width="6" height="7" rx="1" /></>);
const BotGlyph = makeGlyph(<><rect x="6" y="7" width="12" height="10" rx="2" /><path d="M12 3v4" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M8 17h8" /></>);
const NetworkGlyph = makeGlyph(<><circle cx="6" cy="6" r="1.5" /><circle cx="18" cy="6" r="1.5" /><circle cx="12" cy="18" r="1.5" /><path d="M7.3 7.3 10.8 10.8" /><path d="M16.7 7.3 13.2 10.8" /><path d="M12 16.5V13" /></>);
const CatGlyph = makeGlyph(<><path d="M6 9 5 4l4 2 3-2 3 2 4-2-1 5" /><path d="M7 8c-1.3 1-2 2.6-2 4.5C5 17 8.1 20 12 20s7-3 7-7.5c0-1.9-.7-3.5-2-4.5" /><path d="M9 13h.01M15 13h.01" /><path d="M10 16c1.3.8 2.7.8 4 0" /></>);
const QuestionGlyph = makeGlyph(<><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-1 .4-1.5 1-1.5 2.2" /><path d="M12 18h.01" /></>);

const ICON_MAP: Record<string, React.ComponentType<Omit<IconProps, 'name'>>> = {
  code: CodeGlyph,
  'file-code': FileGlyph,
  brush: BrushGlyph,
  'file-json': FileGlyph,
  'file-type': FileGlyph,
  boxes: BoxesGlyph,
  atom: AtomGlyph,
  'arrow-right': ArrowGlyph,
  triangle: TriangleGlyph,
  mountain: MountainGlyph,
  wind: WindGlyph,
  move: MoveGlyph,
  hexagon: HexagonGlyph,
  'message-square': MessageSquareGlyph,
  wrench: WrenchGlyph,
  cursor: CursorGlyph,
  zap: ZapGlyph,
  box: BoxGlyph,
  'git-branch': GitBranchGlyph,
  github: GithubGlyph,
  server: ServerGlyph,
  book: BookGlyph,
  scissors: ScissorsGlyph,
  'pen-tool': PenGlyph,
  paintbrush: PaintbrushGlyph,
  banana: BananaGlyph,
  cpu: CpuGlyph,
  'message-circle': MessageCircleGlyph,
  brain: BrainGlyph,
  sparkles: SparklesGlyph,
  eye: EyeGlyph,
  target: TargetGlyph,
  'monitor-smartphone': DeviceGlyph,
  layout: LayoutGlyph,
  'app-window': AppWindowGlyph,
  'layout-dashboard': DashboardGlyph,
  bot: BotGlyph,
  network: NetworkGlyph,
  cat: CatGlyph,
};

function Icon({ name, className, strokeWidth }: IconProps) {
  const Glyph = ICON_MAP[name] ?? QuestionGlyph;
  return <Glyph className={className} strokeWidth={strokeWidth} />;
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
