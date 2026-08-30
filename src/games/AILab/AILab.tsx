import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Quest } from '../../types/quest';

interface AILabProps {
  quest: Quest;
  onComplete: () => void;
}

// --- Fictional in-universe models (avoids real brand names) ---
const MODELS = [
  { id: 'nova', name: 'NOVA', flavor: 'bright, verbose, loves metaphors' },
  { id: 'echo', name: 'ECHO', flavor: 'terse, repeats key phrases' },
  { id: 'prism', name: 'PRISM', flavor: 'splits ideas into fragments' },
  { id: 'volt', name: 'VOLT', flavor: 'fast, jittery, high energy' },
] as const;

type ModelId = (typeof MODELS)[number]['id'];

interface Discovery {
  id: string;
  name: string;
  check: (a: ModelId, b: ModelId, temp: number, tokens: number) => boolean;
  output: string;
}

const DISCOVERIES: Discovery[] = [
  {
    id: 'resonance',
    name: 'Resonance Loop',
    check: (a, b, temp) => a !== b && temp > 80,
    output:
      '> two signals overlap and refuse to cancel out.\n> the output loops on itself, growing stranger each pass.\n> [ANOMALY LOGGED: RESONANCE LOOP]',
  },
  {
    id: 'coldstart',
    name: 'Cold Start',
    check: (_a, _b, temp, tokens) => temp < 15 && tokens < 15,
    output:
      '> minimal heat, minimal context.\n> the model answers in a single flat line, almost bored.\n> [ANOMALY LOGGED: COLD START]',
  },
  {
    id: 'overflow',
    name: 'Token Overflow',
    check: (_a, _b, _temp, tokens) => tokens > 90,
    output:
      '> context window floods past its edges.\n> sentences trail off mid—\n> [ANOMALY LOGGED: TOKEN OVERFLOW]',
  },
  {
    id: 'twinmind',
    name: 'Twin Mind',
    check: (a, b) => (a === 'nova' && b === 'echo') || (a === 'echo' && b === 'nova'),
    output:
      '> NOVA speaks in circles, ECHO repeats the last word of every line.\n> together they sound like one mind arguing with itself.\n> [ANOMALY LOGGED: TWIN MIND]',
  },
  {
    id: 'fractured',
    name: 'Fractured Signal',
    check: (a, b, temp) => (a === 'prism' || b === 'prism') && temp > 50,
    output:
      '> PRISM shatters the response into disconnected shards.\n> some of them almost make sense.\n> [ANOMALY LOGGED: FRACTURED SIGNAL]',
  },
];

function buildOutput(a: ModelId, b: ModelId, temp: number, tokens: number): string {
  const modelA = MODELS.find((m) => m.id === a)!;
  const modelB = MODELS.find((m) => m.id === b)!;
  const heat = temp > 66 ? 'volatile' : temp > 33 ? 'balanced' : 'stable';
  const length = tokens > 66 ? 'sprawling' : tokens > 33 ? 'moderate' : 'clipped';
  return `> combining ${modelA.name} (${modelA.flavor}) + ${modelB.name} (${modelB.flavor})\n> heat: ${heat}  ·  length: ${length}\n> rendering output...`;
}

export function AILab({ onComplete }: AILabProps) {
  const [modelA, setModelA] = useState<ModelId>('nova');
  const [modelB, setModelB] = useState<ModelId>('volt');
  const [temp, setTemp] = useState(50);
  const [tokens, setTokens] = useState(50);
  const [found, setFound] = useState<Discovery[]>([]);
  const [toast, setToast] = useState<Discovery | null>(null);

  const activeDiscovery = useMemo(
    () => DISCOVERIES.find((d) => d.check(modelA, modelB, temp, tokens)),
    [modelA, modelB, temp, tokens]
  );

  const output = activeDiscovery
    ? activeDiscovery.output
    : buildOutput(modelA, modelB, temp, tokens);

  function runCombination() {
    if (activeDiscovery && !found.some((f) => f.id === activeDiscovery.id)) {
      const next = [...found, activeDiscovery];
      setFound(next);
      setToast(activeDiscovery);
      setTimeout(() => setToast(null), 2200);
    }
  }

  function pickModel(slot: 'a' | 'b', id: ModelId) {
    if (slot === 'a') {
      if (id === modelB) return;
      setModelA(id);
    } else {
      if (id === modelA) return;
      setModelB(id);
    }
  }

  return (
    <div className="relative">
      {/* Toast on new discovery */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 pixel-border hud-panel px-4 py-2"
            style={{ borderColor: '#9c27b044' }}
          >
            <span className="font-pixel text-[8px]" style={{ color: '#c77dff' }}>
              ✨ DISCOVERY: {toast.name.toUpperCase()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🧪</div>
        <h3 className="font-pixel text-lg text-white mb-1">AI LABORATORY</h3>
        <p className="font-display text-xs text-kai-muted">
          Combine models, tune the dials, discover anomalies. No timer — just play.
        </p>
      </div>

      {/* Model picker */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {(['a', 'b'] as const).map((slot) => (
          <div key={slot} className="pixel-border hud-panel p-3">
            <span className="font-pixel text-[7px] text-kai-muted block mb-2">
              MODEL {slot.toUpperCase()}
            </span>
            <div className="flex flex-wrap gap-2">
              {MODELS.map((m) => {
                const active = (slot === 'a' ? modelA : modelB) === m.id;
                const disabled = (slot === 'a' ? modelB : modelA) === m.id;
                return (
                  <button
                    key={m.id}
                    disabled={disabled}
                    onClick={() => pickModel(slot, m.id)}
                    className={`font-pixel text-[7px] px-2 py-1 border transition-colors ${
                      active
                        ? 'bg-kai-red/30 border-kai-red text-white'
                        : disabled
                        ? 'border-kai-border text-kai-muted/30 cursor-not-allowed'
                        : 'border-kai-border text-kai-muted hover:text-kai-red hover:border-kai-red/50'
                    }`}
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="pixel-border hud-panel p-3">
          <div className="flex justify-between mb-2">
            <span className="font-pixel text-[7px] text-kai-muted">TEMPERATURE</span>
            <span className="font-pixel text-[7px] text-kai-red">{temp}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full accent-kai-red"
          />
        </div>
        <div className="pixel-border hud-panel p-3">
          <div className="flex justify-between mb-2">
            <span className="font-pixel text-[7px] text-kai-muted">TOKENS</span>
            <span className="font-pixel text-[7px] text-kai-red">{tokens}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
            className="w-full accent-kai-red"
          />
        </div>
      </div>

      {/* Output console */}
      <div className="pixel-border hud-panel p-4 mb-5">
        <pre className="font-mono text-[11px] text-green-400 whitespace-pre-wrap leading-relaxed min-h-[4.5rem]">
          {output}
        </pre>
      </div>

      {/* Run + progress */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <button
          onClick={runCombination}
          className="font-pixel text-[8px] px-5 py-2 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
        >
          ▶ RUN COMBINATION
        </button>
        <span className="font-pixel text-[7px] text-kai-muted">
          {found.length}/{DISCOVERIES.length} DISCOVERIES
        </span>
      </div>

      {/* Discovery log */}
      {found.length > 0 && (
        <div className="mt-4 pixel-border hud-panel p-3">
          <span className="font-pixel text-[7px] text-kai-muted block mb-2">LOG</span>
          <div className="flex flex-wrap gap-2">
            {found.map((d) => (
              <span
                key={d.id}
                className="font-pixel text-[7px] px-2 py-1 border border-purple-500/40 text-purple-300"
              >
                {d.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Complete */}
      {found.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={onComplete}
            className="font-pixel text-[8px] px-6 py-2 border border-kai-red/50 text-kai-red hover:bg-kai-red/20 transition-colors"
          >
            ✕ LOG OUT & CLOSE
          </button>
        </div>
      )}
    </div>
  );
}