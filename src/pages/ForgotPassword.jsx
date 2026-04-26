import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/templates/AuthLayout';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/action/snackbar';

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setTimeout(() => {
      dispatch(showSnackbar({
        title: 'Reset link terkirim',
        message: `Instruksi reset password telah dikirim ke ${email || 'email kamu'}.`,
        type: 'success',
      }));
      setSubmitting(false);
    }, 700);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Masukkan email akun kamu untuk menerima link reset password."
      footerText="Kembali ke halaman"
      footerLink="/login"
      footerLinkText="Login"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin.monitoring@kospintar.id"
            className="block w-full rounded-lg border border-border bg-background px-4 py-3.5 text-navy placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 transition-all active:scale-[0.98]"
        >
          {submitting ? 'Mengirim...' : 'Kirim Link Reset'}
        </button>

        <p className="text-center text-sm text-text-secondary">
          Sudah ingat password?{' '}
          <Link to="/login" className="font-semibold text-primary hover:text-brand-600">
            Masuk sekarang
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
