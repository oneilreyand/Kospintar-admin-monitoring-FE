import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/atoms/Spinner';
import CompanyCoverageMap from '../components/organisms/CompanyCoverageMap';
import CompanyDetailPanel from '../components/organisms/CompanyDetailPanel';
import CompanyKpiGrid from '../components/organisms/CompanyKpiGrid';
import CompanyListPanel from '../components/organisms/CompanyListPanel';
import CompanyWinbackPanel from '../components/organisms/CompanyWinbackPanel';
import { companyMonitoringService } from '../services';

function CompaniesPage() {
  const token = useSelector((state) => state.authReducers.token);
  const [loading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState(null);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [filter, setFilter] = useState('all');
   const [selectedCompanyId, setSelectedCompanyId] = useState(null);
   const [query, setQuery] = useState('');

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
        const lc = company.lifecycle.lifecycle;
        if (filter === 'subscribed') return lc === 'subscribed' || lc === 'trial';
        if (filter === 'expiring') return lc === 'expiring' || lc === 'trial_expiring';
        return lc === filter;
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
      .sort((left, right) => right.riskScore - left.riskScore);
  }, [companies, filter, query]);

  const selectedCompany = useMemo(
    () => companies.find((company) => company.id === selectedCompanyId) || null,
    [companies, selectedCompanyId],
  );

  const filteredMapPoints = useMemo(() => {
    const allPoints = snapshot?.mapPoints || [];
    if (!selectedCompanyId) return allPoints;
    return allPoints.filter((point) => point.companyId === selectedCompanyId);
  }, [snapshot?.mapPoints, selectedCompanyId]);

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
          <h1 className="eyebrow">Analisis Siklus Langganan, Sebaran Cabang, dan Retensi</h1>
          <h1 className="page-title">Company Monitoring</h1>
        </div>
      </section>

      <CompanyKpiGrid totals={snapshot?.totals} />

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

      <CompanyCoverageMap 
        mapPoints={filteredMapPoints} 
        title={selectedCompany ? `Sebaran Cabang: ${selectedCompany.name}` : undefined}
      />

      <CompanyWinbackPanel
        companies={snapshot?.winbackQueue || []}
        totals={snapshot?.totals}
      />
    </div>
  );
}

export default CompaniesPage;
