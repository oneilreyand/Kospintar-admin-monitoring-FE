import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';

function StatCard({ icon, label, value, delta, tone = 'info' }) {
  return (
    <SurfaceCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-navy">
          {icon}
        </span>
        <StatusBadge tone={tone}>{delta}</StatusBadge>
      </div>
      <div className="mt-6">
        <p className="text-sm text-text-secondary">{label}</p>
        <h3 className="mt-2 text-3xl font-bold tracking-tight text-navy">{value}</h3>
      </div>
    </SurfaceCard>
  );
}

export default StatCard;
