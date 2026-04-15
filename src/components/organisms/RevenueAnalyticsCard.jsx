import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';
import MarketingChart from '../atoms/MarketingChart';

function RevenueAnalyticsCard({ data }) {
  return (
    <SurfaceCard className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{data.title}</p>
          <p className="mt-1 text-sm text-slate-500">{data.subtitle}</p>
        </div>
        <StatusBadge tone="success">{data.badge}</StatusBadge>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">{data.total}</h2>
          <p className="mt-2 text-sm text-slate-500">{data.caption}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {data.summary.map((item) => (
            <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <MarketingChart 
          series={data.series} 
          categories={data.categories} 
          height={320} 
        />
      </div>
    </SurfaceCard>
  );
}

export default RevenueAnalyticsCard;

