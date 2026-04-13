import ProgressBar from '../atoms/ProgressBar';

function TrafficSourceRow({ source }) {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${source.dotClass}`} />
          <div>
            <p className="text-sm font-semibold text-slate-900">{source.name}</p>
            <p className="text-xs text-slate-500">{source.detail}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">{source.visitors}</p>
          <p className="text-xs text-slate-500">{source.conversion}</p>
        </div>
      </div>
      <ProgressBar value={source.progress} tone={source.barClass} />
    </div>
  );
}

export default TrafficSourceRow;
