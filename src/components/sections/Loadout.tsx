import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SectionId } from '../../App';
import { PixelGrid } from '../ui/PixelGrid';

type Category = 'all' | 'language' | 'framework' | 'tool' | 'design';

interface Item {
  name: string;
  short: string;
  category: Exclude<Category, 'all'>;
  mark: string;
  years: string;
  icon: string;
}

const ITEMS: Item[] = [
  // Languages
  { name: 'TypeScript',  short: 'TS',  category: 'language', mark: '◆', years: '4y', icon: '🔷' },
  { name: 'JavaScript',  short: 'JS',  category: 'language', mark: '◆', years: '6y', icon: '🟡' },
  { name: 'Python',      short: 'PY',  category: 'language', mark: '◆', years: '3y', icon: '🐍' },
  { name: 'Go',          short: 'GO',  category: 'language', mark: '◆', years: '1y', icon: '🐹' },
  { name: 'Rust',        short: 'RS',  category: 'language', mark: '◆', years: '1y', icon: '⚙️' },

  // Frameworks / runtimes
  { name: 'React',       short: 'RE',  category: 'framework', mark: '◇', years: '4y', icon: '⚛️' },
  { name: 'Next.js',     short: 'NX',  category: 'framework', mark: '◇', years: '2y', icon: '▲' },
  { name: 'Node.js',     short: 'ND',  category: 'framework', mark: '◇', years: '4y', icon: '🟢' },
  { name: 'Express',     short: 'EX',  category: 'framework', mark: '◇', years: '3y', icon: '🚂' },
  { name: 'FastAPI',     short: 'FA',  category: 'framework', mark: '◇', years: '2y', icon: '⚡' },
  { name: 'Tailwind',    short: 'TW',  category: 'framework', mark: '◇', years: '3y', icon: '🌊' },

  // Tools
  { name: 'Git',         short: 'GT',  category: 'tool', mark: '◈', years: '5y', icon: '🌿' },
  { name: 'Docker',      short: 'DK',  category: 'tool', mark: '◈', years: '2y', icon: '🐳' },
  { name: 'PostgreSQL',  short: 'PG',  category: 'tool', mark: '◈', years: '3y', icon: '🐘' },
  { name: 'MongoDB',     short: 'MG',  category: 'tool', mark: '◈', years: '2y', icon: '🍃' },
  { name: 'Vite',        short: 'VT',  category: 'tool', mark: '◈', years: '2y', icon: '⚡' },
  { name: 'Figma',       short: 'FG',  category: 'tool', mark: '◈', years: '3y', icon: '🎨' },
  { name: 'VS Code',     short: 'VS',  category: 'tool', mark: '◈', years: '5y', icon: '💻' },
  { name: 'GitHub',      short: 'GH',  category: 'tool', mark: '◈', years: '4y', icon: '🐙' },
  { name: 'Cursor',      short: 'CL',  category: 'tool', mark: '◈', years: '1y', icon: '🤖' },
  { name: 'npm',         short: 'NP',  category: 'tool', mark: '◈', years: '5y', icon: '📦' },
  { name: 'pnpm',        short: 'PN',  category: 'tool', mark: '◈', years: '2y', icon: '📦' },
];

const FILTERS: { id: Category; label: string }[] = [
  { id: 'all',       label: 'ALL' },
  { id: 'language',  label: 'LANGUAGES' },
  { id: 'framework', label: 'FRAMEWORKS' },
  { id: 'tool',      label: 'TOOLS' },
];

const CAT_LABEL: Record<Exclude<Category, 'all'>, string> = {
  language: 'LANG',
  framework: 'FW',
  tool: 'TOOL',
  design: 'DSGN',
};

const SECTION_META: Record<Exclude<Category, 'all'>, { label: string; comment: string }> = {
  language:  { label: 'LANGUAGES',          comment: '// Core languages I think in' },
  framework: { label: 'FRAMEWORKS',         comment: '// Build faster, ship smarter' },
  tool:      { label: 'TOOLS & DATABASES',  comment: '// My everyday power-ups' },
  design:    { label: 'DESIGN',             comment: '// Design tools' },
};

const SECTION_ORDER: Exclude<Category, 'all'>[] = ['language', 'framework', 'tool', 'design'];

interface LoadoutProps { onNavigate: (id: SectionId) => void; }

export function Loadout({ onNavigate }: LoadoutProps) {
  const [filter, setFilter] = useState<Category>('all');

  const visible = filter === 'all' ? ITEMS : ITEMS.filter(i => i.category === filter);

  // Group items by category, preserving the order they appear in ITEMS
  const groups: { category: Exclude<Category, 'all'>; items: Item[] }[] = [];
  if (filter === 'all') {
    for (const cat of SECTION_ORDER) {
      const items = ITEMS.filter(i => i.category === cat);
      if (items.length > 0) groups.push({ category: cat, items });
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: '#07020a' }}>
      <PixelGrid />

      {/* Right-side decorative vertical column */}
      <div
        className="fixed right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.4)' }}>◇</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.4)' }}>◇</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.7)' }}>◇</span>
        <span className="font-pixel text-[10px]" style={{ color: '#cc1133' }}>◆</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.7)' }}>◇</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.4)' }}>◇</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.4)' }}>◇</span>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen pt-[80px] pb-12 px-5 md:px-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-pixel text-[9px] tracking-widest text-[#cc1133]/70">
              [ LOADOUT.MOD ]
            </span>
            <span className="block h-px flex-1 max-w-[120px] bg-gradient-to-r from-[#cc1133]/40 to-transparent" />
          </div>
          <h1
            className="font-pixel text-[#cc1133] tracking-widest"
            style={{
              fontSize: 'clamp(20px, 3.6vw, 36px)',
              textShadow: '0 0 18px rgba(204,17,51,0.55), 0 0 36px rgba(204,17,51,0.25)',
            }}
          >
            EQUIPPED GEAR
          </h1>
          <p className="mt-2 text-[11px] md:text-[12px] tracking-[0.22em] text-[#7a6068] max-w-[640px]">
            Tools I keep slotted for daily work. Filter by category — no filler, no badges for the sake of badges.
          </p>
        </header>

        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {FILTERS.map(f => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="px-3 py-1.5 font-pixel text-[9px] tracking-[0.18em] transition-all"
                style={{
                  border: `1px solid ${active ? '#cc1133' : 'rgba(122,96,104,0.45)'}`,
                  color: active ? '#cc1133' : '#7a6068',
                  background: active ? 'rgba(204,17,51,0.08)' : 'transparent',
                  boxShadow: active ? '0 0 10px rgba(204,17,51,0.4)' : 'none',
                }}
              >
                {f.label}
              </button>
            );
          })}

          <span className="ml-auto font-pixel text-[9px] tracking-widest text-[#7a6068]">
            {String(visible.length).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')} ACTIVE
          </span>
        </div>

        {/* Grid */}
        {filter === 'all' ? (
          <div className="flex flex-col">
            {groups.map(group => {
              const meta = SECTION_META[group.category];
              return (
                <div key={group.category} className="flex flex-col">
                  {/* Section header */}
                  <div className="flex items-center gap-3 mt-6 mb-3">
                    <span
                      className="font-pixel"
                      style={{ fontSize: '10px', color: '#cc1133' }}
                    >
                      ◆
                    </span>
                    <span
                      className="font-pixel uppercase font-bold"
                      style={{ fontSize: '10px', color: '#cc1133', letterSpacing: '0.3em' }}
                    >
                      {meta.label}
                    </span>
                    <span
                      className="font-pixel"
                      style={{ fontSize: '9px', color: '#7a6068' }}
                    >
                      {meta.comment}
                    </span>
                    <span
                      className="block h-px flex-1"
                      style={{
                        background: 'linear-gradient(to right, rgba(204,17,51,0.3), transparent)',
                      }}
                    />
                  </div>

                  <motion.div
                    layout
                    className="grid gap-3"
                    style={{
                      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    }}
                  >
                    {group.items.map((item, idx) => (
                      <ItemCard key={item.name} item={item} idx={idx} />
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            }}
          >
            {visible.map((item, idx) => (
              <ItemCard key={item.name} item={item} idx={idx} />
            ))}
          </motion.div>
        )}

        {/* Footer nav */}
        <div className="mt-auto pt-10 flex items-center justify-between gap-3">
          <FooterNav label="PREV" icon="◀" onClick={() => onNavigate('projects')} side="left" />
          <span className="font-pixel text-[8px] tracking-widest text-[#7a6068]">
            [ LOADOUT v1.0 ]
          </span>
          <FooterNav label="NEXT" icon="▶" onClick={() => onNavigate('contact')} side="right" />
        </div>
      </div>
    </section>
  );
}

function ItemCard({ item, idx }: { item: Item; idx: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.02, duration: 0.25 }}
      className="group relative flex flex-row"
      style={{
        height: '72px',
        background: 'rgba(13,4,8,0.75)',
        border: '1px solid rgba(61,15,26,0.9)',
        clipPath:
          'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(204,17,51,0.6)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(204,17,51,0.12)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(61,15,26,0.9)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Corner accents on hover (border-only) */}
      <span
        className="absolute top-0 left-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderTop: '2px solid #cc1133', borderLeft: '2px solid #cc1133' }}
      />
      <span
        className="absolute top-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderTop: '2px solid #cc1133', borderRight: '2px solid #cc1133' }}
      />
      <span
        className="absolute bottom-0 left-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderBottom: '2px solid #cc1133', borderLeft: '2px solid #cc1133' }}
      />
      <span
        className="absolute bottom-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderBottom: '2px solid #cc1133', borderRight: '2px solid #cc1133' }}
      />

      {/* Left block */}
      <div
        className="flex flex-col justify-center pl-3 py-3"
        style={{ width: '45%', gap: '2px' }}
      >
        <span
          className="font-pixel leading-none"
          style={{
            fontSize: '22px',
            color: '#cc1133',
            textShadow: '0 0 8px rgba(204,17,51,0.5)',
          }}
        >
          {item.short}
        </span>
        <span
          className="font-pixel tracking-wider truncate"
          style={{ fontSize: '10px', color: '#e8d8dc' }}
          title={item.name}
        >
          {item.name}
        </span>
        <div className="flex items-center justify-between mt-0.5">
          <span
            className="font-pixel tracking-widest"
            style={{ fontSize: '8px', color: '#7a6068' }}
          >
            {item.mark} {item.years}
          </span>
          <span
            className="font-pixel px-1"
            style={{
              fontSize: '7px',
              color: '#7a6068',
              border: '1px solid rgba(122,96,104,0.35)',
            }}
          >
            {CAT_LABEL[item.category]}
          </span>
        </div>
      </div>

      {/* Right block */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '32px',
            opacity: 0.12,
            color: '#cc1133',
            filter: 'sepia(1) saturate(5) hue-rotate(310deg)',
            userSelect: 'none',
          }}
        >
          {item.icon}
        </span>
        <span
          className="absolute left-0 top-2 bottom-2"
          style={{ width: '1px', background: 'rgba(204,17,51,0.2)' }}
        />
      </div>
    </motion.div>
  );
}

function FooterNav({ label, icon, onClick, side }: { label: string; icon: string; onClick: () => void; side: 'left' | 'right' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: side === 'left' ? -3 : 3 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 font-pixel text-[9px] tracking-widest transition-colors"
      style={{ border: '1px solid rgba(61,15,26,0.8)', color: '#7a6068' }}
    >
      {side === 'left' && <span style={{ color: '#cc1133' }}>{icon}</span>}
      <span>{label}</span>
      {side === 'right' && <span style={{ color: '#cc1133' }}>{icon}</span>}
    </motion.button>
  );
}
