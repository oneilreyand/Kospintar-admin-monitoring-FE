function TailCard({ title, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-white ${className}`.trim()}>
      <header className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800">{title}</h3>
      </header>
      <div className="border-t border-gray-100 px-6 py-6.5">{children}</div>
    </section>
  );
}

export default TailCard;
