import SurfaceCard from '../atoms/SurfaceCard';

function CompanyManualQueryPanel({
  queryText,
  onQueryTextChange,
  onApply,
  onClear,
  parseError,
  activeClauseCount,
}) {
  return (
    <SurfaceCard className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-slate-900">Manual Query (Company Only)</p>
          <p className="mt-1 text-sm text-slate-500">
            Query ini hanya untuk menu Company, tanpa raw SQL, dengan batasan field/operator tertentu.
          </p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          Clause aktif: {activeClauseCount}
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        <textarea
          value={queryText}
          onChange={(event) => onQueryTextChange(event.target.value)}
          placeholder={'Contoh: lifecycle = churn AND activeTenants >= 20 AND city ~ jakarta'}
          className="min-h-[84px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-brand-200 transition focus:border-brand-300 focus:ring-2"
        />

        <div className="text-xs text-slate-500">
          {'Field: name, city, lifecycle, subscriptionStatus, riskPriority, activeTenants, branchCount, roomCount, riskScore, occupancyRate.'}
          <br />
          {'Operator: teks (=, !=, ~), angka (=, !=, >, >=, <, <=), max 6 clause (pisah dengan AND).'}
        </div>

        {parseError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {parseError}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onApply}
            className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700"
          >
            Apply Query
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600"
          >
            Clear Query
          </button>
        </div>
      </div>
    </SurfaceCard>
  );
}

export default CompanyManualQueryPanel;
