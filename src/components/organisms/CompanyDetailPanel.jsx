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
        <p className="text-lg font-semibold text-navy">Company Overview</p>
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-background px-4 py-8 text-center text-sm text-text-secondary">
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
  const overdueBillingCount = Number(company.metrics?.overdueBillingCount || 0);
  const unpaidBillingAmount = Number(company.metrics?.unpaidBillingAmount || 0);
  const expiringContracts = Number(company.metrics?.expiringContracts || 0);
  const maintenanceRooms = Number(company.maintenanceRooms || 0);
  const maintenanceRate = Number(company.metrics?.maintenanceRate || 0);

  return (
    <SurfaceCard className="p-5">
      {/* Header Section */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xl font-bold tracking-tight text-navy">{company.name}</p>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary">
            <MapPin size={14} className="text-text-secondary" />
            <span>{company.address}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge tone={company.lifecycle.tone}>{company.lifecycle.label}</StatusBadge>
          <StatusBadge tone={company.health.tone}>{company.health.label} ({company.health.score})</StatusBadge>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="rounded-2xl border border-border bg-background p-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-navy shadow-sm">
                <Icon size={17} />
              </div>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">{item.label}</p>
              <p className="mt-1 text-sm font-bold text-navy">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Analysis Sections */}
      <div className="mt-6 space-y-6">
        
        {/* Occupancy Analytics */}
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-navy">Performa Okupansi</h4>
            <span className={`text-sm font-bold ${occupancyRate > 80 ? 'text-success-700' : occupancyRate > 50 ? 'text-primary' : 'text-error-700'}`}>
              {occupancyRate}%
            </span>
          </div>
          <div className="mt-3 h-3 w-full rounded-full bg-background p-0.5">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                occupancyRate > 80 ? 'bg-success-500' : occupancyRate > 50 ? 'bg-primary' : 'bg-danger'
              }`}
              style={{ width: `${Math.min(occupancyRate, 100)}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-border" />
              <span className="text-text-secondary">{formatNumber(company.occupiedRooms)} Kamar Terisi</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-navy">
              <TrendingUp size={14} className="text-primary" />
              <span>Target: 90%</span>
            </div>
          </div>
        </div>

        {/* Financial & Portfolio Insights */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2 text-text-secondary">
              <CreditCard size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Revenue Insight</span>
            </div>
            <p className="text-lg font-bold text-navy">{formatCurrency(company.monthlyRevenue)}</p>
            <p className="mt-1 text-[10px] italic text-text-secondary">
              Est. ARPU: {formatCurrency(avgRentPerTenant)}/tenant
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2 text-text-secondary">
              <Building2 size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Portfolio Density</span>
            </div>
            <p className="text-lg font-bold text-navy">{avgRoomsPerBranch.toFixed(1)}</p>
            <p className="mt-1 text-[10px] italic text-text-secondary">
              Kamar per cabang (rata-rata)
            </p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className={`rounded-2xl border p-4 ${
          company.riskPriority === 'High' ? 'border-danger/20 bg-danger/10' : 
          company.riskPriority === 'Medium' ? 'border-warning/20 bg-warning/10' : 
          'border-success-100 bg-success-50'
        }`}>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className={
              company.riskPriority === 'High' ? 'text-danger' : 
              company.riskPriority === 'Medium' ? 'text-warning' : 
              'text-success-600'
            } />
            <h4 className={`text-xs font-bold uppercase tracking-widest ${
              company.riskPriority === 'High' ? 'text-error-700' : 
              company.riskPriority === 'Medium' ? 'text-warning-700' : 
              'text-success-700'
            }`}>
              Analisis Risiko: {company.riskPriority} Priority
            </h4>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-navy">
            {company.riskPriority === 'High' 
              ? `Perusahaan ini memiliki skor risiko tinggi (${company.riskScore}). Prioritaskan kontak untuk mencegah churn. Fokus pada peningkatan okupansi yang saat ini berada di bawah 60%.`
              : company.riskPriority === 'Medium'
              ? `Skor risiko menengah (${company.riskScore}). Pantau progres pembayaran dan pembaruan langganan dalam 30 hari ke depan.`
              : `Operasional berjalan stabil (Skor: ${company.riskScore}). Hubungi untuk penawaran upgrade plan atau ekspansi properti.`
            }
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-navy">Health Monitoring</h4>
              <p className="mt-1 text-xs text-text-secondary">
                Ringkasan kesehatan operasional dan revenue risk untuk company ini.
              </p>
            </div>
            <StatusBadge tone={company.health.tone}>
              {company.health.label} • Score {company.health.score}
            </StatusBadge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">Tagihan Overdue</p>
              <p className="mt-1 text-lg font-bold text-navy">{formatNumber(overdueBillingCount)}</p>
              <p className="mt-1 text-[10px] text-text-secondary">Outstanding: {formatCurrency(unpaidBillingAmount)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">Kontrak Akan Habis</p>
              <p className="mt-1 text-lg font-bold text-navy">{formatNumber(expiringContracts)}</p>
              <p className="mt-1 text-[10px] text-text-secondary">Dalam 30 hari ke depan</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">Kamar Maintenance</p>
              <p className="mt-1 text-lg font-bold text-navy">{formatNumber(maintenanceRooms)}</p>
              <p className="mt-1 text-[10px] text-text-secondary">{maintenanceRate}% dari total kamar</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">Aktivitas Owner Terakhir</p>
              <p className="mt-1 text-lg font-bold text-navy">{formatDate(company.lastActivityAt)}</p>
              <p className="mt-1 text-[10px] text-text-secondary">
                {company.health.staleDays === null ? 'Belum ada aktivitas tercatat' : `${company.health.staleDays} hari lalu`}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">Alasan Skor</p>
              <div className="mt-2 grid gap-2">
                {(company.health.reasons || []).length ? company.health.reasons.map((reason) => (
                  <div key={reason} className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-navy">
                    {reason}
                  </div>
                )) : (
                  <div className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-text-secondary">
                    Belum ada isu utama yang terdeteksi.
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">Recommended Actions</p>
              <div className="mt-2 grid gap-2">
                {(company.health.recommendations || []).length ? company.health.recommendations.map((item) => (
                  <div key={item} className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-xs text-navy">
                    {item}
                  </div>
                )) : (
                  <div className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-text-secondary">
                    Kondisi relatif sehat, belum ada tindakan prioritas tinggi.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Improved Branch Detail List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-navy">Performa Per Unit</p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{company.branches?.length} Cabang</span>
          </div>
          <div className="grid gap-3">
            {company.branches?.map((branch) => (
              <div
                key={branch.id}
                className="group relative rounded-2xl border border-border bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-navy transition-colors group-hover:text-primary">{branch.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-text-secondary">{branch.address}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold ${
                      branch.occupancyRate > 80 ? 'text-success-700' : 
                      branch.occupancyRate > 50 ? 'text-primary' : 
                      'text-error-700'
                    }`}>
                      {branch.occupancyRate}% Occupied
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="flex-grow">
                    <div className="h-1.5 w-full rounded-full bg-background">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ${
                          branch.occupancyRate > 80 ? 'bg-success-500' : 
                          branch.occupancyRate > 50 ? 'bg-primary' : 
                          'bg-danger'
                        }`}
                        style={{ width: `${Math.min(branch.occupancyRate, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-bold text-text-secondary">
                    <Users size={10} className="text-text-secondary" />
                    <span>{branch.activeTenants}/{branch.totalRooms}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1 text-[10px] font-medium text-text-secondary">
                    <ChevronRight size={10} className="text-border" />
                    <span>Rev: {formatCurrency(branch.currentMonthlyRevenue)}</span>
                  </div>
                  <button className="text-[10px] font-bold text-primary hover:text-brand-600">Detail &rsaquo;</button>
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
