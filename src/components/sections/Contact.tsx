import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PixelGrid } from '../ui/PixelGrid';

const socials = [
  { label: 'GITHUB', handle: '@syfaarizal/kaishi-portfolio', href: 'https://github.com/syfaarizal/kaishi-portfolio' },
  { label: 'TWITTER / X', handle: '@kaishiscd', href: 'https://twitter.com/kaishiscd' },
  { label: 'INSTAGRAM', handle: '@kaishiscd', href: 'https://instagram.com/kaishiscd' },
  { label: 'TIKTOK', handle: '@kaishiscd', href: 'https://tiktok.com/@kaishiscd' },
  { label: 'YOUTUBE', handle: '@kaishiscd', href: 'https://youtube.com/@kaishiscd' },
  { label: 'JOIN DISCORD SERVER', handle: 'discord.gg/84NbEnYNdN', href: 'https://discord.gg/84NbEnYNdN' },
];

type IconName =
  | 'spark'
  | 'message'
  | 'user'
  | 'email'
  | 'pencil'
  | 'github'
  | 'x'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'discord'
  | 'chevron'
  | 'play'
  | 'success';

const socialIcons: Record<string, IconName> = {
  GITHUB: 'github',
  'TWITTER / X': 'x',
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  'JOIN DISCORD SERVER': 'discord',
};

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  const brand = {
    className,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
  };

  switch (name) {
    case 'spark':
      return (
        <svg {...common}>
          <path d="M12 3v5" />
          <path d="M12 16v5" />
          <path d="M3 12h5" />
          <path d="M16 12h5" />
          <path d="m6.8 6.8 2.1 2.1" />
          <path d="m15.1 15.1 2.1 2.1" />
          <path d="m17.2 6.8-2.1 2.1" />
          <path d="m8.9 15.1-2.1 2.1" />
        </svg>
      );
    case 'message':
      return (
        <svg {...common}>
          <path d="M5 6.5h14v9H9l-4 3v-12Z" />
          <path d="M8 9.5h8" />
          <path d="M8 12.5h5" />
        </svg>
      );
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 19c.9-3.2 3.1-4.8 6.5-4.8s5.6 1.6 6.5 4.8" />
        </svg>
      );
    case 'email':
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="12" rx="1.5" />
          <path d="m5 7 7 6 7-6" />
        </svg>
      );
    case 'pencil':
      return (
        <svg {...common}>
          <path d="m5 18 1.2-4.3L16.8 3.1l4.1 4.1L10.3 17.8 6 19l-1-1Z" />
          <path d="m14.5 5.5 4 4" />
        </svg>
      );
    case 'github':
      return (
        <svg {...brand}>
          <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.207 11.387.6.113.82-.258.82-.578 0-.285-.011-1.04-.016-2.04-3.34.727-4.043-1.61-4.043-1.61-.547-1.387-1.336-1.758-1.336-1.758-1.09-.746.082-.73.082-.73 1.207.086 1.844 1.238 1.844 1.238 1.07 1.836 2.809 1.305 3.492.997.11-.778.418-1.305.762-1.606-2.664-.3-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.238-3.223-.125-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3-.403c1.02.004 2.047.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.656 1.653.246 2.873.121 3.176.77.84 1.235 1.91 1.235 3.222 0 4.61-2.805 5.625-5.477 5.922.43.371.813 1.102.813 2.219 0 1.601-.016 2.89-.016 3.281 0 .32.215.696.825.578C20.565 22.092 24 17.596 24 12.297c0-6.627-5.373-12-12-12Z" />
        </svg>
      );
    case 'x':
      return (
        <svg {...brand}>
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.293 19.493h2.039L6.486 3.241H4.298l13.31 17.405Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...brand}>
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...brand}>
          <path d="M16.6 5.82a5.17 5.17 0 0 0 3.02 1.01v3.32a8.43 8.43 0 0 1-3.02-.57v5.72a6.17 6.17 0 1 1-5.37-6.12v3.37a2.87 2.87 0 1 0 2.03 2.75V2h3.34v3.82Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...brand}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.376-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
        </svg>
      );
    case 'discord':
      return (
        <svg {...brand}>
          <path d="M20.317 4.369A19.791 19.791 0 0 0 15.558 2.9a13.87 13.87 0 0 0-.61 1.25 18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25 19.736 19.736 0 0 0-4.762 1.47C1.066 8.902.244 13.322.651 17.68a19.9 19.9 0 0 0 5.84 2.967 14.77 14.77 0 0 0 1.251-2.03 12.93 12.93 0 0 1-1.972-.95c.165-.122.327-.247.484-.375 3.801 1.777 7.93 1.777 11.686 0 .159.128.32.253.485.375-.63.375-1.29.693-1.975.952a14.65 14.65 0 0 0 1.251 2.028 19.86 19.86 0 0 0 5.844-2.967c.478-5.052-.816-9.431-3.228-13.31ZM8.677 14.994c-1.14 0-2.077-1.06-2.077-2.364 0-1.303.918-2.365 2.077-2.365 1.167 0 2.096 1.071 2.077 2.365 0 1.303-.918 2.364-2.077 2.364Zm6.646 0c-1.14 0-2.077-1.06-2.077-2.364 0-1.303.918-2.365 2.077-2.365 1.167 0 2.096 1.071 2.077 2.365 0 1.303-.91 2.364-2.077 2.364Z" />
        </svg>
      );
    case 'chevron':
      return (
        <svg {...common}>
          <path d="m9 5 7 7-7 7" />
        </svg>
      );
    case 'play':
      return (
        <svg {...common}>
          <path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'success':
      return (
        <svg {...common}>
          <path d="M12 3.5 14.4 9l5.6.7-4.1 3.8 1 5.5-4.9-2.7L7.1 19l1-5.5L4 9.7 9.6 9 12 3.5Z" />
          <path d="m9.2 12.2 1.9 1.9 3.8-4.2" />
        </svg>
      );
  }
}

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
        <div className="flex items-center justify-end gap-1.5 font-pixel text-[7px] text-[#cc1133]">
          <Icon name="spark" className="h-3 w-3" />
          <span>KAISHI PORTAL V1.0</span>
          <Icon name="spark" className="h-3 w-3" />
        </div>
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
            {'>>> \u63a5\u7d9a\u3092\u958b\u59cb\u3059\u308b <<<'}
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
                  <Icon name="message" className="h-4 w-4" />
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
                    <Icon name="success" className="mx-auto h-12 w-12 text-[#cc1133] drop-shadow-[0_0_10px_rgba(204,17,51,0.85)]" />
                    <div className="mt-3 font-pixel text-[9px] text-[#cc1133]" style={{ textShadow: '0 0 10px rgba(204,17,51,0.8)' }}>
                      MESSAGE SENT!
                    </div>
                    <div className="mt-3 font-mono text-xs text-[#7a6068]">I'll get back to you ASAP.</div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { id: 'name', label: 'PLAYER NAME', placeholder: 'Enter your name...', icon: 'user' as IconName },
                      { id: 'email', label: 'EMAIL ADDRESS', placeholder: 'your@email.com', icon: 'email' as IconName },
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
                            <Icon name={field.icon} className="h-4 w-4" />
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
                        <span className="pointer-events-none absolute bottom-3 right-3 text-[#cc1133] opacity-30">
                          <Icon name="pencil" className="h-4 w-4" />
                        </span>
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
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${s.label} - ${s.handle}`}
                    initial={{ opacity: 0, x: 15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-4 border border-[rgba(204,17,51,0.15)] bg-[rgba(204,17,51,0.04)] px-4 py-3.5 transition-colors hover:border-[#cc1133]/60 hover:bg-[rgba(204,17,51,0.08)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[#cc1133] bg-[#cc1133]/15 text-[#cc1133]">
                      <Icon name={socialIcons[s.label]} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-pixel text-[9px] tracking-wider text-[#cc1133]">{s.label}</span>
                      <span className="mt-1 block truncate font-mono text-[13px] text-[#e8e0e3]">{s.handle}</span>
                    </span>
                    <span className="text-[#cc1133]">
                      <Icon name="chevron" className="h-4 w-4" />
                    </span>
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
              <div className="absolute right-4 text-[#00b4b4]/30">
                <Icon name="play" className="h-6 w-6" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
