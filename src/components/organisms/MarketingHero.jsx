import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';

function MarketingHero({ hero }) {
  const safeHero = hero ?? {
    badge: '',
    title: '',
    description: '',
    pills: [],
    highlights: [],
  };

  return (
    <SurfaceCard className="overflow-hidden border-slate-800 bg-slate-950 text-white">
      <div className="px-6 py-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_35%),linear-gradient(135deg,#111827_0%,#0f172a_45%,#1d4ed8_100%)] p-8">
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="relative space-y-4">
            <StatusBadge tone="info">{safeHero.badge}</StatusBadge>
            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white lg:text-4xl">
                {safeHero.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 lg:text-base">
                {safeHero.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {safeHero.pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

export default MarketingHero;
