import SurfaceCard from '../atoms/SurfaceCard';

function MarketingHero({ hero }) {
  const safeHero = hero ?? {
    badge: '',
    title: '',
    description: '',
    pills: [],
    highlights: [],
  };

  return (
    <SurfaceCard className="overflow-hidden border-navy/30 bg-navy text-white">
      <div className="px-6 py-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(45,204,112,0.28),transparent_35%),linear-gradient(135deg,#2c3e50_0%,#1f2d3a_45%,#25b463_100%)] p-8">
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-primary/30 blur-2xl" />
          <div className="relative space-y-4">
            <span className="inline-flex items-center rounded-full border border-white px-3 py-1 text-xs font-semibold text-white">
              {safeHero.badge}
            </span>
            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white lg:text-4xl">
                {safeHero.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85 lg:text-base">
                {safeHero.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {safeHero.pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
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
