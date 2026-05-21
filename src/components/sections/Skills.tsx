import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PixelGrid } from '../ui/PixelGrid';

const skillCategories = [
  {
    name: 'FRONTEND ARSENAL',
    icon: '/assets/icon-kai-pedang.png',
    skills: [
      { name: 'React / Next.js', level: 90, color: '#61dafb' },
      { name: 'TypeScript', level: 85, color: '#3178c6' },
      { name: 'Tailwind CSS', level: 92, color: '#38bdf8' },
      { name: 'Framer Motion', level: 80, color: '#ff2055' },
      { name: 'Three.js / WebGL', level: 62, color: '#ff6900' },
    ],
  },
  {
    name: 'TOOLS & MAGIC',
    icon: '/assets/icon-kai-shild.png',
    skills: [
      { name: 'Vite / Webpack', level: 82, color: '#646cff' },
      { name: 'Git / GitHub', level: 88, color: '#f05032' },
      { name: 'Figma', level: 75, color: '#ff7262' },
      { name: 'Node.js', level: 70, color: '#68a063' },
      { name: 'Supabase / Firebase', level: 68, color: '#3ecf8e' },
    ],
  },
  {
    name: 'CONTENT CREATION',
    icon: '/assets/icon-kai-love.png',
    skills: [
      { name: 'Video Editing', level: 78, color: '#cc1133' },
      { name: 'Motion Design', level: 72, color: '#ff6b9d' },
      { name: 'Copywriting', level: 80, color: '#ffd700' },
      { name: 'Community Mgmt', level: 85, color: '#9c27b0' },
      { name: 'Brand Identity', level: 70, color: '#ff9800' },
    ],
  },
];

const techBadges = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Vite', 'Framer Motion',
  'Node.js', 'Git', 'Figma', 'Three.js', 'Supabase', 'GSAP', 'Sass', 'Redux'];

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="relative py-24 overflow-hidden">
      <PixelGrid />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-kai-red opacity-40" />
            <span className="font-pixel text-[9px] text-kai-red tracking-widest">[ INVENTOR ]</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-kai-red opacity-40" />
          </div>
          <h2 className="font-pixel text-xl text-white" style={{ textShadow: '0 0 20px rgba(204,17,51,0.4)' }}>
            SKILL TREE
          </h2>
        </motion.div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.12 }}
              className="pixel-border hud-panel p-4 hover:border-kai-red/60 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-kai-border">
                <img
                  src={cat.icon}
                  alt=""
                  className="w-5 h-5 object-contain group-hover:drop-shadow-glow-red transition-all"
                  style={{ imageRendering: 'pixelated' }}
                />
                <span className="font-pixel text-[8px] text-kai-red tracking-wider">{cat.name}</span>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-mono text-xs text-kai-text">{skill.name}</span>
                      <span className="font-pixel text-[8px]" style={{ color: skill.color }}>{skill.level}</span>
                    </div>
                    <div className="h-1.5 bg-kai-border rounded-sm overflow-hidden">
                      <motion.div
                        className="h-full rounded-sm"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, delay: 0.3 + ci * 0.1 + si * 0.08, ease: 'easeOut' }}
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}55, ${skill.color})`,
                          boxShadow: `0 0 6px ${skill.color}66`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {techBadges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
              whileHover={{ scale: 1.1, color: '#ff1144' }}
              className="font-pixel text-[8px] text-kai-muted border border-kai-border px-3 py-1.5 cursor-default hover:border-kai-red hover:text-kai-red transition-colors"
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
