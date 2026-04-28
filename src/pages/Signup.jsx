import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { showSnackbar } from '../store/action/snackbar';
import AuthLayout from '../components/templates/AuthLayout';
import { Eye, EyeOff, Check } from 'lucide-react';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    // Mimic API delay
    setTimeout(() => {
      dispatch(showSnackbar({
        title: 'Signup Request Sent',
        message: 'Your registration request has been submitted for approval.',
        type: 'info',
      }));
      setSubmitting(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <AuthLayout
      title="Sign Up"
      subtitle="Enter your email and password to sign up!"
      footerText="Sudah punya akun?"
      footerLink="/login"
      footerLinkText="Masuk"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50">
             <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
             <span className="text-sm font-medium text-slate-700">Google</span>
          </button>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
               <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
             </svg>
             <span className="text-sm font-medium text-slate-700">X</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center py-2">
           <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
           </div>
           <span className="relative bg-white px-4 text-xs font-medium uppercase text-slate-400">Or</span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="mb-2 block text-sm font-medium text-slate-900">
                 First Name <span className="text-rose-500">*</span>
               </label>
               <input
                 type="text"
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
                 placeholder="Enter first name"
                 className="block w-full rounded-lg border border-border bg-background px-4 py-3.5 text-navy placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                 required
               />
             </div>
             <div>
               <label className="mb-2 block text-sm font-medium text-slate-900">
                 Last Name <span className="text-rose-500">*</span>
               </label>
               <input
                 type="text"
                 value={lastName}
                 onChange={(e) => setLastName(e.target.value)}
                 placeholder="Enter last name"
                 className="block w-full rounded-lg border border-border bg-background px-4 py-3.5 text-navy placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                 required
               />
             </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            
            <div className="mt-3 space-y-2">
              {[
                { label: "Minimal 8 karakter", met: password.length >= 8 },
                { label: "Minimal satu angka", met: /\d/.test(password) },
                { label: "Minimal satu simbol", met: /[^A-Za-z0-9]/.test(password) },
              ].map((req, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 ${req.met
                        ? "bg-primary border-primary text-white shadow-sm shadow-primary/20"
                        : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                      }`}
                  >
                    {req.met && <Check size={10} strokeWidth={4} />}
                  </div>
                  <span className={`text-[11px] transition-colors duration-300 ${req.met ? "text-primary font-semibold" : "text-slate-400 dark:text-slate-500"
                    }`}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" required />
              <span className="text-sm text-text-secondary">
                By creating an account means you agree to the <a href="#" className="font-semibold text-primary hover:underline">Terms and Conditions</a>, and our <a href="#" className="font-semibold text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 transition-all active:scale-[0.98]"
          >
            {submitting ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
