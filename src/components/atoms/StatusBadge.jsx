const toneClasses = {
  neutral: 'border border-border bg-background text-text-secondary',
  success: 'border border-success-100 bg-success-50 text-success-700',
  info: 'border border-navy/15 bg-navy/10 text-navy',
  warning: 'border border-warning/30 bg-warning/10 text-warning-700',
  danger: 'border border-danger/30 bg-danger/10 text-error-700',
  violet: 'border border-promo/30 bg-promo/10 text-promo',
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
