import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';
import MarketingChart from '../atoms/MarketingChart';
import SectionHeading from '../molecules/SectionHeading';

function RevenueAnalyticsCard({ data }) {
  return (
    <SurfaceCard className="p-6">
      <SectionHeading
        title={data.title}
        subtitle={data.subtitle}
        badge={<StatusBadge tone="success">{data.badge}</StatusBadge>}
      />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-navy">{data.total}</h2>
          <p className="mt-2 text-sm text-text-secondary">{data.caption}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {data.summary.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-background px-4 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-navy">{item.value}</p>
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
