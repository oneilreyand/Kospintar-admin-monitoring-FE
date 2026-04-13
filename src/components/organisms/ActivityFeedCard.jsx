import SurfaceCard from '../atoms/SurfaceCard';
import ActivityFeedItem from '../molecules/ActivityFeedItem';

function ActivityFeedCard({ items }) {
  return (
    <SurfaceCard className="p-6">
      <div>
        <p className="text-sm font-semibold text-slate-900">Recent Activity</p>
        <p className="mt-1 text-sm text-slate-500">Perubahan campaign, creative, dan source attribution.</p>
      </div>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <ActivityFeedItem key={`${item.time}-${item.title}`} item={item} />
        ))}
      </div>
    </SurfaceCard>
  );
}

export default ActivityFeedCard;
