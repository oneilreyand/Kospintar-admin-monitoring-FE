import { Building2, CircleOff, MapPinned, RefreshCcw, Users, Wallet } from 'lucide-react';
import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
}).format(Number(value || 0));

const itemsConfig = [
  {
    id: 'subscribed',
    label: 'Company Berlangganan',
    key: 'subscribedCount',
    icon: Building2,
    tone: 'success',
  },
  {
    id: 'trial',
    label: 'Masa Trial',
    key: 'trialCount',
    icon: RefreshCcw,
    tone: 'info',
  },
  {
    id: 'nonSubscribed',
    label: 'Belum Berlangganan',
    key: 'nonSubscribedCount',
    icon: CircleOff,
    tone: 'neutral',
  },
  {
    id: 'churn',
    label: 'Churn (Win-Back)',
    key: 'churnCount',
    icon: RefreshCcw,
    tone: 'danger',
  },
  {
    id: 'branches',
    label: 'Total Cabang',
    key: 'totalBranches',
    icon: MapPinned,
    tone: 'info',
  },
  {
    id: 'tenants',
    label: 'Tenant Aktif',
    key: 'activeTenants',
    icon: Users,
    tone: 'violet',
  },
  {
    id: 'mrr',
    label: 'Potensi MRR',
    key: 'monthlyRevenue',
    icon: Wallet,
    tone: 'warning',
    formatter: formatCurrency,
  },
];

function CompanyKpiGrid({ totals }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {itemsConfig.map((item) => {
        const Icon = item.icon;
        const rawValue = totals?.[item.key] || 0;
        const value = item.formatter ? item.formatter(rawValue) : rawValue;

        return (
          <SurfaceCard key={item.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Icon size={20} />
              </span>
              <StatusBadge tone={item.tone}>
                {item.label}
              </StatusBadge>
            </div>
            <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          </SurfaceCard>
        );
      })}
    </section>
  );
}

export default CompanyKpiGrid;
