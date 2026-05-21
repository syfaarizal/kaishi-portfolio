export function PixelGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{
        backgroundImage: 'linear-gradient(rgba(204,17,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,17,51,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
  );
}
