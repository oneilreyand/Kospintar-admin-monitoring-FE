import { Search } from 'lucide-react';
import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';

const FILTER_ITEMS = [
  { id: 'all', label: 'Semua' },
  { id: 'subscribed', label: 'Berlangganan' },
  { id: 'non_subscribed', label: 'Belum Langganan' },
  { id: 'expiring', label: 'Mau Expired' },
  { id: 'pending_payment', label: 'Pending Payment' },
  { id: 'churn', label: 'Churn' },
];

const riskTone = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
};

const formatNumber = (value) => new Intl.NumberFormat('id-ID').format(Number(value || 0));

function CompanyListPanel({
  companies,
  selectedCompanyId,
  onSelectCompany,
  filter,
  onFilterChange,
  query,
  onQueryChange,
}) {
  return (
    <SurfaceCard className="overflow-hidden p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-slate-900">Company List</p>
          <p className="mt-1 text-sm text-slate-500">
            Pantau status langganan, risiko churn, dan kapasitas operasional tiap company.
          </p>
        </div>
        <div className="relative min-w-[260px] flex-1 max-w-[320px]">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Cari company..."
            className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2.5 text-sm text-slate-700 outline-none ring-brand-200 transition focus:border-brand-300 focus:ring-2"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTER_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onFilterChange(item.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              filter === item.id
                ? 'border-brand-300 bg-brand-50 text-brand-600'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-[0.16em] text-slate-400">
              <th className="px-3 py-3 font-semibold">Company</th>
              <th className="px-3 py-3 font-semibold">Cabang/Kamar</th>
              <th className="px-3 py-3 font-semibold">Tenant Aktif</th>
              <th className="px-3 py-3 font-semibold">Subscription</th>
              <th className="px-3 py-3 font-semibold">Risk</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className={`cursor-pointer border-b border-slate-100 transition last:border-b-0 ${
                  selectedCompanyId === company.id ? 'bg-brand-50/60' : 'hover:bg-slate-50/80'
                }`}
                onClick={() => onSelectCompany(company.id)}
              >
                <td className="px-3 py-3 align-top">
                  <p className="text-sm font-semibold text-slate-900">{company.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {company.cities?.join(', ') || '-'}
                  </p>
                </td>
                <td className="px-3 py-3 text-sm text-slate-600">
                  {formatNumber(company.branchCount)} cabang / {formatNumber(company.roomCount)} kamar
                </td>
                <td className="px-3 py-3 text-sm font-semibold text-slate-800">{formatNumber(company.activeTenants)}</td>
                <td className="px-3 py-3">
                  <StatusBadge tone={company.lifecycle.tone}>
                    {company.lifecycle.label}
                  </StatusBadge>
                </td>
                <td className="px-3 py-3">
                  <StatusBadge tone={riskTone[company.riskPriority] || 'neutral'}>
                    {company.riskPriority} ({company.riskScore})
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!companies.length ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          Tidak ada company yang cocok dengan filter saat ini.
        </div>
      ) : null}
    </SurfaceCard>
  );
}

export default CompanyListPanel;
