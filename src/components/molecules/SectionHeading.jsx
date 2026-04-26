function SectionHeading({
  title,
  subtitle,
  action = null,
  badge = null,
  className = '',
}) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 ${className}`.trim()}>
      <div>
        <p className="text-sm font-semibold text-navy">{title}</p>
        {subtitle ? (
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        ) : null}
      </div>

      {action || badge ? (
        <div className="flex flex-wrap items-center gap-2">
          {badge}
          {action}
        </div>
      ) : null}
    </div>
  );
}

export default SectionHeading;
