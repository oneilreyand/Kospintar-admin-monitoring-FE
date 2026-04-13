import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';

function RevenueAnalyticsCard({ data }) {
  const maxValue = Math.max(...data.series.map((item) => item.value), 1);
  const points = data.series
    .map((item, index) => {
      const x = (index / (data.series.length - 1 || 1)) * 100;
      const y = 100 - (item.value / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

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

      <div className="mt-8">
        <div className="rounded-[24px] bg-slate-950 p-5">
          <svg viewBox="0 0 100 100" className="h-60 w-full overflow-visible">
            <defs>
              <linearGradient id="marketingAreaFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon fill="url(#marketingAreaFill)" points={areaPoints} />
            <polyline
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2.4"
              points={points}
              vectorEffect="non-scaling-stroke"
            />
            {data.series.map((item, index) => {
              const x = (index / (data.series.length - 1 || 1)) * 100;
              const y = 100 - (item.value / maxValue) * 100;

              return (
                <g key={item.label}>
                  <circle cx={x} cy={y} r="2.2" fill="#f8fafc" />
                  <text
                    x={x}
                    y="108"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="4"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </SurfaceCard>
  );
}

export default RevenueAnalyticsCard;
