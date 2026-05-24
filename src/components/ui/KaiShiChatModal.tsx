import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Types ── */
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
interface KaiShiChatModalProps {
  open: boolean;
  onClose: () => void;
}

/* ── Config ── */
const OPENROUTER_API = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL          = 'openai/gpt-4o-mini';
const API_KEY        = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;

const SYSTEM_PROMPT = `You are Kai Shi — a frontend developer, content creator, and anime enjoyer with a cyberpunk gaming personality. You are Level 23, HP 850/850, always on a quest to build amazing websites.

Personality:
- Energetic, friendly, slightly chaotic gamer energy
- Uses gaming references naturally (HP, XP, quests, level up)
- Loves anime, cyberpunk aesthetics, pixel art
- Expert in React, TypeScript, Tailwind, Framer Motion
- Occasionally uses Japanese gaming phrases ("yosh!", "sugoi", "ikuzo")
- Confident but humble and genuinely helpful
- Short to medium responses — punchy, not walls of text
- Randomly add: ◆ ✕ ▶ ★

Current quest: Build Amazing Websites (3/5)
Available for: Freelance, collaboration, web projects.`;

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content: '◆ TRANSMISSION ESTABLISHED ◆\n\nYo! Kai Shi here — Level 23 frontend dev, reporting for duty ▶\n\nGot questions about my work, wanna collab, or just talk anime and code? I\'m listening. 🎮',
  timestamp: new Date(),
};

/* ══════════════════════════════════════════
   MODAL — rendered into document.body via portal
   so it always sits above everything else
══════════════════════════════════════════ */
export function KaiShiChatModal({ open, onClose }: KaiShiChatModalProps) {
  const [messages, setMessages]       = useState<Message[]>([WELCOME]);
  const [input, setInput]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [resolvedKey, setResolvedKey] = useState<string | undefined>(API_KEY);
  const [streamText, setStreamText]   = useState('');
  const [glitching, setGlitching]     = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* Entrance glitch burst */
  useEffect(() => {
    if (!open) return;
    setGlitching(true);
    const t1 = setTimeout(() => setGlitching(false), 80);
    const t2 = setTimeout(() => setGlitching(true),  130);
    const t3 = setTimeout(() => setGlitching(false), 220);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [open]);

  /* Auto-scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  /* Focus input on open */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 320);
  }, [open]);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const sendMessage = useCallback(async () => {
    const key = resolvedKey || apiKeyInput.trim();
    if (!key || !input.trim() || loading) return;
    if (!resolvedKey && apiKeyInput.trim()) setResolvedKey(apiKeyInput.trim());

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);
    setStreamText('');

    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(OPENROUTER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'Kai Shi Portfolio',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
          stream: true,
          max_tokens: 500,
          temperature: 0.88,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: { message: res.statusText } }));
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }

      const reader  = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') break;
          try {
            const delta = JSON.parse(raw).choices?.[0]?.delta?.content ?? '';
            accumulated += delta;
            setStreamText(accumulated);
          } catch { /* skip */ }
        }
      }

      setMessages(p => [...p, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: accumulated,
        timestamp: new Date(),
      }]);
      setStreamText('');

    } catch (err: unknown) {
      setMessages(p => [...p, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `✕ TRANSMISSION ERROR ✕\n\n${err instanceof Error ? err.message : 'Unknown error'}.\n\nCheck your API key and try again.`,
        timestamp: new Date(),
      }]);
      setStreamText('');
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, resolvedKey, apiKeyInput]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    if (e.key === 'Escape') onClose();
  };

  const needsKey = !resolvedKey;

  /* ── Portal target ── */
  const portal = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(2,0,8,0.78)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal box — fixed centered, never full-screen */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1, scale: 1, y: 0,
              filter: glitching
                ? 'brightness(2) saturate(5) hue-rotate(160deg)'
                : 'brightness(1) saturate(1) hue-rotate(0deg)',
            }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              /* Centered, bounded — never full-screen */
              top: '12%',
              left: '25%',
              transform: 'translate(-50%, -50%)',
              width: 'min(98vw, 1050px)',
              height: 'min(90vh, 700px)',
              maxHeight: '700px',
              zIndex: 9001,
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(6,2,10,0.97)',
              border: '1.5px solid #cc1133',
              boxShadow: '0 0 50px rgba(204,17,51,0.35), 0 0 100px rgba(204,17,51,0.12), inset 0 0 40px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
          >
            {/* Corner brackets */}
            <Corner pos="tl" /> <Corner pos="tr" />
            <Corner pos="bl" /> <Corner pos="br" />

            {/* Sweep glow on top border */}
            <motion.div
              style={{
                position: 'absolute', top: 0, height: '1.5px', width: 110, zIndex: 1, pointerEvents: 'none',
                background: 'linear-gradient(90deg,transparent,#ff4466,transparent)',
                boxShadow: '0 0 10px #cc1133',
              }}
              animate={{ left: [-110, '100%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.8 }}
            />

            {/* ── HEADER ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 18px', flexShrink: 0,
              borderBottom: '1px solid rgba(61,15,26,0.9)',
              background: 'rgba(16,4,10,0.9)',
            }}>
              {/* Left: avatar + title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src="/assets/icon-kai-cat1.png" alt=""
                    style={{ width: '30px', height: '30px', objectFit: 'contain', imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 7px #cc1133)' }}
                  />
                  <span style={{
                    position: 'absolute', bottom: '-2px', right: '-2px',
                    width: '9px', height: '9px', borderRadius: '50%',
                    background: '#22c55e', border: '1.5px solid #06020a',
                    boxShadow: '0 0 5px #22c55e',
                  }} />
                </div>
                <div>
                  <div className="font-pixel" style={{
                    fontSize: '10px', color: '#cc1133', letterSpacing: '0.12em',
                    textShadow: '0 0 10px rgba(204,17,51,0.8)',
                  }}>
                    KAI SHI — AI TRANSMISSION
                  </div>
                  <div className="font-mono" style={{ fontSize: '10px', color: '#4a3040', marginTop: '2px' }}>
                    {MODEL}&nbsp; ◆ &nbsp;<span style={{ color: '#22c55e' }}>ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Right: clear + close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setMessages([{ ...WELCOME, timestamp: new Date() }])}
                  className="font-pixel"
                  style={{
                    fontSize: '7px', color: '#4a3040', padding: '5px 10px',
                    border: '1px solid #2a1018', background: 'transparent',
                    cursor: 'pointer', letterSpacing: '0.1em', transition: 'color 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#cc1133'; (e.currentTarget as HTMLElement).style.borderColor = '#cc1133'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4a3040'; (e.currentTarget as HTMLElement).style.borderColor = '#2a1018'; }}
                >
                  CLEAR
                </button>
                <button
                  onClick={onClose}
                  className="font-pixel"
                  style={{
                    width: '30px', height: '30px', fontSize: '12px',
                    color: '#4a3040', border: '1px solid #2a1018', background: 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s',
                    clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#cc1133'; (e.currentTarget as HTMLElement).style.borderColor = '#cc1133'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4a3040'; (e.currentTarget as HTMLElement).style.borderColor = '#2a1018'; }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── API KEY GATE ── */}
            {needsKey && (
              <div style={{
                padding: '10px 18px', flexShrink: 0,
                background: 'rgba(36,6,12,0.8)',
                borderBottom: '1px solid rgba(61,15,26,0.7)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ color: '#f59e0b', fontSize: '11px' }}>⚠</span>
                  <span className="font-pixel" style={{ fontSize: '8px', color: '#f59e0b', letterSpacing: '0.1em' }}>
                    OPENROUTER API KEY REQUIRED
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                  <input
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={apiKeyInput}
                    onChange={e => setApiKeyInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && apiKeyInput.trim()) setResolvedKey(apiKeyInput.trim()); }}
                    className="font-mono"
                    style={{
                      flex: 1, background: '#080210', border: '1px solid #2a1018',
                      padding: '8px 12px', fontSize: '12px', color: '#e8e0e3',
                      outline: 'none', transition: 'border-color 0.15s',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#cc1133')}
                    onBlur={e => (e.target.style.borderColor = '#2a1018')}
                  />
                  <button
                    onClick={() => apiKeyInput.trim() && setResolvedKey(apiKeyInput.trim())}
                    className="font-pixel"
                    style={{
                      fontSize: '8px', color: '#fff', padding: '8px 16px',
                      background: '#cc1133', border: 'none', cursor: 'pointer',
                      letterSpacing: '0.1em', whiteSpace: 'nowrap',
                      clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))',
                    }}
                  >
                    CONNECT
                  </button>
                </div>
                <p className="font-mono" style={{ fontSize: '9px', color: '#3a2030', marginTop: '6px' }}>
                  openrouter.ai · Session only · Not stored anywhere
                </p>
              </div>
            )}

            {/* ── MESSAGES ── */}
            <div
              style={{
                flex: 1, overflowY: 'auto', padding: '16px 18px',
                display: 'flex', flexDirection: 'column', gap: '14px',
                scrollbarWidth: 'thin', scrollbarColor: '#cc1133 #0a020a',
              }}
            >
              {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}

              {/* Streaming */}
              {streamText && (
                <ChatBubble
                  message={{ id: 'stream', role: 'assistant', content: streamText, timestamp: new Date() }}
                  streaming
                />
              )}

              {/* Loading dots */}
              {loading && !streamText && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <img src="/assets/icon-kai-cat2.png" alt=""
                    style={{ width: '26px', height: '26px', objectFit: 'contain', imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 5px #cc1133)', flexShrink: 0, marginTop: '4px' }}
                  />
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '10px 14px',
                    background: 'rgba(16,4,10,0.85)',
                    border: '1px solid rgba(61,15,26,0.8)',
                    clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)',
                  }}>
                    {[0, 0.18, 0.36].map((d, i) => (
                      <motion.div key={i}
                        style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#cc1133', boxShadow: '0 0 5px #cc1133' }}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                        transition={{ duration: 0.75, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── INPUT BAR ── */}
            <div style={{
              flexShrink: 0,
              borderTop: '1px solid rgba(61,15,26,0.9)',
              background: 'rgba(8,2,8,0.92)',
              padding: '12px 18px',
            }}>
              {/* Main row: input + send button */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '26px' }}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={needsKey ? 'Connect API key first…' : 'Send a message… (Enter)'}
                  value={input}
                  disabled={loading || needsKey}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="font-mono"
                  style={{
                    flex: 1,
                    background: '#0a0210',
                    border: '1px solid #2a1018',
                    padding: '11px 14px',
                    fontSize: '13px',
                    color: '#e8e0e3',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                    opacity: (loading || needsKey) ? 0.4 : 1,
                    clipPath: 'polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)',
                  }}
                  onFocus={e => { if (!needsKey && !loading) e.target.style.borderColor = '#cc1133'; }}
                  onBlur={e => (e.target.style.borderColor = '#2a1018')}
                />

                <motion.button
                  onClick={sendMessage}
                  disabled={loading || !input.trim() || needsKey}
                  whileHover={!loading && input.trim() && !needsKey ? { scale: 1.04 } : {}}
                  whileTap={!loading && input.trim() && !needsKey ? { scale: 0.96 } : {}}
                  className="font-pixel"
                  style={{
                    fontSize: '10px', letterSpacing: '0.12em',
                    color: '#fff', padding: '11px 22px',
                    background: loading ? '#5a0012' : '#cc1133',
                    border: 'none', cursor: (loading || !input.trim() || needsKey) ? 'not-allowed' : 'pointer',
                    opacity: (loading || !input.trim() || needsKey) ? 0.45 : 1,
                    transition: 'background 0.15s, opacity 0.15s',
                    whiteSpace: 'nowrap', flexShrink: 0,
                    clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    boxShadow: (!loading && input.trim()) ? '0 0 14px rgba(204,17,51,0.4)' : 'none',
                  }}
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        style={{ display: 'inline-block', fontSize: '11px' }}
                      >◆</motion.span>
                      WAIT
                    </>
                  ) : (
                    <> SEND <span style={{ fontSize: '11px' }}>▶</span> </>
                  )}
                </motion.button>
              </div>

              {/* Hint row */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: '7px',
              }}>
                <span className="font-mono" style={{ fontSize: '9px', color: '#871b1b' }}>
                  ESC close &nbsp;·&nbsp; Enter send
                </span>
                <span className="font-pixel" style={{ fontSize: '7px', color: '#871b1b' }}>
                  {messages.length - 1} msg · {MODEL}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(portal, document.body);
}

/* ── Chat bubble ── */
function ChatBubble({ message, streaming }: { message: Message; streaming?: boolean }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '10px',
        flexDirection: isUser ? 'row-reverse' : 'row' }}
    >
      {/* Avatar */}
      {isUser ? (
        <div style={{
          width: '26px', height: '26px', flexShrink: 0, marginTop: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid #2a1018', background: '#0d0408',
          clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)',
        }}>
          <span style={{ fontSize: '9px', color: '#cc1133' }}>U</span>
        </div>
      ) : (
        <img src="/assets/icon-kai-cat2.png" alt="Kai"
          style={{ width: '26px', height: '26px', objectFit: 'contain', imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 5px #cc1133)', flexShrink: 0, marginTop: '2px' }}
        />
      )}

      {/* Bubble */}
      <div style={{
        maxWidth: '76%', padding: '10px 14px',
        background: isUser ? 'rgba(204,17,51,0.1)' : 'rgba(16,4,10,0.9)',
        border: `1px solid ${isUser ? 'rgba(204,17,51,0.38)' : 'rgba(61,15,26,0.8)'}`,
        clipPath: isUser
          ? 'polygon(8px 0,100% 0,100% 100%,0 100%,0 8px)'
          : 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)',
      }}>
        <p className="font-mono" style={{
          fontSize: '13px', lineHeight: 1.65,
          color: isUser ? '#e8e0e3' : '#d4c8cc',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
        }}>
          {message.content}
          {streaming && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.65, repeat: Infinity }}
              style={{ color: '#cc1133', marginLeft: '2px' }}
            >▋</motion.span>
          )}
        </p>
        <div className="font-pixel" style={{ fontSize: '7px', color: '#2a1420', marginTop: '6px' }}>
          {isUser ? 'YOU' : 'KAI SHI'} · {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Pixel corner bracket ── */
function Corner({ pos }: { pos: 'tl'|'tr'|'bl'|'br' }) {
  const size = 36;
  const paths: Record<string, string> = {
    tl: `M${size} 2 L2 2 L2 ${size}`,
    tr: `M2 2 L${size} 2 L${size} ${size}`,
    bl: `M2 ${size} L2 2 L${size} 2`,
    br: `M${size} ${size} L${size} 2 L2 2`,
  };
  const positions: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0 },
    tr: { top: 0, right: 0 },
    bl: { bottom: 0, left: 0 },
    br: { bottom: 0, right: 0 },
  };
  const sqMap: Record<string, [number, number]> = {
    tl: [0, 0], tr: [size - 7, 0], bl: [0, size - 7], br: [size - 7, size - 7],
  };
  const [sqX, sqY] = sqMap[pos];
  return (
    <svg
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: 2, ...positions[pos] }}
      width={size + 4} height={size + 4}
      viewBox={`0 0 ${size + 4} ${size + 4}`}
      fill="none"
    >
      <path d={paths[pos]} stroke="#cc1133" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 4px #cc1133)' }} />
      <rect x={sqX} y={sqY} width="8" height="8" fill="#cc1133" opacity="0.92"
        style={{ filter: 'drop-shadow(0 0 3px #cc1133)' }} />
    </svg>
  );
}