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
          <p className="text-lg font-semibold text-navy">Manual Query (Company Only)</p>
          <p className="mt-1 text-sm text-text-secondary">
            Query ini hanya untuk menu Company, tanpa raw SQL, dengan batasan field/operator tertentu.
          </p>
        </div>
        <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-text-secondary">
          Clause aktif: {activeClauseCount}
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        <textarea
          value={queryText}
          onChange={(event) => onQueryTextChange(event.target.value)}
          placeholder={'Contoh: lifecycle = churn AND activeTenants >= 20 AND city ~ jakarta'}
          className="min-h-[84px] w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        <div className="text-xs text-text-secondary">
          {'Field: name, city, lifecycle, subscriptionStatus, riskPriority, activeTenants, branchCount, roomCount, riskScore, occupancyRate.'}
          <br />
          {'Operator: teks (=, !=, ~), angka (=, !=, >, >=, <, <=), max 6 clause (pisah dengan AND).'}
        </div>

        {parseError ? (
          <div className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-error-700">
            {parseError}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onApply}
            className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary"
          >
            Apply Query
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-navy"
          >
            Clear Query
          </button>
        </div>
      </div>
    </SurfaceCard>
  );
}

export default CompanyManualQueryPanel;
