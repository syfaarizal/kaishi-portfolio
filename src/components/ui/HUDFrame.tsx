import { type ReactNode } from 'react';

interface HUDFrameProps {
  children: ReactNode;
  title?: string;
  className?: string;
  topRight?: ReactNode;
}

export function HUDFrame({ children, title, className = '', topRight }: HUDFrameProps) {
  return (
    <div
      className={`pixel-border hud-panel ${className}`}
      style={{ position: 'relative' }}
    >
      {title && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-kai-border">
          <div className="flex items-center gap-2">
            <span className="text-kai-red text-xs">◆</span>
            <span className="font-pixel text-[9px] text-kai-red tracking-widest">{title}</span>
            <span className="text-kai-red text-xs">◆</span>
          </div>
          {topRight && <div>{topRight}</div>}
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export function ProgressBar({ value, max = 100, label, color = '#cc1133' }: ProgressBarProps) {
  const pct = (value / max) * 100;
  return (
    <div className="space-y-0.5">
      {label && (
        <div className="flex justify-between font-mono text-[10px] text-kai-muted">
          <span>{label}</span>
          <span style={{ color }}>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="kai-progress rounded-sm">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}
