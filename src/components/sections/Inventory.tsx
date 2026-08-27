import { motion } from 'framer-motion';
import { useState } from 'react';
import type { SectionId } from '../../App';
import { PixelGrid } from '../ui/PixelGrid';

interface ToolIcon {
  name: string;
  svg: React.ReactNode;
}

const TOOL_LIBRARY: Record<string, ToolIcon> = {
  React: {
    name: 'React',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61dafb" />
      </svg>
    ),
  },
  TypeScript: {
    name: 'TypeScript',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect width="24" height="24" rx="3" fill="#3178c6" opacity="0.18" />
        <rect width="24" height="24" rx="3" stroke="#3178c6" strokeWidth="1.4" />
        <path d="M4 8h6M7 8v8" stroke="#3178c6" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 9.5c.5-1 1.2-1.5 2.5-1.5s2.5.8 2.5 2-.8 1.8-2.5 2-2.5.8-2.5 2 1 2 2.5 2 2-.5 2.5-1.5" stroke="#3178c6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  Tailwind: {
    name: 'Tailwind',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M5 8a4 4 0 018 0" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 12h14a3 3 0 000-6h-1" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 16h10a3 3 0 010 6h-1" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  Framer: {
    name: 'Framer',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M5 4h14v6H12l7 6v4H12l-7-6V4z" stroke="#cc1133" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(204,17,51,0.12)" />
      </svg>
    ),
  },
  Node: {
    name: 'Node.js',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M12 3L20.5 7.5v9L12 21 3.5 16.5v-9L12 3z" stroke="#68a063" strokeWidth="1.4" />
        <path d="M9 16V8l6 8V8" stroke="#68a063" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Postgres: {
    name: 'PostgreSQL',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <ellipse cx="12" cy="6" rx="7" ry="3" stroke="#336791" strokeWidth="1.4" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="#336791" strokeWidth="1.4" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="#336791" strokeWidth="1.4" />
      </svg>
    ),
  },
  Supabase: {
    name: 'Supabase',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M12 2L4 14h6l-2 8 10-12h-6l2-8z" stroke="#3ecf8e" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(62,207,142,0.12)" />
      </svg>
    ),
  },
  Figma: {
    name: 'Figma',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <circle cx="9" cy="6" r="3" stroke="#a259ff" strokeWidth="1.4" />
        <circle cx="9" cy="12" r="3" stroke="#a259ff" strokeWidth="1.4" />
        <circle cx="9" cy="18" r="3" stroke="#a259ff" strokeWidth="1.4" />
        <circle cx="15" cy="6" r="3" stroke="#f24e1e" strokeWidth="1.4" />
        <circle cx="15" cy="12" r="3" stroke="#1abcfe" strokeWidth="1.4" />
      </svg>
    ),
  },
  Three: {
    name: 'Three.js',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M5 4l1.4 15L12 21l6.6-2L20 4H5z" stroke="#e8e0e3" strokeWidth="1.4" />
        <path d="M8 10l-2.5 2L8 14M16 10l2.5 2L16 14M13 9l-2 6" stroke="#e8e0e3" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  Vite: {
    name: 'Vite',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path d="M3 8l9-5 9 5-9 13L3 8z" stroke="#ffd028" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 8h18M12 21V3" stroke="#ffd028" strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),
  },
};

interface Project {
  id: string;
  title: string;
  category: 'WEB' | 'BOT' | 'GAME';
  year: string;
  status: 'SHIPPED' | 'WIP';
  description: string;
  longDescription: string;
  stack: string[];
  tools: string[]; // keys of TOOL_LIBRARY
  links: { label: string; href: string }[];
  accent: string;
}

const PROJECTS: Project[] = [
  {
    id: 'kichi',
    title: 'Kichi — Discord Bot',
    category: 'BOT',
    year: '2025',
    status: 'SHIPPED',
    description: 'Sarcastic AI companion for Discord — memory, reminders, voice, lyrics.',
    longDescription: 'A Gen-Z style AI companion for Discord servers. Per-user memory (up to 20 messages), auto reminders (built-in + custom), voice TTS via Piper and STT via Whisper, lyrics search with cache, and 15 Hijri/Gregorian holiday events. Slash commands, modals, PM2 deployment.',
    stack: ['Node.js', 'Discord.js', 'OpenRouter API', 'Piper TTS'],
    tools: ['Node'],
    links: [
      { label: 'GITHUB', href: 'https://github.com/syfaarizal/pirate-discord-bot' },
      { label: 'WEBSITE', href: 'https://kichi.web.id' },
    ],
    accent: '#22c55e',
  },
  {
    id: 'aegis',
    title: 'Aegis — Anti-Spam',
    category: 'BOT',
    year: '2025',
    status: 'WIP',
    description: 'Discord security bot — auto-detects cross-channel duplicate spam.',
    longDescription: 'Multi-type detector (text, images, links) with auto-delete + timeout enforcement. Per-guild config via slash command, anti-false-positive (admin/mod role bypass), and dual-channel logging. Guild-scoped in-memory cache to avoid cross-server interference.',
    stack: ['Node.js', 'Discord.js', 'JSON config'],
    tools: ['Node'],
    links: [
      { label: 'GITHUB', href: 'https://github.com/syfaarizal/aegis' },
    ],
    accent: '#f59e0b',
  },
  {
    id: 'darknes',
    title: 'DARKNES — VN Engine',
    category: 'GAME',
    year: '2025',
    status: 'WIP',
    description: 'Visual novel engine + dark-luxury mafia story. Monorepo, reusable.',
    longDescription: 'Cinematic visual novel built as a reusable engine. 13 engines (Story, Scene, Dialogue, Choice, Character, Background, Camera, Audio, Save, Animation, plus reserved Effect/Voice/Input). Monorepo with packages/engine, packages/ui, packages/assets. JSON-driven scenes with variable interpolation like {playerName}.',
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Howler.js', 'Turborepo'],
    tools: ['React', 'TypeScript', 'Vite', 'Three'],
    links: [
      { label: 'GITHUB', href: 'https://github.com/syfaarizal/darknes-game' },
    ],
    accent: '#9c27b0',
  },
  {
    id: 'kaishi',
    title: 'Kaishi Portfolio v3',
    category: 'WEB',
    year: '2026',
    status: 'SHIPPED',
    description: 'This very site — pixel-infused cyberpunk with audio-reactive UI.',
    longDescription: 'Built as a love letter to retro arcade aesthetics. Glitch-swap page transitions, SFX on every interaction, hands-free navigation via dot-nav, custom audio system, and an AI chat companion. The page you are reading this on.',
    stack: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Tailwind'],
    tools: ['React', 'TypeScript', 'Framer', 'Tailwind', 'Vite'],
    links: [
      { label: 'YOU ARE HERE', href: '#' },
      { label: 'GITHUB', href: 'https://github.com/syfaarizal/kaishi-portfolio' },
    ],
    accent: '#cc1133',
  },
];

const CATEGORY_FILTERS = ['ALL', 'WEB', 'BOT', 'GAME'] as const;
type Filter = typeof CATEGORY_FILTERS[number];

const R = '#cc1133';
const DIM = '#3d0f1a';

interface InventoryProps { onNavigate: (id: SectionId) => void; }

export function Inventory({ onNavigate }: InventoryProps) {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [activeId, setActiveId] = useState<string | null>(null);

  const visible = filter === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  const active = activeId ? PROJECTS.find(p => p.id === activeId) ?? null : visible[0] ?? null;

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: '#07020a' }}>
      <PixelGrid />

      <div className="relative z-10 flex flex-col min-h-screen pt-[80px] pb-12 px-5 md:px-10">
        {/* Header */}
        <header className="mb-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-pixel text-[9px] tracking-widest text-[#cc1133]/70">
              [ INVENTORY.LOG ]
            </span>
            <span className="block h-px flex-1 max-w-[140px] bg-gradient-to-r from-[#cc1133]/40 to-transparent" />
            <span className="font-pixel text-[8px] tracking-widest text-[#7a6068]">
              {PROJECTS.length} ENTRIES
            </span>
          </div>
          <h1
            className="font-pixel text-[#cc1133] tracking-widest"
            style={{
              fontSize: 'clamp(20px, 3.6vw, 36px)',
              textShadow: '0 0 18px rgba(204,17,51,0.55), 0 0 36px rgba(204,17,51,0.25)',
            }}
          >
            INVENTORY ARCHIVE
          </h1>
          <p className="mt-2 text-[11px] md:text-[12px] tracking-[0.22em] text-[#7a6068] max-w-[640px]">
            Builds I've shipped and the ones still in the forge. Click a record to inspect tools, stack, and entry points.
          </p>
        </header>

        {/* Category filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {CATEGORY_FILTERS.map(f => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 font-pixel text-[9px] tracking-[0.18em] transition-all"
                style={{
                  border: `1px solid ${active ? R : 'rgba(122,96,104,0.45)'}`,
                  color: active ? R : '#7a6068',
                  background: active ? 'rgba(204,17,51,0.08)' : 'transparent',
                  boxShadow: active ? '0 0 10px rgba(204,17,51,0.4)' : 'none',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Master / detail layout */}
        <div className="grid gap-5 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] flex-1">
          {/* Project list */}
          <div className="flex flex-col gap-2.5 min-h-0 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
            {visible.map((p, idx) => {
              const isActive = active?.id === p.id;
              const statusColor = p.status === 'SHIPPED' ? '#22c55e' : '#f59e0b';
              return (
                <motion.button
                  key={p.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                  onClick={() => setActiveId(p.id)}
                  className="text-left p-3 group relative"
                  style={{
                    background: isActive ? 'rgba(204,17,51,0.07)' : 'rgba(13,4,8,0.6)',
                    border: `1px solid ${isActive ? R : 'rgba(61,15,26,0.8)'}`,
                    clipPath: 'polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)',
                    boxShadow: isActive ? '0 0 14px rgba(204,17,51,0.3)' : 'none',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className="font-pixel text-[9px] tracking-widest"
                        style={{ color: p.accent }}
                      >
                        {p.category}
                      </span>
                      <span
                        className="font-pixel text-[7px] tracking-widest px-1.5 py-0.5"
                        style={{
                          border: `1px solid ${statusColor}`,
                          color: statusColor,
                          boxShadow: p.status === 'SHIPPED' ? `0 0 6px ${statusColor}66` : 'none',
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <span className="font-pixel text-[8px] text-[#7a6068]">{p.year}</span>
                  </div>
                  <div className="font-pixel text-[12px] tracking-wider text-[#e8d8dc] mb-1">
                    {p.title}
                  </div>
                  <div className="text-[10px] text-[#7a6068] leading-snug line-clamp-2">
                    {p.description}
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="absolute right-2 top-2 w-1.5 h-1.5"
                      style={{ background: R, boxShadow: `0 0 6px ${R}`, transform: 'rotate(45deg)' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Detail pane */}
          <div className="relative min-h-[420px]">
            {active ? <ProjectDetail project={active} /> : null}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-8 pt-6 flex items-center justify-between gap-3">
          <FooterNav label="PREV" icon="◀" onClick={() => onNavigate('about')} side="left" />
          <span className="font-pixel text-[8px] tracking-widest text-[#7a6068]">
            [ INVENTORY v2.0 ]
          </span>
          <FooterNav label="NEXT" icon="▶" onClick={() => onNavigate('projects')} side="right" />
        </div>
      </div>
    </section>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const statusColor = project.status === 'SHIPPED' ? '#22c55e' : '#f59e0b';
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-full p-5 md:p-6"
      style={{
        background: 'rgba(13,4,8,0.7)',
        border: '1px solid rgba(61,15,26,0.85)',
        clipPath: 'polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)',
      }}
    >
      {/* Corner accent */}
      <span
        className="absolute top-0 left-0 w-[10px] h-[10px]"
        style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
      />
      <span
        className="absolute bottom-0 right-0 w-[10px] h-[10px]"
        style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
      />

      {/* Title row */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <h2 className="font-pixel text-[14px] md:text-[16px] tracking-wider text-[#e8d8dc]">
          {project.title}
        </h2>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <span
            className="font-pixel text-[7px] tracking-widest px-1.5 py-0.5"
            style={{
              border: `1px solid ${statusColor}`,
              color: statusColor,
              boxShadow: project.status === 'SHIPPED' ? `0 0 6px ${statusColor}66` : 'none',
            }}
          >
            {project.status}
          </span>
          <span
            className="font-pixel text-[8px] tracking-widest px-2 py-1"
            style={{
              border: `1px solid ${project.accent}`,
              color: project.accent,
            }}
          >
            {project.category} · {project.year}
          </span>
        </div>
      </div>

      {/* Long description */}
      <p className="text-[12px] md:text-[13px] leading-relaxed text-[#c7b6bd] mt-3 mb-5 max-w-prose">
        {project.longDescription}
      </p>

      {/* Stack */}
      <div className="mb-5">
        <SectionLabel>STACK</SectionLabel>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.stack.map(s => (
            <span
              key={s}
              className="font-pixel text-[8px] tracking-widest px-2 py-1"
              style={{ border: '1px solid rgba(122,96,104,0.4)', color: '#c0a8b4' }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Tools (SVG) */}
      <div className="mb-6">
        <SectionLabel>TOOLS USED</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2.5">
          {project.tools.map(key => {
            const t = TOOL_LIBRARY[key];
            if (!t) return null;
            return (
              <div
                key={key}
                className="flex items-center gap-2 px-2.5 py-1.5"
                style={{
                  border: '1px solid rgba(61,15,26,0.85)',
                  background: 'rgba(8,2,6,0.7)',
                }}
                title={t.name}
              >
                {t.svg}
                <span className="font-pixel text-[9px] tracking-wider text-[#c0a8b4]">
                  {t.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {project.links.map(l => (
          <a
            key={l.label}
            href={l.href}
            target={l.href === '#' ? undefined : '_blank'}
            rel="noreferrer"
            className="font-pixel text-[9px] tracking-[0.18em] px-4 py-2 transition-all"
            style={{
              border: `1px solid ${project.accent}`,
              color: project.accent,
              background: 'rgba(204,17,51,0.06)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(204,17,51,0.16)';
              e.currentTarget.style.boxShadow = `0 0 12px ${project.accent}66`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(204,17,51,0.06)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {l.label} →
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-pixel text-[8px] tracking-[0.22em] text-[#cc1133]/80">
        // {children}
      </span>
      <span className="block h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#cc1133]/30 to-transparent" />
    </div>
  );
}

function FooterNav({ label, icon, onClick, side }: { label: string; icon: string; onClick: () => void; side: 'left' | 'right' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: side === 'left' ? -3 : 3 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 font-pixel text-[9px] tracking-widest transition-colors"
      style={{ border: `1px solid ${DIM}`, color: '#7a6068' }}
    >
      {side === 'left' && <span style={{ color: R }}>{icon}</span>}
      <span>{label}</span>
      {side === 'right' && <span style={{ color: R }}>{icon}</span>}
    </motion.button>
  );
}

export default Inventory;
