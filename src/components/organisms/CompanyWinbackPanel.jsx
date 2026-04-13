import { ArrowRightLeft, PhoneCall } from 'lucide-react';
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
    <SurfaceCard className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-slate-900">Win-Back Queue</p>
          <p className="mt-1 text-sm text-slate-500">
            Prioritaskan company churn, pending payment, dan account mendekati expiry.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="danger">{totals?.churnCount || 0} churn</StatusBadge>
          <StatusBadge tone="warning">{totals?.expiringCount || 0} expiring</StatusBadge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-rose-500">Potential Win-Back MRR</p>
          <p className="mt-1 text-xl font-bold text-rose-700">{formatCurrency(potentialWinbackMRR)}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-amber-600">Perlu Outreach Cepat</p>
          <p className="mt-1 text-xl font-bold text-amber-700">
            {(totals?.churnCount || 0) + (totals?.expiringCount || 0) + (totals?.pendingPaymentCount || 0)} company
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {companies.map((company) => (
          <div
            key={company.id}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">{company.name}</p>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={company.lifecycle.tone}>{company.lifecycle.label}</StatusBadge>
                <StatusBadge tone={riskTone[company.riskPriority] || 'neutral'}>
                  {company.riskPriority}
                </StatusBadge>
              </div>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {company.branchCount} cabang • {company.activeTenants} tenant aktif • potensi {formatCurrency(company.monthlyRevenue)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
              >
                <ArrowRightLeft size={14} />
                Mark Win-Back
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                <PhoneCall size={14} />
                Hubungi Owner
              </button>
            </div>
          </div>
        ))}
      </div>

      {!companies.length ? (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          Tidak ada company yang masuk antrean win-back saat ini.
        </div>
      ) : null}
    </SurfaceCard>
  );
}

export default CompanyWinbackPanel;
