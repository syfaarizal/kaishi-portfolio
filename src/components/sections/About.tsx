import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HUDFrame } from '../ui/HUDFrame';
import { PixelGrid } from '../ui/PixelGrid';

const stats = [
  { label: 'PROJECTS COMPLETED', value: '24+', icon: '/assets/icon-kai-pedang.png' },
  { label: 'YEARS EXPERIENCE', value: '3+', icon: '/assets/icon-kai-shild.png' },
  { label: 'CLIENTS SERVED', value: '15+', icon: '/assets/icon-kai-love.png' },
  { label: 'CUPS OF COFFEE', value: '∞', icon: '/assets/icon-kai-console.png' },
];

const attributes = [
  { name: 'CREATIVITY', val: 92 },
  { name: 'CODING', val: 85 },
  { name: 'DESIGN EYE', val: 78 },
  { name: 'PROBLEM SOLVING', val: 88 },
  { name: 'COMMUNICATION', val: 80 },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden">
      <PixelGrid />

      {/* Section header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-kai-red opacity-40" />
          <span className="font-pixel text-[9px] text-kai-red tracking-widest">[ PROFILE ]</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-kai-red opacity-40" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left – story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <HUDFrame title="CHARACTER INFO">
              <div className="space-y-4 font-display text-kai-text/80 leading-relaxed text-base">
                <p>
                  <span className="text-kai-red font-mono">&gt; </span>
                  Hi! I'm <span className="text-kai-crimson font-bold">Kai Shi</span> — a frontend builder
                  who believes the web should feel like a living, breathing world.
                </p>
                <p>
                  <span className="text-kai-red font-mono">&gt; </span>
                  Armed with React, TypeScript, and an unhealthy obsession with pixel-perfect UIs,
                  I craft digital experiences that make people go <span className="text-kai-red">"woah."</span>
                </p>
                <p>
                  <span className="text-kai-red font-mono">&gt; </span>
                  When I'm not coding, you'll find me consuming anime at dangerous speeds,
                  creating content, or theorizing why cyberpunk aesthetics are the peak of design.
                </p>
              </div>
            </HUDFrame>

            {/* Stat boxes */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="pixel-border hud-panel p-3 text-center group hover:border-kai-red transition-colors duration-200"
                >
                  <img
                    src={stat.icon}
                    alt=""
                    className="w-6 h-6 object-contain mx-auto mb-1 group-hover:drop-shadow-glow-red transition-all"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="font-pixel text-lg text-kai-red text-glow">{stat.value}</div>
                  <div className="font-pixel text-[7px] text-kai-muted leading-tight mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – attributes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <HUDFrame title="ATTRIBUTES">
              <div className="space-y-5">
                {attributes.map((attr, i) => (
                  <motion.div
                    key={attr.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-pixel text-[9px] text-kai-text">{attr.name}</span>
                      <span className="font-pixel text-[9px] text-kai-red">{attr.val}</span>
                    </div>
                    <div className="h-2 bg-kai-border rounded-sm overflow-hidden">
                      <motion.div
                        className="h-full rounded-sm"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${attr.val}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: 'easeOut' }}
                        style={{
                          background: `linear-gradient(90deg, #8b0022, #cc1133, #ff2255)`,
                          boxShadow: '0 0 8px rgba(204,17,51,0.6)',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </HUDFrame>

            {/* Terminal-ish block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-4 border border-kai-border bg-kai-panel/60 p-4 font-mono text-xs"
            >
              <div className="text-kai-red mb-2">$ cat kai.profile</div>
              <div className="text-kai-muted space-y-1">
                <div><span className="text-kai-text">name:</span> Kai Shi</div>
                <div><span className="text-kai-text">class:</span> Frontend Developer</div>
                <div><span className="text-kai-text">guild:</span> Code &amp; Create</div>
                <div><span className="text-kai-text">status:</span> <span className="text-green-400">● Available for work</span></div>
                <div><span className="text-kai-text">power:</span> React / TS / Animation</div>
              </div>
              <div className="mt-2 text-kai-red animate-blink">_</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
