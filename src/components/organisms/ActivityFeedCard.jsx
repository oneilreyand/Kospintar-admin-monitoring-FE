import SurfaceCard from '../atoms/SurfaceCard';
import ActivityFeedItem from '../molecules/ActivityFeedItem';
import SectionHeading from '../molecules/SectionHeading';

function ActivityFeedCard({ items }) {
  return (
    <SurfaceCard className="p-6">
      <SectionHeading
        title="Recent Activity"
        subtitle="Perubahan campaign, creative, dan source attribution."
      />

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <ActivityFeedItem key={`${item.time}-${item.title}`} item={item} />
        ))}
      </div>
    </SurfaceCard>
  );
}

export default ActivityFeedCard;
