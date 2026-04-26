import { ChevronLeft, ChevronRight, Search, Building2, MapPin, Users, Activity, Filter, Info } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';
import DropdownMenu from '../atoms/DropdownMenu';

const STATUS_FILTERS = [
  { id: 'all', label: 'Semua Status' },
  { id: 'subscribed', label: 'Berlangganan' },
  { id: 'non_subscribed', label: 'Belum Langganan' },
  { id: 'expiring', label: 'Mendekati Expired' },
  { id: 'pending_payment', label: 'Pending Payment' },
  { id: 'churn', label: 'Churn' },
];

const HEALTH_FILTERS = [
  { id: 'all', label: 'Semua Health' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'warning', label: 'Warning' },
  { id: 'critical', label: 'Critical' },
];

const riskTone = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
};

const ITEMS_PER_PAGE = 10;
const formatNumber = (value) => new Intl.NumberFormat('id-ID').format(Number(value || 0));

const getInitials = (name) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

function CompanyListPanel({
  companies,
  selectedCompanyId,
  onSelectCompany,
  filter,
  onFilterChange,
  query,
  onQueryChange,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filter or query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, query]);

  const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return companies.slice(start, start + ITEMS_PER_PAGE);
  }, [companies, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <SurfaceCard className="flex h-full flex-col overflow-hidden p-6 shadow-sm border-border">
      {/* Header section with search and title */}
      <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-navy uppercase tracking-tighter">Company Directory</h3>
            <p className="text-sm font-medium text-text-secondary">
              Kelola dan pantau seluruh entitas bisnis dalam satu daftar.
            </p>
          </div>
        </div>
        
        <div className="relative flex-1 min-w-[300px] max-w-md">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Cari nama company atau lokasi..."
            className="w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm text-navy outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 font-medium"
          />
        </div>
      </div>

      {/* Filter section with Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 mb-6 bg-background/50 p-3 rounded-2xl border border-border/50">
        <div className="flex items-center gap-2 px-2 text-text-secondary mr-2">
          <Filter size={14} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest">Filter Data</span>
        </div>
        
        <div className="flex-1 max-w-[200px]">
          <DropdownMenu 
            label={STATUS_FILTERS.find(f => f.id === filter)?.label || 'Status'} 
            items={STATUS_FILTERS}
            activeItemId={filter}
            onItemSelect={onFilterChange}
          />
        </div>
        <div className="flex-1 max-w-[200px]">
          <DropdownMenu 
            label={HEALTH_FILTERS.find(f => f.id === filter)?.label || 'Health'} 
            items={HEALTH_FILTERS}
            activeItemId={filter}
            onItemSelect={onFilterChange}
          />
        </div>
        
        {filter !== 'all' && (
          <button 
            onClick={() => onFilterChange('all')}
            className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-brand-600 px-3 transition-colors"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Table section */}
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary px-4">
              <th className="pb-3 pl-4 pr-3 font-black">Company & Location</th>
              <th className="pb-3 px-3 font-black">Occupancy Capacity</th>
              <th className="pb-3 px-3 font-black">Subscription Status</th>
              <th className="pb-3 px-3 font-black text-center">Health & Risk</th>
            </tr>
          </thead>
          <tbody className="before:block before:h-2">
            {paginatedCompanies.map((company) => {
              const occupancyRate = company.roomCount > 0 ? Math.round((company.activeTenants / company.roomCount) * 100) : 0;
              
              return (
                <tr
                  key={company.id}
                  className={`group cursor-pointer transition-all duration-200 border-border ${
                    selectedCompanyId === company.id 
                      ? 'bg-primary/5 ring-2 ring-primary ring-inset' 
                      : 'hover:bg-background'
                  }`}
                  onClick={() => onSelectCompany(company.id)}
                >
                  <td className="py-4 pl-4 pr-3 rounded-l-2xl border-y border-l border-border group-hover:border-primary/30">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs shadow-sm transition-transform group-hover:scale-110 ${
                        selectedCompanyId === company.id ? 'bg-primary text-white' : 'bg-background text-navy border border-border'
                      }`}>
                        {getInitials(company.name)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-navy leading-none mb-1.5">{company.name}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary">
                          <MapPin size={10} className="text-primary" />
                          <span className="truncate max-w-[140px] uppercase tracking-tight">
                            {company.cities?.join(', ') || 'Lokasi belum terdata'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-3 border-y border-border group-hover:border-primary/30">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-navy">{formatNumber(company.activeTenants)} Tenants</span>
                        <span className="text-text-secondary">{formatNumber(company.roomCount)} Rooms</span>
                      </div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            occupancyRate > 80 ? 'bg-success-500' : occupancyRate > 50 ? 'bg-primary' : 'bg-danger'
                          }`}
                          style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-3 border-y border-border group-hover:border-primary/30">
                    <StatusBadge tone={company.lifecycle.tone} className="text-[10px] font-black uppercase tracking-tight">
                      {company.lifecycle.label}
                    </StatusBadge>
                  </td>

                  <td className="py-4 px-3 pr-4 rounded-r-2xl border-y border-r border-border group-hover:border-primary/30">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full animate-pulse ${
                          company.health.tone === 'success' ? 'bg-success-500' : 
                          company.health.tone === 'warning' ? 'bg-warning-500' : 
                          'bg-danger-500'
                        }`} />
                        <span className="text-xs font-black text-navy">{company.health.score}</span>
                      </div>
                      <StatusBadge tone={riskTone[company.riskPriority] || 'neutral'} className="text-[9px] font-black uppercase">
                        {company.riskPriority} Risk
                      </StatusBadge>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {companies.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="h-20 w-20 rounded-full bg-background border-4 border-dashed border-border flex items-center justify-center mb-6">
            <Info className="h-10 w-10 text-border" />
          </div>
          <p className="text-lg font-black text-navy uppercase tracking-tighter">Data Tidak Ditemukan</p>
          <p className="mt-2 text-sm font-medium text-text-secondary max-w-xs mx-auto">
            Tidak ada company yang cocok dengan kriteria pencarian atau filter Anda.
          </p>
          <button 
            onClick={() => onFilterChange('all')}
            className="mt-6 text-xs font-black uppercase text-primary hover:underline"
          >
            Bersihkan semua filter
          </button>
        </div>
      )}

      {/* Pagination Section */}
      {companies.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-background border border-border">
              <Activity size={14} className="text-primary" />
            </div>
            <p className="text-xs font-bold text-text-secondary">
              Showing <span className="text-navy">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, companies.length)}</span> to{' '}
              <span className="text-navy">{Math.min(currentPage * ITEMS_PER_PAGE, companies.length)}</span> of{' '}
              <span className="text-navy">{companies.length}</span> companies
            </p>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-navy transition-all hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex items-center gap-1 mx-2">
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                if (totalPages > 5 && pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - currentPage) > 1) {
                  if (Math.abs(pageNum - currentPage) === 2) return <span key={pageNum} className="px-1 text-border">...</span>;
                  return null;
                }
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-10 w-10 rounded-xl text-xs font-black transition-all ${
                      currentPage === pageNum
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                        : 'bg-white text-text-secondary hover:bg-background border border-transparent'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-navy transition-all hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </SurfaceCard>
  );
}

export default CompanyListPanel;
