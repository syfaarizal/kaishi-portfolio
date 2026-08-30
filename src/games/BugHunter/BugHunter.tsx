import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Quest } from '../../types/quest';

interface BugHunterProps {
  quest: Quest;
  onComplete: () => void;
}

interface CodeRound {
  language: 'js' | 'ts' | 'py';
  lines: string[];
  bugIndex: number;
  bugType: 'typo' | 'off-by-one' | 'operator' | 'syntax' | 'logic';
  hint: string;
}

const ROUND_TIME = 14;

const ROUNDS: CodeRound[] = [
  {
    language: 'js',
    bugType: 'typo',
    hint: 'Typo on a variable name',
    lines: [
      'function greet(name) {',
      '  const message = "Hello, " + name;',
      '  console.log(massage);',
      '  return message;',
      '}',
      'greet("Kai");',
    ],
    bugIndex: 2,
  },
  {
    language: 'js',
    bugType: 'off-by-one',
    hint: 'Loop bound is off-by-one',
    lines: [
      'function sumArray(arr) {',
      '  let total = 0;',
      '  for (let i = 0; i <= arr.length; i++) {',
      '    total += arr[i];',
      '  }',
      '  return total;',
      '}',
    ],
    bugIndex: 2,
  },
  {
    language: 'ts',
    bugType: 'operator',
    hint: 'Wrong comparison operator',
    lines: [
      'function isAdult(age: number) {',
      '  if (age = 18) {',
      '    return true;',
      '  }',
      '  return false;',
      '}',
    ],
    bugIndex: 1,
  },
  {
    language: 'py',
    bugType: 'syntax',
    hint: 'Missing colon',
    lines: [
      'def fib(n):',
      '    a, b = 0, 1',
      '    for _ in range(n):',
      '        a, b = b, a + b',
      '    return a',
      '',
      'print(fib(10))',
    ],
    bugIndex: 1,
  },
  {
    language: 'js',
    bugType: 'logic',
    hint: 'Wrong return path on even numbers',
    lines: [
      'function isOdd(n) {',
      '  if (n % 2 === 0) {',
      '    return true;',
      '  }',
      '  return false;',
      '}',
      'isOdd(3);',
    ],
    bugIndex: 2,
  },
  {
    language: 'ts',
    bugType: 'logic',
    hint: 'Async result returned before awaiting',
    lines: [
      'async function loadUser(id: number) {',
      '  const user = fetchUser(id);',
      '  const posts = await fetchPosts(user.id);',
      '  return { user, posts };',
      '}',
    ],
    bugIndex: 1,
  },
];

type Phase = 'playing' | 'results';

interface RoundResult {
  roundIndex: number;
  correct: boolean;
  timeSpent: number;
  pickedIndex: number;
}

function rankFor(score: number, maxScore: number): { rank: string; label: string; tone: string } {
  const pct = maxScore > 0 ? score / maxScore : 0;
  if (pct >= 0.85) return { rank: 'S', label: 'NETRUNNER', tone: 'text-yellow-300' };
  if (pct >= 0.65) return { rank: 'A', label: 'OPERATIVE', tone: 'text-kai-red' };
  if (pct >= 0.4) return { rank: 'B', label: 'ANALYST', tone: 'text-kai-text' };
  return { rank: 'C', label: 'ROOKIE', tone: 'text-kai-muted' };
}

export function BugHunter({ onComplete }: BugHunterProps) {
  const [phase, setPhase] = useState<Phase>('playing');
  const [roundIndex, setRoundIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [lastPicked, setLastPicked] = useState<number>(-1);
  const [locked, setLocked] = useState(false);

  const round = ROUNDS[roundIndex];
  const maxScore = ROUNDS.length * ROUND_TIME;

  useEffect(() => {
    if (phase !== 'playing' || locked) return;
    if (timeLeft <= 0) {
      // Lost the round — fire from a zero-delay timer so setState doesn't
      // happen synchronously inside the effect body.
      const t = setTimeout(() => {
        setLocked(true);
        setFeedback('wrong');
        setLastPicked(-1);
        setResults((r) => [
          ...r,
          { roundIndex, correct: false, timeSpent: ROUND_TIME, pickedIndex: -1 },
        ]);
        setTimeout(() => advance(), 900);
      }, 0);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, roundIndex, locked]);

  function advance() {
    setFeedback(null);
    setLocked(false);
    setLastPicked(-1);
    setTimeLeft(ROUND_TIME);
    if (roundIndex + 1 >= ROUNDS.length) {
      setPhase('results');
    } else {
      setRoundIndex((i) => i + 1);
    }
  }

  function chooseLine(lineIdx: number) {
    if (locked) return;
    setLocked(true);
    setLastPicked(lineIdx);
    const spent = ROUND_TIME - timeLeft;
    const correct = lineIdx === round.bugIndex;
    setFeedback(correct ? 'correct' : 'wrong');
    setResults((r) => [
      ...r,
      { roundIndex, correct, timeSpent: spent, pickedIndex: lineIdx },
    ]);
    setTimeout(advance, 700);
  }

  const totalScore = results.reduce(
    (acc, r) => acc + (r.correct ? Math.max(0, ROUND_TIME - r.timeSpent) : 0),
    0,
  );
  const rank = rankFor(totalScore, maxScore);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {phase === 'playing' && (
          <motion.div
            key={`round-${roundIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-pixel text-[8px] text-kai-muted">
                ROUND {roundIndex + 1}/{ROUNDS.length}
              </span>
              <div className="flex items-center gap-2 font-pixel text-[8px]">
                <span className="text-kai-muted">TIME</span>
                <span
                  className={`px-2 py-0.5 border ${
                    timeLeft <= 4
                      ? 'border-kai-red text-kai-red animate-blink'
                      : 'border-kai-border text-white'
                  }`}
                >
                  {timeLeft.toString().padStart(2, '0')}s
                </span>
              </div>
            </div>

            <div className="kai-progress mb-4">
              <div
                className="h-full bg-kai-red transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / ROUND_TIME) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between mb-2 font-pixel text-[7px] text-kai-muted">
              <span>SCAN THE CODE — CLICK THE BUG</span>
              <span className="uppercase">{round.language}</span>
            </div>

            <motion.div
              animate={feedback === 'wrong' ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
              className={`pixel-border hud-panel font-mono text-xs leading-6 overflow-hidden ${
                feedback === 'correct'
                  ? 'border-green-400'
                  : feedback === 'wrong'
                    ? 'border-kai-red'
                    : ''
              }`}
            >
              <div className="px-3 py-1 border-b border-kai-border font-pixel text-[7px] text-kai-muted flex justify-between">
                <span>
                  editor.
                  {round.language === 'py' ? 'py' : round.language === 'ts' ? 'ts' : 'js'}
                </span>
                <span>{round.bugType.toUpperCase()}</span>
              </div>
              <div className="p-2">
                {round.lines.map((line, idx) => {
                  const isBugLine = idx === round.bugIndex;
                  const showCorrectHighlight = feedback === 'correct' && isBugLine;
                  const showWrongHighlight =
                    feedback === 'wrong' && lastPicked === idx && idx !== round.bugIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => chooseLine(idx)}
                      disabled={locked}
                      className={`w-full text-left flex gap-3 px-2 py-0.5 transition-colors ${
                        showCorrectHighlight
                          ? 'bg-green-500/20 text-green-300'
                          : showWrongHighlight
                            ? 'bg-kai-red/20 text-kai-red'
                            : 'hover:bg-kai-red/10 text-kai-text'
                      }`}
                    >
                      <span className="text-kai-muted select-none w-6 text-right">{idx + 1}</span>
                      <span className="whitespace-pre">{line || ' '}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div className="flex items-center justify-between mt-3 font-display text-[10px]">
              <span className="text-kai-muted">
                <span className="font-pixel text-[7px] text-kai-red mr-2">HINT</span>
                {round.hint}
              </span>
              <span className="font-pixel text-[8px] text-kai-muted">
                {results.filter((r) => r.correct).length}/{ROUNDS.length} BUGS
              </span>
            </div>
          </motion.div>
        )}

        {phase === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="text-center py-6"
          >
            <div className="font-pixel text-[8px] text-kai-muted mb-2">DEBUGGING COMPLETE</div>
            <div className={`font-pixel text-5xl ${rank.tone} text-glow mb-2`}>{rank.rank}</div>
            <div className="font-pixel text-sm text-white mb-1">{rank.label}</div>
            <div className="font-display text-sm text-kai-muted mb-6">
              Time banked:{' '}
              <span className="text-kai-red font-pixel text-xs">{totalScore}s</span> / {maxScore}s
            </div>

            <div className="grid grid-cols-6 gap-2 max-w-md mx-auto mb-6">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center border font-pixel text-[8px] ${
                    r.correct
                      ? 'border-green-400 text-green-300 bg-green-500/10'
                      : 'border-kai-red text-kai-red bg-kai-red/10'
                  }`}
                >
                  {r.correct ? `+${ROUND_TIME - r.timeSpent}` : '✕'}
                </div>
              ))}
            </div>

            <button
              onClick={onComplete}
              className="font-pixel text-[8px] px-6 py-2 bg-kai-red border border-kai-red text-white hover:bg-kai-red/80 transition-colors"
            >
              COMPLETE QUEST
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}