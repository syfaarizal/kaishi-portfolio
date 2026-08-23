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
}

const ITEMS: Item[] = [
  // Languages
  { name: 'TypeScript',  short: 'TS',  category: 'language', mark: '◆', years: '4y' },
  { name: 'JavaScript',  short: 'JS',  category: 'language', mark: '◆', years: '6y' },
  { name: 'Python',      short: 'PY',  category: 'language', mark: '◆', years: '3y' },
  { name: 'Go',          short: 'GO',  category: 'language', mark: '◆', years: '1y' },
  { name: 'Rust',        short: 'RS',  category: 'language', mark: '◆', years: '1y' },

  // Frameworks / runtimes
  { name: 'React',       short: 'RE',  category: 'framework', mark: '◇', years: '4y' },
  { name: 'Next.js',     short: 'NX',  category: 'framework', mark: '◇', years: '2y' },
  { name: 'Node.js',     short: 'ND',  category: 'framework', mark: '◇', years: '4y' },
  { name: 'Express',     short: 'EX',  category: 'framework', mark: '◇', years: '3y' },
  { name: 'FastAPI',     short: 'FA',  category: 'framework', mark: '◇', years: '2y' },
  { name: 'Tailwind',    short: 'TW',  category: 'framework', mark: '◇', years: '3y' },

  // Tools
  { name: 'Git',         short: 'GT',  category: 'tool', mark: '◈', years: '5y' },
  { name: 'Docker',      short: 'DK',  category: 'tool', mark: '◈', years: '2y' },
  { name: 'PostgreSQL',  short: 'PG',  category: 'tool', mark: '◈', years: '3y' },
  { name: 'MongoDB',     short: 'MG',  category: 'tool', mark: '◈', years: '2y' },
  { name: 'Vite',        short: 'VT',  category: 'tool', mark: '◈', years: '2y' },
  { name: 'Figma',       short: 'FG',  category: 'tool', mark: '◈', years: '3y' },
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

interface LoadoutProps { onNavigate: (id: SectionId) => void; }

export function Loadout({ onNavigate }: LoadoutProps) {
  const [filter, setFilter] = useState<Category>('all');

  const visible = filter === 'all' ? ITEMS : ITEMS.filter(i => i.category === filter);

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: '#07020a' }}>
      <PixelGrid />

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
        <motion.div
          layout
          className="grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          }}
        >
          {visible.map((item, idx) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02, duration: 0.25 }}
              className="group relative p-3"
              style={{
                background: 'rgba(13,4,8,0.65)',
                border: '1px solid rgba(61,15,26,0.8)',
                clipPath: 'polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)',
              }}
            >
              {/* Corner accent on hover */}
              <span
                className="absolute top-0 left-0 w-[6px] h-[6px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: '#cc1133', boxShadow: '0 0 6px #cc1133' }}
              />

              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className="font-pixel text-[14px] text-[#cc1133] leading-none"
                  style={{ textShadow: '0 0 8px rgba(204,17,51,0.5)' }}
                >
                  {item.short}
                </span>
                <span
                  className="font-pixel text-[7px] tracking-widest px-1.5 py-0.5"
                  style={{
                    color: '#7a6068',
                    border: '1px solid rgba(122,96,104,0.35)',
                  }}
                >
                  {CAT_LABEL[item.category]}
                </span>
              </div>

              <div
                className="font-pixel text-[10px] tracking-wider text-[#e8d8dc] mb-1 truncate"
                title={item.name}
              >
                {item.name}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-pixel text-[8px] tracking-widest text-[#7a6068]">
                  {item.mark} {item.years}
                </span>
                <span
                  className="block w-1.5 h-1.5"
                  style={{
                    background: '#cc1133',
                    boxShadow: '0 0 6px #cc1133',
                    transform: 'rotate(45deg)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

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