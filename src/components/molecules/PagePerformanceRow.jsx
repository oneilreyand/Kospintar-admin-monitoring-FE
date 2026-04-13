import StatusBadge from '../atoms/StatusBadge';

function PagePerformanceRow({ page }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4">
      <div className="min-w-0">
        <p className="truncate font-semibold text-slate-900">{page.path}</p>
        <p className="text-sm text-slate-500">{page.sessions}</p>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge tone={page.bounceTone}>{page.bounce}</StatusBadge>
        <span className="text-sm font-semibold text-slate-700">{page.conversion}</span>
      </div>
    </div>
  );
}

export default PagePerformanceRow;
