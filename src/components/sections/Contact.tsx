import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PixelGrid } from '../ui/PixelGrid';

const socials = [
  { label: 'GITHUB', handle: '@kaishi' },
  { label: 'TWITTER / X', handle: '@kaishi_dev' },
  { label: 'YOUTUBE', handle: 'Kai Shi' },
  { label: 'DISCORD', handle: 'kaishi#0001' },
];

const socialIcons: Record<string, string> = {
  GITHUB: '</>',
  'TWITTER / X': '✕',
  YOUTUBE: '▶',
  DISCORD: '🎮',
};

function CornerAccents({ color = '#cc1133' }: { color?: string }) {
  return (
    <>
      <div className="absolute left-[-1px] top-[-1px] h-3 w-3 border-l-2 border-t-2" style={{ borderColor: color }} />
      <div className="absolute right-[-1px] top-[-1px] h-3 w-3 border-r-2 border-t-2" style={{ borderColor: color }} />
      <div className="absolute bottom-[-1px] left-[-1px] h-3 w-3 border-b-2 border-l-2" style={{ borderColor: color }} />
      <div className="absolute bottom-[-1px] right-[-1px] h-3 w-3 border-b-2 border-r-2" style={{ borderColor: color }} />
    </>
  );
}

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
    <section id="contact" ref={ref} className="relative min-h-screen overflow-hidden py-24">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/assets/portal-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: 'rgba(4,1,8,0.72)', zIndex: 1 }} />
      <div className="relative z-[2]">
        <PixelGrid />
      </div>

      <div className="absolute left-4 top-4 z-[3] hidden sm:block">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#cc1133]" style={{ boxShadow: '0 0 10px #cc1133' }} />
          <span className="font-pixel text-[7px] text-[#cc1133]">SYSTEM ONLINE</span>
        </div>
        <div className="whitespace-pre-line font-mono text-[6px] leading-3 text-[#cc1133]/40">
          scan data{'\n'}0x4A 19 FF{'\n'}RX 0017-A{'\n'}SYS 93.12%
        </div>
      </div>

      <div className="absolute right-4 top-4 z-[3] hidden text-right sm:block">
        <div className="font-pixel text-[7px] text-[#cc1133]">✦ KAISHI PORTAL V1.0 ✦</div>
        <div className="mt-2 h-px w-full bg-[#cc1133]/30" />
      </div>

      <div className="absolute bottom-4 left-4 z-[3] hidden font-pixel text-[7px] text-[#cc1133]/50 sm:block">
        SECURE CONNECTION ESTABLISHED
      </div>

      <div className="absolute bottom-4 right-4 z-[3] hidden items-center gap-2 sm:flex">
        <div className="inline-flex items-center gap-0.5">
          <span className="h-1.5 w-3 bg-[#cc1133]" />
          <span className="h-1.5 w-3 bg-[#cc1133]" />
          <span className="h-1.5 w-3 bg-[#cc1133]/70" />
          <span className="h-1.5 w-3 bg-[#cc1133]/30" />
          <span className="h-1.5 w-3 bg-[#cc1133]/30" />
        </div>
        <span className="font-pixel text-[7px] text-[#cc1133]">STATUS: READY</span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 font-pixel text-[8px] tracking-widest text-[#cc1133]/70">// PORTAL //</div>
          <h2
            className="flex flex-wrap items-center justify-center gap-3 font-pixel leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            <span className="text-[#e8e0e3]">INITIATE</span>
            <span className="text-[#cc1133]" style={{ textShadow: '0 0 20px #cc1133, 0 0 40px #cc113366' }}>
              CONNECTION
            </span>
          </h2>
          <div className="mt-5 text-center font-mono text-[13px] tracking-widest text-[#cc1133]/60">
            {'>>> 接続を開始する <<<'}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="relative border-[1.5px] border-[#cc1133] bg-[rgba(8,4,12,0.85)]"
              style={{ boxShadow: '0 0 30px rgba(204,17,51,0.25), inset 0 0 20px rgba(204,17,51,0.04)' }}
            >
              <CornerAccents />
              <div className="flex items-center gap-3 border-b border-[#cc1133]/30 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center border border-[#cc1133] bg-[#cc1133]/20 text-[#cc1133]">
                  💬
                </div>
                <span className="font-pixel text-[9px] text-[#cc1133]/60">&gt;&gt;</span>
                <span className="font-pixel text-[10px] text-[#cc1133]" style={{ textShadow: '0 0 10px rgba(204,17,51,0.7)' }}>
                  SEND MESSAGE
                </span>
                <span className="ml-auto font-mono text-[8px] text-[#cc1133]/20">/ / / / /</span>
              </div>

              <div className="p-5">
                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                    <img
                      src="/assets/icon-kai-love.png"
                      alt=""
                      className="mx-auto h-12 w-12 object-contain"
                      style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 10px #cc1133)' }}
                    />
                    <div className="mt-3 font-pixel text-[9px] text-[#cc1133]" style={{ textShadow: '0 0 10px rgba(204,17,51,0.8)' }}>
                      MESSAGE SENT!
                    </div>
                    <div className="mt-3 font-mono text-xs text-[#7a6068]">I'll get back to you ASAP.</div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { id: 'name', label: 'PLAYER NAME', placeholder: 'Enter your name...', icon: '👤' },
                      { id: 'email', label: 'EMAIL ADDRESS', placeholder: 'your@email.com', icon: '✉' },
                    ].map(field => (
                      <div key={field.id}>
                        <label className="mb-1.5 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 bg-[#cc1133]" />
                          <span className="font-pixel text-[8px] tracking-widest text-[#cc1133]">{field.label}</span>
                        </label>
                        <div className="relative">
                          <input
                            type={field.id === 'email' ? 'email' : 'text'}
                            value={form[field.id as keyof typeof form]}
                            onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="w-full border border-[rgba(204,17,51,0.25)] bg-[rgba(15,5,10,0.7)] px-3 py-2 pr-9 font-mono text-xs text-[#e8e0e3] placeholder-[#7a6068] outline-none transition-all focus:border-[#cc1133] focus:shadow-[0_0_10px_rgba(204,17,51,0.2)]"
                            required
                          />
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#cc1133] opacity-30">
                            {field.icon}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className="mb-1.5 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[#cc1133]" />
                        <span className="font-pixel text-[8px] tracking-widest text-[#cc1133]">MESSAGE</span>
                      </label>
                      <div className="relative">
                        <textarea
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          placeholder="What's your quest?..."
                          rows={4}
                          className="w-full resize-none border border-[rgba(204,17,51,0.25)] bg-[rgba(15,5,10,0.7)] px-3 py-2 pr-9 font-mono text-xs text-[#e8e0e3] placeholder-[#7a6068] outline-none transition-all focus:border-[#cc1133] focus:shadow-[0_0_10px_rgba(204,17,51,0.2)]"
                          required
                        />
                        <span className="pointer-events-none absolute bottom-3 right-3 text-[#cc1133] opacity-30">✏</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden py-3.5 font-pixel text-[9px] tracking-widest text-white transition-all hover:brightness-[1.15]"
                      style={{
                        background: 'linear-gradient(135deg, #cc1133, #ff1144)',
                        boxShadow: '0 0 20px rgba(204,17,51,0.5), 0 4px 15px rgba(204,17,51,0.3)',
                      }}
                    >
                      <span className="relative z-10">&gt; TRANSMIT MESSAGE &lt;</span>
                      <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <div
              className="relative border-[1.5px] border-[#cc1133] bg-[rgba(8,4,12,0.85)]"
              style={{ boxShadow: '0 0 30px rgba(204,17,51,0.25), inset 0 0 20px rgba(204,17,51,0.04)' }}
            >
              <CornerAccents />
              <div className="flex items-center justify-between border-b border-[#cc1133]/30 px-4 py-3">
                <span className="font-pixel text-[10px] text-[#cc1133]/80">// SOCIAL LINKS</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#cc1133]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#cc1133]" />
                </span>
              </div>

              <div className="space-y-3 p-5">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href="#"
                    initial={{ opacity: 0, x: 15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-4 border border-[rgba(204,17,51,0.15)] bg-[rgba(204,17,51,0.04)] px-4 py-3.5 transition-colors hover:border-[#cc1133]/60 hover:bg-[rgba(204,17,51,0.08)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[#cc1133] bg-[#cc1133]/15 font-mono text-[13px] text-[#cc1133]">
                      {socialIcons[s.label]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-pixel text-[9px] tracking-wider text-[#cc1133]">{s.label}</span>
                      <span className="mt-1 block truncate font-mono text-[13px] text-[#e8e0e3]">{s.handle}</span>
                    </span>
                    <span className="font-pixel text-[10px] text-[#cc1133]">›</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative flex items-center gap-4 border-[1.5px] border-[#00b4b4] bg-[rgba(0,20,20,0.8)] px-5 py-4"
              style={{ boxShadow: '0 0 20px rgba(0,180,180,0.15)' }}
            >
              <CornerAccents color="#00b4b4" />
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#00b4b4] bg-[rgba(0,180,180,0.1)]">
                <span className="h-4 w-4 animate-pulse rounded-full bg-[#00b4b4]" style={{ boxShadow: '0 0 10px #00b4b4' }} />
              </div>
              <div className="min-w-0 pr-8">
                <div className="font-pixel text-[9px] tracking-widest text-[#00b4b4]" style={{ textShadow: '0 0 10px #00b4b480' }}>
                  AVAILABLE FOR QUESTS
                </div>
                <div className="mt-1 font-mono text-[12px] text-[#7a6068]">Open for freelance &amp; collaboration</div>
              </div>
              <div className="absolute right-4 text-2xl leading-none text-[#00b4b4]/30">▶</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
