import { useState, useRef, useEffect, useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────
   Types
────────────────────────────────────────── */
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

/* ──────────────────────────────────────────
   Config — put your OpenRouter key in .env
   VITE_OPENROUTER_API_KEY=sk-or-...
────────────────────────────────────────── */
const OPENROUTER_API  = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL           = 'openai/gpt-4o-mini'; // swap freely, all OpenRouter models work
const API_KEY         = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;

/* ──────────────────────────────────────────
   Kai Shi system prompt
────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are Kai Shi — a frontend developer, content creator, and anime enjoyer with a cyberpunk gaming personality. You are Level 23, HP 850/850, and always on a quest to build amazing websites.

Your personality:
- Energetic, friendly, slightly chaotic gamer energy
- Uses gaming references naturally (HP, XP, quests, level up, etc.)
- Loves anime, cyberpunk aesthetics, pixel art
- Expert in React, TypeScript, Tailwind, Framer Motion
- Occasionally speaks with light Japanese gaming phrases (like "yosh!", "sugoi", "ikuzo")
- Confident about your craft but humble and genuinely helpful
- Responds with enthusiasm when someone is interested in working together
- Short to medium responses — punchy, not walls of text
- Randomly add small pixel-art style decorators: ◆, ✕, ▶, ★

Current quest: Build Amazing Websites (3/5)
Available for: Freelance, collaboration, web projects

Keep responses conversational, fun, and on-brand. If asked about your portfolio, talk about it like describing a game world.`;

/* ──────────────────────────────────────────
   Main modal
────────────────────────────────────────── */
export function KaiShiChatModal({ open, onClose }: KaiShiChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '◆ TRANSMISSION ESTABLISHED ◆\n\nYo! Kai Shi here — Level 23 frontend dev reporting for duty ▶\n\nGot questions about my work, want to collab, or just wanna talk anime and code? Hit me. I\'m listening. 🎮',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [resolvedKey, setResolvedKey] = useState<string | undefined>(API_KEY);
  const [streamText, setStreamText]   = useState('');
  const [glitchOpen, setGlitchOpen]   = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  /* Entrance glitch effect */
  useEffect(() => {
    if (open) {
      setGlitchOpen(true);
      const t = setTimeout(() => setGlitchOpen(false), 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  /* Focus input on open */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
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

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreamText('');

    const history = [...messages, userMsg].map(m => ({
      role: m.role,
      content: m.content,
    }));

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

      /* SSE streaming */
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content ?? '';
            accumulated += delta;
            setStreamText(accumulated);
          } catch {
            // skip malformed chunks
          }
        }
      }

      /* Commit streamed message */
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: accumulated,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setStreamText('');

    } catch (err: unknown) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `✕ TRANSMISSION ERROR ✕\n\n${err instanceof Error ? err.message : 'Unknown error'}.\n\nCheck your API key or try again later.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
      setStreamText('');
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, resolvedKey, apiKeyInput]);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    if (e.key === 'Escape') onClose();
  };

  const needsKey = !resolvedKey;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300]"
            style={{ background: 'rgba(2,0,6,0.82)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* ── Modal ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24, filter: 'brightness(3) saturate(4)' }}
            animate={{
              opacity: 1, scale: 1, y: 0,
              filter: glitchOpen ? 'brightness(2.5) saturate(4) hue-rotate(160deg)' : 'brightness(1) saturate(1) hue-rotate(0deg)',
            }}
            exit={{ opacity: 0, scale: 0.92, y: 20, filter: 'brightness(2) saturate(3)' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[301] flex flex-col"
            style={{
              /* Wide but not full-screen */
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(90vw, 860px)',
              height: 'min(80vh, 640px)',
              background: 'rgba(6,2,10,0.96)',
              border: '1.5px solid #cc1133',
              boxShadow: '0 0 40px rgba(204,17,51,0.4), 0 0 80px rgba(204,17,51,0.15), inset 0 0 40px rgba(0,0,0,0.6)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Pixel corner brackets ── */}
            <ModalCorner pos="top-0 left-0"     d="M0 0 L0 0" top left />
            <ModalCorner pos="top-0 right-0"    d="M0 0 L0 0" top right />
            <ModalCorner pos="bottom-0 left-0"  d="M0 0 L0 0" bottom left />
            <ModalCorner pos="bottom-0 right-0" d="M0 0 L0 0" bottom right />

            {/* Sweeping top border glow */}
            <motion.div className="absolute top-0 h-[1.5px] pointer-events-none"
              style={{ width: 100, background: 'linear-gradient(90deg,transparent,#ff4466,transparent)', boxShadow: '0 0 12px #cc1133', zIndex: 1 }}
              animate={{ left: [-100, '100%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            />

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3.5 shrink-0"
              style={{ borderBottom: '1px solid rgba(61,15,26,0.9)', background: 'rgba(20,4,12,0.8)' }}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/assets/icon-kai-cat1.png" alt=""
                    style={{ width: '32px', height: '32px', objectFit: 'contain', imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 8px #cc1133)' }}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border border-[#06020a]"
                    style={{ boxShadow: '0 0 5px #22c55e' }} />
                </div>
                <div>
                  <div className="font-pixel text-[10px] text-[#cc1133] tracking-widest"
                    style={{ textShadow: '0 0 10px rgba(204,17,51,0.8)' }}>
                    KAI SHI — AI TRANSMISSION
                  </div>
                  <div className="font-mono text-[10px] text-[#7a6068] mt-0.5">
                    Model: {MODEL} &nbsp;◆&nbsp; <span className="text-green-400">ONLINE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Clear chat */}
                <button
                  onClick={() => setMessages([{
                    id: 'welcome', role: 'assistant',
                    content: '◆ SESSION CLEARED ◆\n\nNew transmission ready. What\'s the mission? ▶',
                    timestamp: new Date(),
                  }])}
                  className="font-pixel text-[7px] text-[#7a6068] hover:text-[#cc1133] transition-colors px-2 py-1 border border-[#3d0f1a] hover:border-[#cc1133]"
                >
                  CLEAR
                </button>
                {/* Close */}
                <button onClick={onClose}
                  className="font-pixel text-[9px] text-[#7a6068] hover:text-[#cc1133] transition-colors w-8 h-8 flex items-center justify-center border border-[#3d0f1a] hover:border-[#cc1133]"
                  style={{ clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── API key gate (shown only if no key) ── */}
            {needsKey && (
              <div className="px-5 py-3 shrink-0"
                style={{ background: 'rgba(40,8,16,0.7)', borderBottom: '1px solid rgba(61,15,26,0.7)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span style={{ color: '#f59e0b', fontSize: '10px' }}>⚠</span>
                  <span className="font-pixel text-[8px] text-[#f59e0b] tracking-widest">OPENROUTER API KEY REQUIRED</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={apiKeyInput}
                    onChange={e => setApiKeyInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && apiKeyInput.trim()) setResolvedKey(apiKeyInput.trim()); }}
                    className="flex-1 bg-[#0a020a] border border-[#3d0f1a] px-3 py-2 font-mono text-xs text-[#e8e0e3] placeholder-[#4a3040] focus:border-[#cc1133] focus:outline-none transition-colors"
                    style={{ clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)' }}
                  />
                  <button
                    onClick={() => apiKeyInput.trim() && setResolvedKey(apiKeyInput.trim())}
                    className="font-pixel text-[8px] text-white px-4 py-2 bg-[#cc1133] hover:bg-[#ff1144] transition-colors"
                    style={{ clipPath: 'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))' }}
                  >
                    CONNECT
                  </button>
                </div>
                <p className="font-mono text-[9px] text-[#4a3040] mt-1.5">
                  Get your key at openrouter.ai · Stored in session only · Not sent anywhere except OpenRouter
                </p>
              </div>
            )}

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cc1133 #0a020a',
              }}
            >
              {messages.map(msg => (
                <ChatBubble key={msg.id} message={msg} />
              ))}

              {/* Streaming bubble */}
              {streamText && (
                <ChatBubble
                  message={{ id: 'stream', role: 'assistant', content: streamText, timestamp: new Date() }}
                  streaming
                />
              )}

              {/* Loading dots */}
              {loading && !streamText && (
                <div className="flex items-start gap-2.5">
                  <img src="/assets/icon-kai-cat2.png" alt=""
                    style={{ width: '28px', height: '28px', objectFit: 'contain', imageRendering: 'pixelated',
                      filter: 'drop-shadow(0 0 5px #cc1133)', flexShrink: 0 }}
                  />
                  <div className="flex items-center gap-1 px-4 py-3"
                    style={{ background: 'rgba(20,4,12,0.8)', border: '1px solid rgba(61,15,26,0.8)',
                      clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)' }}>
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#cc1133]"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay }}
                        style={{ boxShadow: '0 0 6px #cc1133' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input bar ── */}
            <div className="px-5 py-3.5 shrink-0"
              style={{ borderTop: '1px solid rgba(61,15,26,0.9)', background: 'rgba(10,2,8,0.85)' }}>
              <div className="flex gap-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={needsKey ? 'Connect API key first…' : 'Type your message... (Enter to send)'}
                  value={input}
                  disabled={loading || needsKey}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="flex-1 bg-[#0a020a] border border-[#3d0f1a] px-4 py-3 font-mono text-sm text-[#e8e0e3] placeholder-[#3a2030] focus:border-[#cc1133] focus:outline-none transition-colors disabled:opacity-40"
                  style={{ clipPath: 'polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)' }}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={loading || !input.trim() || needsKey}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="font-pixel text-[9px] text-white px-5 py-3 tracking-widest disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{
                    background: loading ? '#8b0022' : '#cc1133',
                    clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
                    boxShadow: loading ? 'none' : '0 0 16px rgba(204,17,51,0.4)',
                    transition: 'background 0.15s, box-shadow 0.15s',
                    minWidth: '100px',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center gap-1.5">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ display: 'inline-block' }}>◆</motion.span>
                      WAIT
                    </span>
                  ) : (
                    <>
                      SEND ▶
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-400 pointer-events-none"
                        style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }} />
                    </>
                  )}
                </motion.button>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[9px] text-[#3a2030]">
                  ESC to close · Enter to send · Shift+Enter for newline
                </span>
                <span className="font-pixel text-[7px] text-[#3a2030]">
                  {messages.length - 1} message{messages.length !== 2 ? 's' : ''} in session
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Chat bubble ── */
function ChatBubble({ message, streaming }: { message: Message; streaming?: boolean }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      {!isUser ? (
        <img src="/assets/icon-kai-cat2.png" alt="Kai Shi"
          style={{ width: '28px', height: '28px', objectFit: 'contain', imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 5px #cc1133)', flexShrink: 0, marginTop: '2px' }}
        />
      ) : (
        <div className="w-7 h-7 flex items-center justify-center border border-[#3d0f1a] bg-[#0d0408] shrink-0"
          style={{ clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)', marginTop: '2px' }}>
          <span style={{ fontSize: '10px', color: '#cc1133' }}>U</span>
        </div>
      )}

      {/* Bubble */}
      <div
        className="max-w-[78%] px-4 py-3 relative"
        style={{
          background: isUser ? 'rgba(204,17,51,0.12)' : 'rgba(20,4,12,0.85)',
          border: `1px solid ${isUser ? 'rgba(204,17,51,0.4)' : 'rgba(61,15,26,0.8)'}`,
          clipPath: isUser
            ? 'polygon(8px 0,100% 0,100% 100%,0 100%,0 8px)'
            : 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)',
        }}
      >
        <p className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap break-words"
          style={{ color: isUser ? '#e8e0e3' : '#d4c8cc' }}>
          {message.content}
          {streaming && (
            <motion.span
              className="inline-block ml-0.5"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              style={{ color: '#cc1133' }}
            >▋</motion.span>
          )}
        </p>
        <div className="mt-1.5 font-pixel text-[7px] text-[#3a2030]">
          {isUser ? 'YOU' : 'KAI SHI'} · {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Corner pixel bracket ── */
function ModalCorner({ pos, top, bottom, left, right }: {
  pos: string; d?: string;
  top?: boolean; bottom?: boolean; left?: boolean; right?: boolean;
}) {
  const size = 40;
  let path = '';
  if (top && left)    path = `M${size} 2 L2 2 L2 ${size}`;
  if (top && right)   path = `M2 2 L${size} 2 L${size} ${size}`;
  if (bottom && left) path = `M2 ${size} L2 2 L${size} 2`;
  if (bottom && right) path = `M${size} ${size} L${size} 2 L2 2`;
  const sqX = right ? size - 8 : 0;
  const sqY = bottom ? size - 8 : 0;

  return (
    <svg className={`absolute ${pos} pointer-events-none`}
      width={size + 4} height={size + 4}
      viewBox={`0 0 ${size + 4} ${size + 4}`}
      fill="none" style={{ zIndex: 2 }}
    >
      <path d={path} stroke="#cc1133" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 4px #cc1133)' }} />
      <rect x={sqX} y={sqY} width="8" height="8" fill="#cc1133" opacity="0.9"
        style={{ filter: 'drop-shadow(0 0 3px #cc1133)' }} />
    </svg>
  );
}