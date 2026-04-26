import { useSelector } from 'react-redux';
import TenantActivityDashboard from '../components/organisms/TenantActivityDashboard';

function TenantsPage() {
  const { timeline, companies } = useSelector((state) => state.monitoring);

  return (
    <div className="page-shell">
      <section className="page-header mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <p className="eyebrow !mb-0">Tenant Activity Monitoring</p>
        </div>
        <h1 className="page-title text-4xl">Observability Tenant</h1>
        <p className="page-subtitle max-w-2xl">
          Visualisasi menyeluruh atas perilaku penyewa, siklus kontrak, dan histori pembayaran 
          di seluruh entitas bisnis Kospintar.
        </p>
      </section>

      <TenantActivityDashboard 
        timeline={timeline} 
        companies={companies}
      />

      {/* Legacy Snapshot (Keep for reference if needed, or hide) */}
      <section className="page-card mt-12 opacity-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-navy">Raw Tenant Snapshot</h2>
          <span className="text-[10px] font-bold text-text-secondary">Arsip data mentah</span>
        </div>
        <div className="table-shell">
          <table className="text-xs">
            <thead>
              <tr className="uppercase tracking-tighter font-black">
                <th>Tenant</th>
                <th>Company</th>
                <th>Status</th>
                <th>Kamar</th>
                <th>Billing</th>
                <th>Last event</th>
              </tr>
            </thead>
            <tbody>
              {useSelector((state) => state.monitoring.tenants).map((row) => (
                <tr key={row.name} className="hover:bg-background transition-colors cursor-default">
                  <td className="font-bold">{row.name}</td>
                  <td>{row.company}</td>
                  <td>{row.status}</td>
                  <td>{row.room}</td>
                  <td>{row.billing}</td>
                  <td>{row.lastEvent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default TenantsPage;
