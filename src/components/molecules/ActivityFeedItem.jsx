import StatusBadge from '../atoms/StatusBadge';

function ActivityFeedItem({ item }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
      <div className={`mt-1 h-3 w-3 shrink-0 rounded-full ${item.dotClass}`} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold text-slate-900">{item.title}</p>
          <StatusBadge tone={item.tone}>{item.time}</StatusBadge>
        </div>
        <p className="mt-1 text-sm text-slate-600">{item.description}</p>
      </div>
    </div>
  );
}

export default ActivityFeedItem;
