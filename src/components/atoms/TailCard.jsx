function TailCard({ title, children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-border bg-white shadow-[0_10px_28px_rgba(44,62,80,0.06)] ${className}`.trim()}>
      <header className="px-6 py-5">
        <h3 className="text-base font-semibold text-navy">{title}</h3>
      </header>
      <div className="border-t border-border px-6 py-6.5">{children}</div>
    </section>
  );
}

export default TailCard;
