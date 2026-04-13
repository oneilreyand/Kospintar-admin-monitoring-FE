const toneClasses = {
  neutral: 'bg-slate-100 text-slate-600',
  success: 'bg-emerald-50 text-emerald-600',
  info: 'bg-sky-50 text-sky-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-rose-50 text-rose-600',
  violet: 'bg-violet-50 text-violet-600',
};

function StatusBadge({ children, tone = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone] || toneClasses.neutral}`}
    >
      {children}
    </span>
  );
}

export default StatusBadge;
