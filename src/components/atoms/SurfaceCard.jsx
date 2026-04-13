function SurfaceCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export default SurfaceCard;
