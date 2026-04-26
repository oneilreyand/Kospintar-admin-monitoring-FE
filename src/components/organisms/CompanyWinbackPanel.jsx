import { ArrowRightLeft, PhoneCall, AlertTriangle, Building2, Users, Wallet, Calendar, ChevronRight } from 'lucide-react';
import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
}).format(Number(value || 0));

const riskTone = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
};

function CompanyWinbackPanel({ companies, totals }) {
  const potentialWinbackMRR = companies
    .filter((company) => company.lifecycle.lifecycle === 'churn')
    .reduce((sum, company) => sum + company.monthlyRevenue, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <SurfaceCard className="p-6 border-l-4 border-l-danger bg-danger/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-danger/10 text-danger">
              <Wallet className="w-5 h-5" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-error-700">Potential Win-Back MRR</p>
          </div>
          <p className="text-3xl font-black text-navy">{formatCurrency(potentialWinbackMRR)}</p>
          <p className="mt-1 text-xs text-text-secondary">Dari {totals?.churnCount || 0} company yang sudah churn</p>
        </SurfaceCard>
        
        <SurfaceCard className="p-6 border-l-4 border-l-warning bg-warning/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-warning/10 text-warning">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-warning-700">Perlu Outreach Cepat</p>
          </div>
          <p className="text-3xl font-black text-navy">
            {(totals?.churnCount || 0) + (totals?.expiringCount || 0) + (totals?.pendingPaymentCount || 0)}
          </p>
          <p className="mt-1 text-xs text-text-secondary">Company dalam risiko tinggi atau tertunda</p>
        </SurfaceCard>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black uppercase tracking-tighter text-navy flex items-center gap-2">
            Win-Back Queue
            <span className="ml-2 px-2 py-0.5 rounded-full bg-navy text-white text-[10px] font-bold">{companies.length}</span>
          </h3>
          <div className="flex gap-2">
            <StatusBadge tone="danger" className="text-[10px] font-black uppercase">{totals?.churnCount || 0} churn</StatusBadge>
            <StatusBadge tone="warning" className="text-[10px] font-black uppercase">{totals?.expiringCount || 0} expiring</StatusBadge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <SurfaceCard
              key={company.id}
              className="group relative overflow-hidden p-5 transition-all hover:shadow-xl hover:border-primary/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-base font-black text-navy group-hover:text-primary transition-colors line-clamp-1">{company.name}</h4>
                  <p className="text-[10px] font-bold text-text-secondary mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Last Updated: {new Date().toLocaleDateString('id-ID')}
                  </p>
                </div>
                <StatusBadge tone={company.lifecycle.tone} className="text-[10px] font-black uppercase">{company.lifecycle.label}</StatusBadge>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-background border border-border">
                  <p className="text-[10px] font-black uppercase text-text-secondary mb-1">Impact</p>
                  <p className="text-sm font-black text-navy">{formatCurrency(company.monthlyRevenue)}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-background border border-border">
                  <p className="text-[10px] font-black uppercase text-text-secondary mb-1">Health</p>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full bg-${company.health.tone}-500`} />
                    <p className="text-sm font-black text-navy">{company.health.score}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-text-secondary font-medium">
                    <Building2 className="w-3.5 h-3.5" />
                    {company.branchCount} Cabang
                  </span>
                  <span className="flex items-center gap-2 text-text-secondary font-medium">
                    <Users className="w-3.5 h-3.5" />
                    {company.activeTenants} Tenants
                  </span>
                </div>
                {company.health?.reasons?.length ? (
                  <div className="p-3 rounded-xl bg-navy/5 text-[11px] font-bold text-navy leading-relaxed italic">
                    "{company.health.reasons[0]}"
                  </div>
                ) : null}
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-3 py-2.5 text-xs font-black transition-all hover:bg-brand-600 shadow-md hover:shadow-lg active:scale-95"
                >
                  <PhoneCall size={14} />
                  Outreach
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-white text-navy px-3 py-2.5 text-xs font-black transition-all hover:bg-background active:scale-95"
                  title="Mark Win-Back"
                >
                  <ArrowRightLeft size={14} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-white text-navy px-3 py-2.5 text-xs font-black transition-all hover:bg-background active:scale-95"
                  title="View Detail"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </SurfaceCard>
          ))}
        </div>

        {!companies.length ? (
          <div className="rounded-[2.5rem] border-4 border-dashed border-border bg-background px-4 py-20 text-center">
            <div className="h-20 w-20 rounded-full bg-white shadow-lg mx-auto flex items-center justify-center mb-6">
              <Users className="h-10 w-10 text-border" />
            </div>
            <p className="text-xl font-black text-navy uppercase tracking-tighter">Queue is Empty</p>
            <p className="mt-2 text-sm font-medium text-text-secondary max-w-xs mx-auto">
              Semua company dalam kondisi sehat atau sudah ditangani. Good job!
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CompanyWinbackPanel;
