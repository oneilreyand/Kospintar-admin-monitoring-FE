import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/action/authActions';
import { showSnackbar } from '../store/action/snackbar';
import AuthLayout from '../components/templates/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { userAuthService } from '../services';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin.monitoring@kospintar.id');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const redirectTarget = '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    try {
      const result = await userAuthService.login({ email, password });

      if (result?.requiresTwoFactor) {
        throw new Error('Akun ini memakai autentikasi 2 langkah. Flow 2FA belum tersedia di admin monitoring FE.');
      }

      if (!result?.token || !result?.user) {
        throw new Error('Respons login tidak lengkap. Silakan coba lagi.');
      }

      const role = String(result.user.role || '').toLowerCase();
      if (role !== 'admin') {
        throw new Error('Akses monitoring hanya untuk akun admin.');
      }

      dispatch(loginSuccess({
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken,
      }));

      dispatch(showSnackbar({
        title: 'Login berhasil',
        message: `Selamat datang, ${result.user.name || result.user.email || 'Admin'}.`,
        type: 'success',
      }));

      navigate(redirectTarget, { replace: true });
      setTimeout(() => {
        if (window.location.pathname === '/login') {
          window.location.replace(redirectTarget);
        }
      }, 0);
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

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Enter your email and password to sign in!"
    >
      <div className="space-y-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@gmail.com"
              className="block w-full rounded-lg border border-border bg-background px-4 py-3.5 text-navy placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="block w-full rounded-lg border border-border bg-background px-4 py-3.5 text-navy placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-brand-600">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 transition-all active:scale-[0.98]"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
