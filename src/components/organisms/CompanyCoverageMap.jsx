import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { useEffect } from 'react';

const formatNumber = (value) => new Intl.NumberFormat('id-ID').format(Number(value || 0));

// --- Leaflet Custom Icons & Components ---
const createCustomMarkerIcon = () => {
  return L.divIcon({
    html: `<span class="relative flex h-4 w-4 transition-transform hover:scale-150">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 border-2 border-white bg-indigo-600 shadow-lg"></span>
          </span>`,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span class="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 border border-indigo-200 shadow-sm">
             <span class="text-indigo-800 font-bold text-xs ring-2 ring-indigo-500 rounded-full h-full w-full flex items-center justify-center bg-white shadow-md">${cluster.getChildCount()}</span>
             <span class="absolute -inset-1.5 rounded-full border border-indigo-300/60 animate-pulse"></span>
           </span>`,
    className: 'custom-marker-cluster',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

function MapBoundsHelper({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points && points.length > 0) {
      const bounds = points.map(p => [p.latitude, p.longitude]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [map, points]);
  return null;
}
// ------------------------------------------

function CompanyCoverageMap({ mapPoints, title = 'Sebaran Company per Wilayah' }) {
  const regionalBreakdown = mapPoints.reduce((accumulator, point) => {
    if (!accumulator[point.city]) {
      accumulator[point.city] = { city: point.city, branches: 0, tenants: 0, totalRooms: 0 };
    }
    accumulator[point.city].branches += 1;
    accumulator[point.city].tenants += point.activeTenants || 0;
    accumulator[point.city].totalRooms += point.roomCount || 0;
    return accumulator;
  }, {});

  const regions = Object.values(regionalBreakdown).map(region => ({
    ...region,
    occupancyRate: region.totalRooms > 0 ? Math.round((region.tenants / region.totalRooms) * 100) : 0
  })).sort((left, right) => right.branches - left.branches);

  // Default Indonesia Center (will be overridden by MapBoundsHelper if points exist)
  const center = [-2.5, 118.0];
  const zoom = 5;

  return (
    <SurfaceCard className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Peta interaktif distribusi cabang dan unit bisnis.
          </p>
        </div>
        <StatusBadge tone="info">{mapPoints.length} Lokasi Terdaftar</StatusBadge>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        {/* Map Container */}
        <div className="relative h-[480px] overflow-hidden rounded-3xl border border-slate-200 shadow-inner group z-0">
          <MapContainer 
            center={center} 
            zoom={zoom} 
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            <MapBoundsHelper points={mapPoints} />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
              maxClusterRadius={50}
              spiderfyOnMaxZoom={true}
            >
              {mapPoints.map((point) => (
                <Marker
                  key={point.id}
                  position={[point.latitude, point.longitude]}
                  icon={createCustomMarkerIcon()}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                    <div className="min-w-32 py-1">
                      <p className="text-xs font-bold text-slate-900">{point.branchName}</p>
                      <p className="text-[10px] text-slate-500">{point.companyName}</p>
                      <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
                        <span className="text-slate-400 font-medium">{point.city}</span>
                        <span className="font-bold text-indigo-600">{point.activeTenants || 0} Tenants</span>
                      </div>
                    </div>
                  </Tooltip>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>

          {!mapPoints.length && (
            <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center p-12 text-center bg-white/50 backdrop-blur-[2px]">
              <div className="h-16 w-16 rounded-full bg-white/80 shadow-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-700">Belum ada titik koordinat cabang.</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-tight">Syncing with backend...</p>
            </div>
          )}
        </div>

        {/* Region Statistics */}
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-5 flex-grow">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Okupansi per Unit</h4>
            <div className="space-y-4">
              {regions.length > 0 ? (
                regions.slice(0, 6).map((region, idx) => (
                  <div key={region.city} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 truncate max-w-[140px]">{region.city || 'Luar Kota'}</span>
                      <span className="text-slate-400 font-medium">{formatNumber(region.branches)} Unit</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${region.occupancyRate > 80 ? 'bg-emerald-500' : region.occupancyRate > 50 ? 'bg-indigo-500' : 'bg-rose-500'}`}
                        style={{ width: `${region.occupancyRate}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-slate-400">{formatNumber(region.tenants)} dari {formatNumber(region.totalRooms)} Kamar</p>
                      <span className={`text-[10px] font-bold ${region.occupancyRate > 80 ? 'text-emerald-600' : region.occupancyRate > 50 ? 'text-indigo-600' : 'text-rose-600'}`}>
                        {region.occupancyRate}% Okupansi
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-slate-300">
                  <p className="text-[10px] uppercase tracking-widest italic">Tidak ada data statistik</p>
                </div>
              )}
            </div>
            {regions.length > 6 && (
              <button className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:bg-white transiton-all hover:shadow-sm">
                Lihat Semua ({regions.length})
              </button>
            )}
          </div>
          
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/30 p-5">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-bold">Informasi Peta</p>
            </div>
            <p className="text-[10px] text-indigo-900/60 leading-relaxed font-medium">
              Gunakan scroll atau tombol kontrol untuk mengatur zoom level. Lokasi dihitung berdasarkan real-time koordinat dari monitoring service.
            </p>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

export default CompanyCoverageMap;


