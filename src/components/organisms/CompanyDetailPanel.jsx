import { 
  Building2, 
  CalendarClock, 
  DoorOpen, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CreditCard,
  MapPin,
  ChevronRight
} from 'lucide-react';
import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';
const formatNumber = (value) => new Intl.NumberFormat('id-ID').format(Number(value || 0));
const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
}).format(Number(value || 0));

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

function CompanyDetailPanel({ company }) {
  if (!company) {
    return (
      <SurfaceCard className="p-5">
        <p className="text-lg font-semibold text-slate-900">Company Overview</p>
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          Pilih company dari daftar untuk melihat detail operasional.
        </div>
      </SurfaceCard>
    );
  }

  const summaryItems = [
    {
      id: 'branches',
      icon: Building2,
      label: 'Cabang',
      value: `${formatNumber(company.branchCount)} lokasi`,
    },
    {
      id: 'rooms',
      icon: DoorOpen,
      label: 'Kamar',
      value: `${formatNumber(company.roomCount)} total`,
    },
    {
      id: 'tenants',
      icon: Users,
      label: 'Tenant Aktif',
      value: formatNumber(company.activeTenants),
    },
    {
      id: 'renewal',
      icon: CalendarClock,
      label: 'Valid Sampai',
      value: formatDate(company.subscription?.validUntil),
    },
  ];

  const occupancyRate = company.occupancyRate || 0;
  const avgRentPerTenant = company.activeTenants > 0 ? company.monthlyRevenue / company.activeTenants : 0;
  const avgRoomsPerBranch = company.branchCount > 0 ? company.roomCount / company.branchCount : 0;

  return (
    <SurfaceCard className="p-5">
      {/* Header Section */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xl font-bold tracking-tight text-slate-900">{company.name}</p>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={14} className="text-slate-400" />
            <span>{company.address}</span>
          </div>
        </div>
        <StatusBadge tone={company.lifecycle.tone}>{company.lifecycle.label}</StatusBadge>
      </div>

      {/* Primary Stats Grid */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm border border-slate-100">
                <Icon size={17} />
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400">{item.label}</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Analysis Sections */}
      <div className="mt-6 space-y-6">
        
        {/* Occupancy Analytics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">Performa Okupansi</h4>
            <span className={`text-sm font-bold ${occupancyRate > 80 ? 'text-emerald-600' : occupancyRate > 50 ? 'text-indigo-600' : 'text-rose-600'}`}>
              {occupancyRate}%
            </span>
          </div>
          <div className="mt-3 h-3 w-full rounded-full bg-slate-100 p-0.5">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                occupancyRate > 80 ? 'bg-emerald-500' : occupancyRate > 50 ? 'bg-indigo-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(occupancyRate, 100)}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="text-slate-500">{formatNumber(company.occupiedRooms)} Kamar Terisi</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <TrendingUp size={14} className="text-indigo-500" />
              <span>Target: 90%</span>
            </div>
          </div>
        </div>

        {/* Financial & Portfolio Insights */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-4">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <CreditCard size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Revenue Insight</span>
            </div>
            <p className="text-lg font-bold text-slate-900">{formatCurrency(company.monthlyRevenue)}</p>
            <p className="text-[10px] text-slate-500 mt-1 italic">
              Est. ARPU: {formatCurrency(avgRentPerTenant)}/tenant
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-4">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Building2 size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Portfolio Density</span>
            </div>
            <p className="text-lg font-bold text-slate-900">{avgRoomsPerBranch.toFixed(1)}</p>
            <p className="text-[10px] text-slate-500 mt-1 italic">
              Kamar per cabang (rata-rata)
            </p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className={`rounded-2xl border p-4 ${
          company.riskPriority === 'High' ? 'bg-rose-50 border-rose-100' : 
          company.riskPriority === 'Medium' ? 'bg-orange-50 border-orange-100' : 
          'bg-emerald-50 border-emerald-100'
        }`}>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className={
              company.riskPriority === 'High' ? 'text-rose-500' : 
              company.riskPriority === 'Medium' ? 'text-orange-500' : 
              'text-emerald-500'
            } />
            <h4 className={`text-xs font-bold uppercase tracking-widest ${
              company.riskPriority === 'High' ? 'text-rose-700' : 
              company.riskPriority === 'Medium' ? 'text-orange-700' : 
              'text-emerald-700'
            }`}>
              Analisis Risiko: {company.riskPriority} Priority
            </h4>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            {company.riskPriority === 'High' 
              ? `Perusahaan ini memiliki skor risiko tinggi (${company.riskScore}). Prioritaskan kontak untuk mencegah churn. Fokus pada peningkatan okupansi yang saat ini berada di bawah 60%.`
              : company.riskPriority === 'Medium'
              ? `Skor risiko menengah (${company.riskScore}). Pantau progres pembayaran dan pembaruan langganan dalam 30 hari ke depan.`
              : `Operasional berjalan stabil (Skor: ${company.riskScore}). Hubungi untuk penawaran upgrade plan atau ekspansi properti.`
            }
          </p>
        </div>

        {/* Improved Branch Detail List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-slate-900">Performa Per Unit</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{company.branches?.length} Cabang</span>
          </div>
          <div className="grid gap-3">
            {company.branches?.map((branch) => (
              <div
                key={branch.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{branch.name}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400 line-clamp-1">{branch.address}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold ${
                      branch.occupancyRate > 80 ? 'text-emerald-600' : 
                      branch.occupancyRate > 50 ? 'text-indigo-600' : 
                      'text-rose-600'
                    }`}>
                      {branch.occupancyRate}% Occupied
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="flex-grow">
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ${
                          branch.occupancyRate > 80 ? 'bg-emerald-500' : 
                          branch.occupancyRate > 50 ? 'bg-indigo-500' : 
                          'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(branch.occupancyRate, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 whitespace-nowrap">
                    <Users size={10} className="text-slate-400" />
                    <span>{branch.activeTenants}/{branch.totalRooms}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                    <ChevronRight size={10} className="text-slate-300" />
                    <span>Rev: {formatCurrency(branch.currentMonthlyRevenue)}</span>
                  </div>
                  <button className="text-[10px] font-bold text-brand-500 hover:text-brand-600">Detail &rsaquo;</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SurfaceCard>
  );
}

export default CompanyDetailPanel;
