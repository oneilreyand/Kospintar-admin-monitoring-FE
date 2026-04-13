import ProgressBar from '../atoms/ProgressBar';

function GoalProgressItem({ item }) {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
          <p className="text-xs text-slate-500">{item.caption}</p>
        </div>
        <span className="text-sm font-semibold text-slate-700">{item.value}</span>
      </div>
      <ProgressBar value={item.progress} tone={item.barClass} />
    </div>
  );
}

export default GoalProgressItem;
