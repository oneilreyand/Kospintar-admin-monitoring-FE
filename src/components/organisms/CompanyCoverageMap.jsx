import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';

const MAP_BOUNDS = {
  minLat: -11.0,
  maxLat: 6.5,
  minLon: 95.0,
  maxLon: 141.5,
};

const formatNumber = (value) => new Intl.NumberFormat('id-ID').format(Number(value || 0));

const toMapPosition = (latitude, longitude) => {
  const x = ((longitude - MAP_BOUNDS.minLon) / (MAP_BOUNDS.maxLon - MAP_BOUNDS.minLon)) * 100;
  const y = (1 - ((latitude - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat))) * 100;

  return {
    x: Math.min(Math.max(x, 2), 98),
    y: Math.min(Math.max(y, 2), 98),
  };
};

function CompanyCoverageMap({ mapPoints }) {
  const regionalBreakdown = mapPoints.reduce((accumulator, point) => {
    if (!accumulator[point.city]) {
      accumulator[point.city] = { city: point.city, branches: 0, tenants: 0 };
    }
    accumulator[point.city].branches += 1;
    accumulator[point.city].tenants += point.activeTenants || 0;
    return accumulator;
  }, {});

  const regions = Object.values(regionalBreakdown).sort((left, right) => right.branches - left.branches);

  return (
    <SurfaceCard className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-slate-900">Sebaran Company per Wilayah</p>
          <p className="mt-1 text-sm text-slate-500">
            Pemetaan berdasarkan koordinat `latitude/longitude` tiap cabang di backend.
          </p>
        </div>
        <StatusBadge tone="info">{mapPoints.length} titik lokasi</StatusBadge>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[280px] rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_100%)] p-4">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300/70" />
          <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300/70" />
          <div className="absolute inset-0 rounded-[24px] [background-image:radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.2)_1px,transparent_0)] [background-size:18px_18px]" />

          {mapPoints.map((point) => {
            const position = toMapPosition(point.latitude, point.longitude);
            return (
              <div
                key={point.id}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
              >
                <span className="inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-500 shadow-md" />
                <div className="pointer-events-none absolute left-1/2 top-5 z-10 hidden w-44 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-lg group-hover:block">
                  <p className="font-semibold text-slate-900">{point.branchName}</p>
                  <p>{point.companyName}</p>
                  <p>{point.city}</p>
                </div>
              </div>
            );
          })}

          {!mapPoints.length ? (
            <div className="absolute inset-0 grid place-items-center text-sm text-slate-500">
              Belum ada titik koordinat cabang.
            </div>
          ) : null}
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-900">Coverage Wilayah</p>
          <div className="mt-3 grid gap-2">
            {regions.slice(0, 6).map((region) => (
              <div
                key={region.city}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <span className="text-sm text-slate-700">{region.city}</span>
                <span className="text-xs font-semibold text-slate-500">
                  {formatNumber(region.branches)} cabang • {formatNumber(region.tenants)} tenant
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

export default CompanyCoverageMap;
