import { useMemo } from 'react';

interface Particle {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: ((i * 7) % 3) + 1.5,
    left: (i * 17.3) % 100,
    duration: 10 + ((i * 5.1) % 15),
    delay: (i * 1.7) % 10,
    opacity: 0.15 + ((i * 0.11) % 0.45),
  }));
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const particles = useMemo(() => createParticles(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-kai-red particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-10px',
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 4px #cc1133',
          }}
        />
      ))}
    </div>
  );
}
