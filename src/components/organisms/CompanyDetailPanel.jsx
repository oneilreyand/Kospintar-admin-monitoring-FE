import { Building2, CalendarClock, DoorOpen, Users } from 'lucide-react';
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

  return (
    <SurfaceCard className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-900">{company.name}</p>
          <p className="mt-1 text-sm text-slate-500">{company.address}</p>
        </div>
        <StatusBadge tone={company.lifecycle.tone}>{company.lifecycle.label}</StatusBadge>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600">
                <Icon size={17} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-slate-500">Occupancy</span>
          <span className="font-semibold text-slate-900">{company.occupancyRate}%</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-slate-100">
          <div
            className="h-2.5 rounded-full bg-brand-500 transition-all"
            style={{ width: `${Math.min(company.occupancyRate, 100)}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>{formatNumber(company.occupiedRooms)} kamar terisi</span>
          <span>{formatCurrency(company.monthlyRevenue)} estimasi MRR</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-900">Detail Cabang</p>
        <div className="mt-3 grid gap-2">
          {company.branches.map((branch) => (
            <div
              key={branch.id}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{branch.name}</p>
                <StatusBadge tone="info">
                  {branch.activeTenants} tenant
                </StatusBadge>
              </div>
              <p className="mt-1 text-xs text-slate-500">{branch.address}</p>
              <p className="mt-2 text-xs text-slate-500">
                {branch.totalRooms} kamar • occupancy {branch.occupancyRate}% • {formatCurrency(branch.currentMonthlyRevenue)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SurfaceCard>
  );
}

export default CompanyDetailPanel;
