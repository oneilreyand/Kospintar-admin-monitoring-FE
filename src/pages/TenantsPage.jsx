import { useSelector } from 'react-redux';

function TenantsPage() {
  const tenants = useSelector((state) => state.monitoring.tenants);

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <p className="eyebrow">Tenant Lens</p>
          <h1 className="page-title">Status tenant, pembayaran, dan histori hunian.</h1>
          <p className="page-subtitle">
            Nantinya page ini bisa menjadi pusat investigasi tenant untuk billing issue, kontrak,
            check-in, check-out, dan notifikasi.
          </p>
        </div>
      </section>

      <section className="page-card">
        <h2>Snapshot tenant prioritas</h2>
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Company</th>
                <th>Status</th>
                <th>Kamar</th>
                <th>Billing</th>
                <th>Last event</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
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
