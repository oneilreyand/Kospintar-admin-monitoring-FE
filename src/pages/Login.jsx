import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/action/authActions';
import { showSnackbar } from '../store/action/snackbar';
import { userAuthService } from '../services';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin.monitoring@kospintar.id');
  const [password, setPassword] = useState('admin123');
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    try {
      const result = await userAuthService.login({ email, password });
      if (!result.token || !result.user) {
        throw new Error('Respons login tidak lengkap dari server');
      }

      if (result.user.role !== 'admin') {
        throw new Error('Akses monitoring hanya untuk role admin');
      }

      dispatch(loginSuccess({
        user: result.user,
        token: result.token,
      }));

      dispatch(showSnackbar({
        title: 'Login berhasil',
        message: `Selamat datang, ${result.user.name || 'Admin'}.`,
        type: 'success',
      }));

      navigate(from, { replace: true });
    } catch (error) {
      dispatch(showSnackbar({
        title: 'Login gagal',
        message: error.message || 'Periksa email/password atau status verifikasi akun.',
        type: 'error',
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const buttonLabel = submitting ? 'Memproses...' : 'Login';

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">KospintarBE Auth</p>
        <h1 className="page-title">Masuk ke admin monitoring.</h1>
        <p className="page-subtitle">
          Login langsung ke endpoint backend (`/users/login`) agar token dan data company sinkron dengan database produksi/dev.
          {' '}
          <code>VITE_API_BASE_URL</code>
          {' '}
          harus mengarah ke host KospintarBE.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button type="submit" className="button button-primary" disabled={submitting}>
            {buttonLabel}
          </button>
        </form>

        <p className="helper-text">Akun harus role `admin` dan email sudah verified.</p>
      </div>
    </div>
  );
}

export default Login;
