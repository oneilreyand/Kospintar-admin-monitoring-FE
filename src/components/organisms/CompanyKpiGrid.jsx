import { Activity, Building2, CircleOff, MapPinned, RefreshCcw, ShieldAlert, ShieldCheck, TriangleAlert, Users, Wallet } from 'lucide-react';
import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
}).format(Number(value || 0));

const itemsConfig = [
  {
    id: 'healthy',
    label: 'Healthy',
    key: 'healthyCount',
    icon: ShieldCheck,
    tone: 'success',
  },
  {
    id: 'warning',
    label: 'Warning',
    key: 'warningCount',
    icon: TriangleAlert,
    tone: 'warning',
  },
  {
    id: 'critical',
    label: 'Critical',
    key: 'criticalCount',
    icon: ShieldAlert,
    tone: 'danger',
  },
  {
    id: 'healthScore',
    label: 'Avg Health Score',
    key: 'averageHealthScore',
    icon: Activity,
    tone: 'info',
  },
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
    id: 'expiring',
    label: 'Akan Berakhir',
    key: 'expiringCount',
    icon: RefreshCcw,
    tone: 'warning',
  },
  {
    id: 'pendingPayment',
    label: 'Pending Payment',
    key: 'pendingPaymentCount',
    icon: Wallet,
    tone: 'warning',
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

function CompanyKpiGrid({ totals, include = [] }) {
  const filteredItems = include.length > 0 
    ? itemsConfig.filter(item => include.includes(item.id))
    : itemsConfig;

  return (
    <section className={`grid gap-4 md:grid-cols-2 ${filteredItems.length > 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-' + filteredItems.length}`}>
      {filteredItems.map((item) => {
        const Icon = item.icon;
        const rawValue = totals?.[item.key] || 0;
        const value = item.formatter ? item.formatter(rawValue) : rawValue;

        return (
          <SurfaceCard key={item.id} className="p-5 border-l-4" style={{ borderLeftColor: `var(--color-${item.tone}-500, #ccc)` }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-black uppercase tracking-widest text-text-secondary">{item.label}</p>
                <p className="text-2xl font-black tracking-tighter text-navy">{value}</p>
              </div>
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-${item.tone}/10 text-${item.tone}`}>
                <Icon size={18} />
              </span>
            </div>
          </SurfaceCard>
        );
      })}
    </section>
  );
}

export default CompanyKpiGrid;
