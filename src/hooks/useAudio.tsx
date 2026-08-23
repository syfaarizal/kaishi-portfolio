import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const HOVER_SFX = '/assets/audio/hover-sfx.mp3';
const CLICK_SFX = '/assets/audio/click-sfx.mp3';
const SWAP_SFX = '/assets/audio/swap-glitch.mp3';
const TYPING_SFX = '/assets/audio/typing-sfx.mp3';
const BACKSOUND = '/assets/audio/backsound.mp3';

interface AudioCtxValue {
  musicOn: boolean;
  toggleMusic: () => void;
  playSwap: () => void;
}

const AudioCtx = createContext<AudioCtxValue | null>(null);

// Cache for SFX elements so we don't re-create them on every event.
const sfxCache: Record<string, string> = {
  hover: HOVER_SFX,
  click: CLICK_SFX,
};

// Throttle hover SFX so a fast mouse sweep doesn't machine-gun the audio.
let lastHoverAt = 0;
const HOVER_THROTTLE_MS = 90;

function playSfx(kind: 'hover' | 'click') {
  try {
    const audio = new Audio(sfxCache[kind]);
    audio.volume = kind === 'click' ? 0.6 : 0.35;
    if (kind === 'hover') {
      const now = performance.now();
      if (now - lastHoverAt < HOVER_THROTTLE_MS) return;
      lastHoverAt = now;
    }
    void audio.play().catch(() => {
      /* autoplay/permission errors are silent — UI shouldn't depend on them */
    });
  } catch {
    /* ignore */
  }
}

function playSwap() {
  try {
    const audio = new Audio(SWAP_SFX);
    audio.volume = 0.7;
    void audio.play().catch(() => undefined);
  } catch {
    /* ignore */
  }
}

// Throttle typing SFX so a fast typist doesn't machine-gun the audio.
let lastTypeAt = 0;
const TYPING_THROTTLE_MS = 65;

function playTyping() {
  try {
    const now = performance.now();
    if (now - lastTypeAt < TYPING_THROTTLE_MS) return;
    lastTypeAt = now;
    const audio = new Audio(TYPING_SFX);
    audio.volume = 0.45;
    void audio.play().catch(() => undefined);
  } catch {
    /* ignore */
  }
}

// Keys we want to skip — pure modifiers and navigation shouldn't trigger typing SFX.
const SKIP_KEYS = new Set([
  'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'Home', 'End', 'PageUp', 'PageDown',
  'Insert', 'Delete',
  'Escape', 'Tab',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'ContextMenu', 'PrintScreen', 'Pause',
]);

function isTextInput(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return false;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [musicOn, setMusicOn] = useState(false);
  const backsoundRef = useRef<HTMLAudioElement | null>(null);

  // Set up backsound element once. Don't auto-play (browsers block it);
  // the user toggles it from the Navbar.
  useEffect(() => {
    const audio = new Audio(BACKSOUND);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';
    backsoundRef.current = audio;
    return () => {
      audio.pause();
      backsoundRef.current = null;
    };
  }, []);

  // Global event delegation for hover/click SFX on every button.
  useEffect(() => {
    const isButton = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName;
      if (tag === 'BUTTON') return true;
      if (tag === 'A' && (el as HTMLAnchorElement).hasAttribute('href')) return true;
      // Anything explicitly tagged as interactive via role/aria.
      const role = el.getAttribute('role');
      return role === 'button' || role === 'link';
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (isButton(target)) playSfx('hover');
    };

    const handlePointerOut = (e: PointerEvent) => {
      // No-op for now; hover only fires once when entering a button.
      void e;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (isButton(target)) playSfx('click');
    };

    document.addEventListener('pointerover', handlePointerOver, true);
    document.addEventListener('pointerout', handlePointerOut, true);
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('pointerover', handlePointerOver, true);
      document.removeEventListener('pointerout', handlePointerOut, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  // Global typing SFX — fires whenever the user types into any
  // <input>, <textarea>, or [contenteditable] anywhere in the app.
  // Modifier-only and navigation keys are filtered out so it only
  // sounds on real character/destructive input.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as Element | null;
      if (!isTextInput(target)) return;
      if (e.key && SKIP_KEYS.has(e.key)) return;
      playTyping();
    };

    // contentEditable elements fire `input` for every change including
    // those that don't generate a keydown (e.g. IME composition finalise,
    // paste, drag-drop). Listen to that too so we still get a tick.
    const handleInput = (e: Event) => {
      const target = e.target as Element | null;
      if (!target || !isTextInput(target)) return;
      // Skip if it's a regular input/textarea — keydown already handled it.
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      playTyping();
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('input', handleInput, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('input', handleInput, true);
    };
  }, []);

  const toggleMusic = useCallback(() => {
    setMusicOn(prev => {
      const next = !prev;
      const audio = backsoundRef.current;
      if (!audio) return next;
      if (next) {
        // Start from the beginning each time the user enables it.
        audio.currentTime = 0;
        void audio.play().catch(() => undefined);
      } else {
        audio.pause();
      }
      return next;
    });
  }, []);

  return (
    <AudioCtx.Provider value={{ musicOn, toggleMusic, playSwap }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio(): AudioCtxValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>');
  return ctx;
}