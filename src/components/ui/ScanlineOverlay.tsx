export function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)'
        }}
      />
      {/* Moving scanline */}
      <div
        className="pointer-events-none fixed left-0 w-full z-[9997] opacity-10"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, rgba(204,17,51,0.15), transparent)',
          animation: 'scanline 5s linear infinite',
          top: 0,
        }}
      />
      {/* CRT vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[9996]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)'
        }}
      />
    </>
  );
}
