import ProgressBar from '../atoms/ProgressBar';

function GoalProgressItem({ item }) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-navy">{item.label}</p>
          <p className="text-xs text-text-secondary">{item.caption}</p>
        </div>
        <span className="text-sm font-semibold text-navy">{item.value}</span>
      </div>
      <ProgressBar value={item.progress} tone={item.barClass} />
    </div>
  );
}

export default GoalProgressItem;
