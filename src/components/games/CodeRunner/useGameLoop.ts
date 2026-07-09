import { useEffect, useRef } from 'react';

/**
 * Runs `callback(deltaSeconds)` on every animation frame while `isRunning` is true.
 * Delta time is capped to avoid a "spiral of death" after tab-switch / lag spikes.
 */
export function useGameLoop(callback: (dt: number) => void, isRunning: boolean) {
  const callbackRef = useRef(callback);
  const frameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isRunning) {
      lastTimeRef.current = null;
      return;
    }

    const tick = (time: number) => {
      if (lastTimeRef.current !== null) {
        const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
        callbackRef.current(dt);
      }
      lastTimeRef.current = time;
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isRunning]);
}
