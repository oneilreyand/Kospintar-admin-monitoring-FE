import SurfaceCard from '../atoms/SurfaceCard';
import TrafficSourceRow from '../molecules/TrafficSourceRow';
import SectionHeading from '../molecules/SectionHeading';

function TrafficChannelsCard({ channels }) {
  return (
    <SurfaceCard className="p-6">
      <SectionHeading
        title="Traffic Channels"
        subtitle="Sumber traffic dan channel growth Kospintar."
        badge={(
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Live Mix
          </span>
        )}
      />

      <div className="mt-6 grid gap-3">
        {channels.map((source) => (
          <TrafficSourceRow key={source.name} source={source} />
        ))}
      </div>
    </SurfaceCard>
  );
}

export default TrafficChannelsCard;
