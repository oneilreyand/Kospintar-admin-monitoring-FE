import { Bell, Menu, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/action/authActions';

function Header({ title, subtitle, toggleSidebar, alertCount }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducers.user);

  return (
    <header className="rounded-[28px] border border-border bg-white/95 px-5 py-4 shadow-[0_10px_28px_rgba(44,62,80,0.06)] backdrop-blur">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-navy transition hover:bg-background xl:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          <div>
            <strong className="block text-lg text-navy">{title}</strong>
            <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden min-w-[260px] items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 lg:flex">
            <Search size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Search campaign, channel, or landing page</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-navy">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-warning/10 text-warning">
              {alertCount}
            </span>
            <Bell size={16} className="text-text-secondary" />
            Alerts
          </div>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
              {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">{user?.name || 'Admin'}</p>
              <p className="text-xs text-text-secondary">Growth Dashboard</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-primary bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
