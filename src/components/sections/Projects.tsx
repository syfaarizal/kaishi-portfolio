import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PixelGrid } from '../ui/PixelGrid';

interface Project {
  id: number;
  title: string;
  type: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'PLANNING';
  difficulty: number;
  reward: string;
  tags: string[];
  description: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Anime Tracker Pro',
    type: 'WEB APP',
    status: 'COMPLETED',
    difficulty: 4,
    reward: '2000 XP',
    tags: ['React', 'TypeScript', 'Supabase'],
    description: 'A full-stack anime tracking app with custom list management, review system, and social features.',
    color: '#cc1133',
  },
  {
    id: 2,
    title: 'CyberDash UI Kit',
    type: 'DESIGN SYSTEM',
    status: 'COMPLETED',
    difficulty: 3,
    reward: '1500 XP',
    tags: ['Tailwind', 'Figma', 'Storybook'],
    description: 'A cyberpunk-themed UI component library with 50+ components ready for production use.',
    color: '#9c27b0',
  },
  {
    id: 3,
    title: 'NekoStream',
    type: 'PLATFORM',
    status: 'IN PROGRESS',
    difficulty: 5,
    reward: '5000 XP',
    tags: ['Next.js', 'WebRTC', 'Node.js'],
    description: 'A live streaming platform built for anime content creators with low-latency tech stack.',
    color: '#ff6900',
  },
  {
    id: 4,
    title: 'Portfolio v3',
    type: 'WEBSITE',
    status: 'COMPLETED',
    difficulty: 4,
    reward: '1800 XP',
    tags: ['React', 'Framer Motion', 'TypeScript'],
    description: 'This very portfolio — cyberpunk-themed, pixel-art infused, and fully immersive.',
    color: '#cc1133',
  },
  {
    id: 5,
    title: 'WorldBuilder RPG',
    type: 'GAME',
    status: 'PLANNING',
    difficulty: 5,
    reward: '???',
    tags: ['Three.js', 'WebGL', 'GSAP'],
    description: 'A browser-based RPG world builder with procedural terrain generation.',
    color: '#3ecf8e',
  },
  {
    id: 6,
    title: 'AniBot Discord',
    type: 'BOT',
    status: 'COMPLETED',
    difficulty: 2,
    reward: '800 XP',
    tags: ['Node.js', 'Discord.js', 'APIs'],
    description: 'A feature-rich Discord bot for anime communities with recommendations and polls.',
    color: '#7289da',
  },
];

const statusColor: Record<string, string> = {
  COMPLETED: '#22c55e',
  'IN PROGRESS': '#f59e0b',
  PLANNING: '#6b7280',
};

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-24 overflow-hidden">
      <PixelGrid />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-kai-red opacity-40" />
            <span className="font-pixel text-[9px] text-kai-red tracking-widest">[ QUEST BOARD ]</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-kai-red opacity-40" />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-pixel text-xl text-white" style={{ textShadow: '0 0 20px rgba(204,17,51,0.4)' }}>
              COMPLETED &amp; ACTIVE QUESTS
            </h2>
            <span className="font-pixel text-[8px] text-kai-muted border border-kai-border px-3 py-1">
              {projects.filter(p => p.status === 'COMPLETED').length} / {projects.length} DONE
            </span>
          </div>
        </motion.div>

        {/* Quest grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => setSelected(project)}
              className="pixel-border hud-panel p-4 cursor-pointer group transition-all hover:border-kai-red/60"
              style={{ borderColor: `${project.color}33` }}
            >
              {/* Quest header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-pixel text-[8px] text-kai-muted mb-1">{project.type}</div>
                  <h3 className="font-display font-bold text-base text-kai-text group-hover:text-kai-red transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div
                  className="font-pixel text-[7px] px-2 py-1 border"
                  style={{ color: statusColor[project.status], borderColor: `${statusColor[project.status]}44` }}
                >
                  {project.status}
                </div>
              </div>

              {/* Difficulty stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span
                    key={si}
                    className="text-xs"
                    style={{ color: si < project.difficulty ? project.color : '#3d0f1a' }}
                  >
                    ◆
                  </span>
                ))}
              </div>

              <p className="font-display text-sm text-kai-muted leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-pixel text-[7px] px-2 py-0.5 border border-kai-border text-kai-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Reward */}
              <div className="flex items-center justify-between border-t border-kai-border pt-3">
                <span className="font-pixel text-[7px] text-kai-muted">REWARD</span>
                <span className="font-pixel text-[9px]" style={{ color: project.color }}>
                  +{project.reward}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quest detail modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-6"
              style={{ background: 'rgba(0,0,0,0.8)' }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 20 }}
                className="pixel-border hud-panel max-w-md w-full p-6"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-pixel text-[7px] text-kai-muted">{selected.type}</span>
                </div>
                <h3 className="font-pixel text-sm text-kai-red mb-4">{selected.title}</h3>
                <p className="font-display text-sm text-kai-text/80 leading-relaxed mb-4">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.tags.map(t => (
                    <span key={t} className="font-pixel text-[7px] border border-kai-border px-2 py-1 text-kai-muted">{t}</span>
                  ))}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="font-pixel text-[8px] text-kai-muted hover:text-kai-red transition-colors"
                >
                  [ CLOSE ]
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
