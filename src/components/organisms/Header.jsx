import { Bell, Menu, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/action/authActions';

function Header({ title, subtitle, toggleSidebar, alertCount }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducers.user);

  return (
    <header className="rounded-[28px] border border-slate-200 bg-white/90 px-5 py-4 shadow-[0_14px_45px_rgba(15,23,42,0.05)] backdrop-blur">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 xl:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          <div>
            <strong className="block text-lg text-slate-900">{title}</strong>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden min-w-[260px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:flex">
            <Search size={16} className="text-slate-400" />
            <span className="text-sm text-slate-400">Search campaign, channel, or landing page</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              {alertCount}
            </span>
            <Bell size={16} className="text-slate-500" />
            Alerts
          </div>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{user?.name || 'Admin'}</p>
              <p className="text-xs text-slate-500">Growth Dashboard</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
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
