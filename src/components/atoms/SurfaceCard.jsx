function SurfaceCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-3xl border border-border bg-white shadow-[0_10px_28px_rgba(44,62,80,0.06)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export default SurfaceCard;
