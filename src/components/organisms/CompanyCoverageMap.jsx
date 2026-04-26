import { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Maximize2, Minimize2, LocateFixed, Loader2, 
  X, Layers, Info, Map as MapIcon, RotateCcw
} from 'lucide-react';
import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';

// Fix for Leaflet default icons if needed (though we use custom icons)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const formatNumber = (value) => new Intl.NumberFormat('id-ID').format(Number(value || 0));

// --- Leaflet Custom Icons & Components ---
const createCustomMarkerIcon = () => {
  return L.divIcon({
    html: `<div class="relative flex h-5 w-5 transition-transform hover:scale-125">
            <div class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DCC70] opacity-40"></div>
            <div class="relative inline-flex rounded-full h-5 w-5 border-2 border-white bg-[#25b463] shadow-[0_2px_10px_rgba(37,180,99,0.4)] flex items-center justify-center">
              <div class="h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>
          </div>`,
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const createClusterCustomIcon = function (cluster) {
  const count = cluster.getChildCount();
  let size = 'h-8 w-8';
  let innerSize = 'h-full w-full';
  let font = 'text-[10px]';
  
  if (count > 10) {
    size = 'h-10 w-10';
    font = 'text-xs';
  }
  if (count > 50) {
    size = 'h-12 w-12';
    font = 'text-sm';
  }

  return L.divIcon({
    html: `<div class="relative flex ${size} items-center justify-center">
             <div class="absolute inset-0 rounded-full bg-[#2DCC70]/20 animate-pulse"></div>
             <div class="relative ${innerSize} rounded-full bg-white border-2 border-[#2DCC70] flex items-center justify-center shadow-[0_4px_15_rgba(45,204,112,0.3)]">
               <span class="text-[#1e8550] font-black ${font}">${count}</span>
             </div>
           </div>`,
    className: 'custom-marker-cluster',
    iconSize: size.includes('12') ? [48, 48] : size.includes('10') ? [40, 40] : [32, 32],
    iconAnchor: size.includes('12') ? [24, 24] : size.includes('10') ? [20, 20] : [16, 16],
  });
};

function MapController({ points, locateCoords, onLocateComplete }) {
  const map = useMap();
  
  // Fit bounds when points change
  useEffect(() => {
    if (points && points.length > 0) {
      const bounds = points.map(p => [p.latitude, p.longitude]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [map, points]);

  // Handle manual locate
  useEffect(() => {
    if (locateCoords) {
      map.flyTo([locateCoords.lat, locateCoords.lng], 16, {
        duration: 1.5,
        easeLinearity: 0.25
      });
      onLocateComplete();
    }
  }, [locateCoords, map, onLocateComplete]);

  return null;
}

// ------------------------------------------

function CompanyCoverageMap({ 
  mapPoints, 
  title = 'Sebaran Company per Wilayah', 
  onResetSelection,
  hideStats = false 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locateCoords, setLocateCoords] = useState(null);
  const [error, setError] = useState('');

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

  const center = [-2.5, 118.0];
  const zoom = 5;

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setError('Browser tidak mendukung geolokasi.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocateCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLocating(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Gagal mengambil lokasi saat ini.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const mapContent = (
    <div className={`relative flex flex-col gap-4 ${isExpanded ? 'h-full' : ''}`}>
      {/* Search & Map Overlay Controls */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center justify-between pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          {onResetSelection && (
            <button 
              onClick={onResetSelection}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-border text-navy hover:bg-gray-50 transition-all font-bold text-xs"
              title="Tampilkan Semua Lokasi"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Semua Lokasi</span>
            </button>
          )}
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={handleLocateMe}
            disabled={isLocating}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-border text-navy hover:bg-gray-50 transition-all disabled:opacity-50"
            title="Lokasi Saya"
          >
            {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <LocateFixed className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-border text-navy hover:bg-gray-50 transition-all"
            title={isExpanded ? "Kecilkan" : "Perbesar"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className={`relative w-full overflow-hidden rounded-3xl border border-border shadow-inner group ${isExpanded ? 'flex-1 min-h-0' : hideStats ? 'h-[600px]' : 'h-[480px]'}`}>
        <MapContainer 
          center={center} 
          zoom={zoom} 
          scrollWheelZoom={true}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <MapController 
            points={mapPoints} 
            locateCoords={locateCoords} 
            onLocateComplete={() => setLocateCoords(null)} 
          />

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
                  <div className="min-w-40 p-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded bg-primary/10 text-primary">
                        <MapIcon className="w-3 h-3" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-tight text-primary">Branch Detail</p>
                        <p className="text-xs font-bold text-navy leading-none">{point.branchName}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 border-t border-border pt-2 mt-2">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-text-secondary">Company</span>
                        <span className="font-bold text-navy">{point.companyName}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-text-secondary">Kota</span>
                        <span className="font-bold text-navy">{point.city}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] bg-background p-1.5 rounded-lg border border-border mt-1">
                        <span className="font-bold text-primary">{point.activeTenants || 0} Tenants</span>
                        <span className="text-text-secondary">{point.roomCount || 0} Rooms</span>
                      </div>
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>

        {error && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1001] bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl animate-bounce flex items-center gap-2">
            <Info className="w-3 h-3" />
            {error}
            <button onClick={() => setError('')} className="ml-2 hover:opacity-70"><X className="w-3 h-3" /></button>
          </div>
        )}

        {!mapPoints.length && (
          <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center p-12 text-center bg-white/50 backdrop-blur-[2px]">
            <div className="h-20 w-20 rounded-3xl bg-white shadow-2xl flex items-center justify-center mb-6 animate-pulse">
              <MapIcon className="h-10 w-10 text-border" />
            </div>
            <p className="text-lg font-black text-navy uppercase tracking-tighter">Tidak Ada Titik Koordinat</p>
            <p className="mt-2 text-sm font-medium text-text-secondary max-w-xs">
              Sinkronisasi data backend gagal atau memang belum ada titik cabang terdaftar.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const mainContent = (
    <div className={`mt-6 grid gap-6 ${hideStats ? 'grid-cols-1' : 'lg:grid-cols-[1.4fr_0.6fr]'}`}>
      {/* Map Container */}
      <div className="z-0">
        {mapContent}
      </div>

      {/* Region Statistics */}
      {!hideStats && (
        <div className="flex flex-col gap-4">
          <div className="flex-grow rounded-3xl border border-border bg-background p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-navy/5 text-navy">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-navy">Okupansi per Wilayah</h4>
            </div>

            <div className="space-y-6">
              {regions.length > 0 ? (
                regions.slice(0, 6).map((region) => (
                  <div key={region.city} className="group flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-navy group-hover:text-primary transition-colors">{region.city || 'Luar Kota'}</span>
                      <span className="text-[10px] font-bold text-text-secondary px-2 py-0.5 rounded-full bg-border/40">{formatNumber(region.branches)} Unit</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-border shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${region.occupancyRate > 80 ? 'bg-success-500 shadow-[0_0_8px_rgba(46,204,113,0.4)]' : region.occupancyRate > 50 ? 'bg-primary shadow-[0_0_8px_rgba(45,204,112,0.4)]' : 'bg-danger shadow-[0_0_8px_rgba(231,76,60,0.4)]'}`}
                        style={{ width: `${region.occupancyRate}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-text-secondary">{formatNumber(region.tenants)} / {formatNumber(region.totalRooms)} Kamar</p>
                      <span className={`text-[10px] font-black ${region.occupancyRate > 80 ? 'text-success-700' : region.occupancyRate > 50 ? 'text-primary' : 'text-error-700'}`}>
                        {region.occupancyRate}% Okupansi
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-64 flex-col items-center justify-center text-center opacity-40">
                  <div className="h-12 w-12 rounded-full border-2 border-dashed border-border flex items-center justify-center mb-4">
                    <Info className="w-6 h-6 text-border" />
                  </div>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em]">Tidak Ada Data Statistik</p>
                </div>
              )}
            </div>
            
            {regions.length > 6 && (
              <button className="mt-8 w-full rounded-2xl border border-border bg-white py-3.5 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:bg-navy hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg">
                Lihat Semua ({regions.length})
              </button>
            )}
          </div>
          
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <Info className="w-24 h-24 text-primary" />
            </div>
            <div className="mb-3 flex items-center gap-2 text-primary">
              <div className="p-1 rounded-lg bg-primary/20">
                <Info className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs font-black uppercase tracking-tight">Tips Monitoring</p>
            </div>
            <p className="text-[10px] font-bold leading-relaxed text-navy/70">
              Gunakan tombol <span className="text-primary">Perbesar</span> untuk melihat detail sebaran di seluruh Indonesia. Klik pada angka kelompok untuk melihat koordinat presisi.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <SurfaceCard className="p-6 relative z-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
              <MapIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-navy uppercase tracking-tighter">{title}</h3>
              <p className="mt-1 text-sm font-medium text-text-secondary">
                Peta interaktif distribusi cabang dan unit bisnis real-time.
              </p>
            </div>
          </div>
          <StatusBadge tone="info" className="font-black px-4 py-2 rounded-xl border-2 border-primary/10">
            {mapPoints.length} Lokasi Terdaftar
          </StatusBadge>
        </div>

        {mainContent}
      </SurfaceCard>

      {isExpanded && createPortal(
        <div className="fixed inset-0 z-[9999] bg-navy/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 w-full h-full max-w-7xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col p-6 sm:p-8 relative border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
                  <MapIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-navy uppercase tracking-tighter">Global Coverage View</h3>
                  <p className="text-sm font-medium text-text-secondary">Analisis spasial seluruh cabang dan okupansi unit</p>
                </div>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all duration-300 shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 min-h-0 bg-background rounded-3xl border border-border overflow-hidden relative">
              {mapContent}
            </div>

            <div className="mt-6 flex items-center justify-between px-2">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success-500 shadow-[0_0_8px_rgba(46,204,113,0.4)]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-navy">High Occupancy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_rgba(45,204,112,0.4)]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-navy">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-danger shadow-[0_0_8px_rgba(231,76,60,0.4)]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-navy">Low</span>
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Kospintar Monitoring Engine v1.0</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default CompanyCoverageMap;
