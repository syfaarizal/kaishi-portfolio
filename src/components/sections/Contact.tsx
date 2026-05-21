import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PixelGrid } from '../ui/PixelGrid';
import { HUDFrame } from '../ui/HUDFrame';

const socials = [
  { label: 'GITHUB', handle: '@kaishi', icon: '/assets/icon-kai-pedang.png', color: '#f5f5f5' },
  { label: 'TWITTER / X', handle: '@kaishi_dev', icon: '/assets/icon-kai-console.png', color: '#1da1f2' },
  { label: 'YOUTUBE', handle: 'Kai Shi', icon: '/assets/icon-kai-love.png', color: '#ff0000' },
  { label: 'DISCORD', handle: 'kaishi#0001', icon: '/assets/icon-kai-cat1.png', color: '#7289da' },
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 overflow-hidden">
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
            <span className="font-pixel text-[9px] text-kai-red tracking-widest">[ PORTAL ]</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-kai-red opacity-40" />
          </div>
          <h2 className="font-pixel text-xl text-white" style={{ textShadow: '0 0 20px rgba(204,17,51,0.4)' }}>
            INITIATE CONNECTION
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left – form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <HUDFrame title="SEND MESSAGE">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-3"
                >
                  <img src="/assets/icon-kai-love.png" alt="" className="w-12 h-12 object-contain mx-auto" style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 10px #cc1133)' }} />
                  <div className="font-pixel text-[9px] text-kai-red text-glow">MESSAGE SENT!</div>
                  <div className="font-mono text-xs text-kai-muted">I'll get back to you ASAP.</div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: 'name', label: 'PLAYER NAME', placeholder: 'Enter your name...' },
                    { id: 'email', label: 'EMAIL ADDRESS', placeholder: 'your@email.com' },
                  ].map(field => (
                    <div key={field.id} className="space-y-1">
                      <label className="font-pixel text-[8px] text-kai-muted block">{field.label}</label>
                      <input
                        type={field.id === 'email' ? 'email' : 'text'}
                        value={form[field.id as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full bg-kai-bg border border-kai-border px-3 py-2 font-mono text-xs text-kai-text placeholder-kai-muted focus:border-kai-red focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  ))}
                  <div className="space-y-1">
                    <label className="font-pixel text-[8px] text-kai-muted block">MESSAGE</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="What's your quest?..."
                      rows={4}
                      className="w-full bg-kai-bg border border-kai-border px-3 py-2 font-mono text-xs text-kai-text placeholder-kai-muted focus:border-kai-red focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-kai-red hover:bg-kai-crimson font-pixel text-[9px] text-white tracking-widest transition-all group overflow-hidden relative"
                    style={{ boxShadow: '0 0 15px rgba(204,17,51,0.3)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                  >
                    <span>TRANSMIT MESSAGE</span>
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </button>
                </form>
              )}
            </HUDFrame>
          </motion.div>

          {/* Right – socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <HUDFrame title="SOCIAL LINKS">
              <div className="space-y-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href="#"
                    initial={{ opacity: 0, x: 15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 border border-kai-border hover:border-kai-red/60 transition-colors group"
                  >
                    <img
                      src={s.icon}
                      alt=""
                      className="w-6 h-6 object-contain group-hover:drop-shadow-glow-red transition-all"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div className="flex-1">
                      <div className="font-pixel text-[7px] text-kai-muted">{s.label}</div>
                      <div className="font-mono text-xs text-kai-text group-hover:text-kai-red transition-colors">{s.handle}</div>
                    </div>
                    <span className="font-pixel text-[8px] text-kai-muted group-hover:text-kai-red transition-colors">&gt;</span>
                  </motion.a>
                ))}
              </div>
            </HUDFrame>

            {/* Availability panel */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pixel-border hud-panel p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: '0 0 8px #22c55e' }} />
                <div>
                  <div className="font-pixel text-[9px] text-green-400">OPEN FOR QUESTS</div>
                  <div className="font-mono text-xs text-kai-muted mt-0.5">Available for freelance & collab</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
