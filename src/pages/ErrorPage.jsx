import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">404</p>
        <h1 className="page-title">Halaman tidak ditemukan.</h1>
        <p className="page-subtitle">
          Route ini belum tersedia di admin monitoring. Balik ke dashboard untuk lanjut eksplorasi.
        </p>
        <Link to="/dashboard" className="button button-primary">
          Ke Dashboard
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
