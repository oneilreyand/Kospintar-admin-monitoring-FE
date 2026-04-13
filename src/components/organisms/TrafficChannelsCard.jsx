import SurfaceCard from '../atoms/SurfaceCard';
import TrafficSourceRow from '../molecules/TrafficSourceRow';

function TrafficChannelsCard({ channels }) {
  return (
    <SurfaceCard className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Traffic Channels</p>
          <p className="mt-1 text-sm text-slate-500">Sumber traffic dan channel growth Kospintar.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Live Mix
        </span>
      </div>

      <div className="mt-6 grid gap-3">
        {channels.map((source) => (
          <TrafficSourceRow key={source.name} source={source} />
        ))}
      </div>
    </SurfaceCard>
  );
}

export default TrafficChannelsCard;
