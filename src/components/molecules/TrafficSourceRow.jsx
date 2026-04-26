import ProgressBar from '../atoms/ProgressBar';

function TrafficSourceRow({ source }) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${source.dotClass}`} />
          <div>
            <p className="text-sm font-semibold text-navy">{source.name}</p>
            <p className="text-xs text-text-secondary">{source.detail}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-navy">{source.visitors}</p>
          <p className="text-xs text-text-secondary">{source.conversion}</p>
        </div>
      </div>
      <ProgressBar value={source.progress} tone={source.barClass} />
    </div>
  );
}

export default TrafficSourceRow;
