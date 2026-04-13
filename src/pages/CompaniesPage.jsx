import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/atoms/Spinner';
import CompanyCoverageMap from '../components/organisms/CompanyCoverageMap';
import CompanyDetailPanel from '../components/organisms/CompanyDetailPanel';
import CompanyKpiGrid from '../components/organisms/CompanyKpiGrid';
import CompanyListPanel from '../components/organisms/CompanyListPanel';
import CompanyManualQueryPanel from '../components/organisms/CompanyManualQueryPanel';
import CompanyWinbackPanel from '../components/organisms/CompanyWinbackPanel';
import { companyMonitoringService } from '../services';
import { applyCompanyManualQuery, parseCompanyManualQuery } from '../utils/companyManualQuery';

function CompaniesPage() {
  const token = useSelector((state) => state.authReducers.token);
  const [loading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState(null);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [manualQueryText, setManualQueryText] = useState('');
  const [manualQueryError, setManualQueryError] = useState('');
  const [compiledManualQuery, setCompiledManualQuery] = useState({ clauses: [] });
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    let active = true;

    const loadSnapshot = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await companyMonitoringService.getCompanyMonitoringSnapshot(token, {
          allowMockFallback: false,
        });
        if (!active) return;

        setSnapshot(result);
        setLoading(false);

        if (result.companies.length > 0) {
          setSelectedCompanyId((previous) => previous || result.companies[0].id);
        }
      } catch (serviceError) {
        if (!active) return;
        setLoading(false);
        setError(serviceError.message || 'Gagal memuat data company dari backend.');
      }
    };

    loadSnapshot();

    return () => {
      active = false;
    };
  }, [token, reloadKey]);

  const companies = snapshot?.companies || [];

  const filteredCompanies = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return companies
      .filter((company) => {
        if (filter === 'all') return true;
        return company.lifecycle.lifecycle === filter;
      })
      .filter((company) => {
        if (!lowerQuery) return true;
        const cityText = (company.cities || []).join(' ').toLowerCase();
        return (
          company.name.toLowerCase().includes(lowerQuery) ||
          cityText.includes(lowerQuery) ||
          company.address.toLowerCase().includes(lowerQuery)
        );
      })
      .filter((company) => applyCompanyManualQuery(company, compiledManualQuery))
      .sort((left, right) => right.riskScore - left.riskScore);
  }, [companies, filter, query, compiledManualQuery]);

  const activeManualClauseCount = compiledManualQuery?.clauses?.length || 0;

  const handleApplyManualQuery = () => {
    try {
      const parsed = parseCompanyManualQuery(manualQueryText);
      setCompiledManualQuery(parsed);
      setManualQueryError('');
    } catch (parseError) {
      setManualQueryError(parseError.message || 'Manual query tidak valid.');
    }
  };

  const handleClearManualQuery = () => {
    setManualQueryText('');
    setManualQueryError('');
    setCompiledManualQuery({ clauses: [] });
  };

  const selectedCompany = useMemo(
    () => companies.find((company) => company.id === selectedCompanyId) || null,
    [companies, selectedCompanyId],
  );

  if (loading) {
    return <Spinner label="Memuat monitoring company dari backend..." />;
  }

  if (error) {
    return (
      <div className="page-shell">
        <section className="page-card border-rose-200 bg-rose-50">
          <h2 className="text-rose-700">Gagal memuat data company</h2>
          <p className="mt-2 text-sm text-rose-600">{error}</p>
          <div className="mt-4">
            <button
              type="button"
              className="button button-primary"
              onClick={() => setReloadKey((value) => value + 1)}
            >
              Coba lagi
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <p className="eyebrow">Company Monitoring</p>
          <h1 className="page-title">Lifecycle langganan, sebaran cabang, dan peluang win-back.</h1>
          <p className="page-subtitle">
            Data disusun dari endpoint `KospintarBE` (`companies`, `boarding-houses`, `boarding-houses/:id/summary`, `users/:id`) agar admin bisa memantau company berlangganan vs churn secara operasional.
          </p>
        </div>
      </section>

      <CompanyKpiGrid totals={snapshot?.totals} />

      <CompanyManualQueryPanel
        queryText={manualQueryText}
        onQueryTextChange={setManualQueryText}
        onApply={handleApplyManualQuery}
        onClear={handleClearManualQuery}
        parseError={manualQueryError}
        activeClauseCount={activeManualClauseCount}
      />

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <CompanyListPanel
          companies={filteredCompanies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={setSelectedCompanyId}
          filter={filter}
          onFilterChange={setFilter}
          query={query}
          onQueryChange={setQuery}
        />
        <CompanyDetailPanel company={selectedCompany} />
      </section>

      <CompanyCoverageMap mapPoints={snapshot?.mapPoints || []} />

      <CompanyWinbackPanel
        companies={snapshot?.winbackQueue || []}
        totals={snapshot?.totals}
      />
    </div>
  );
}

export default CompaniesPage;
