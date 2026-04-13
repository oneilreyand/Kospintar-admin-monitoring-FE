import { useMemo, useState } from 'react';
import {
  Bell,
  Blocks,
  Building2,
  ChevronDown,
  Layers,
  LayoutDashboard,
  Users,
  X,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuSection from './MenuSection';

function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const alertCount = useSelector((state) => state.snackbar.items.length);
  const [activeScope, setActiveScope] = useState('all');

  const mainMenu = useMemo(
    () => [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard size={20} />,
      },
      {
        label: 'Companies',
        path: '/companies',
        icon: <Building2 size={20} />,
      },
      {
        label: 'Tenants',
        path: '/tenants',
        icon: <Users size={20} />,
      },
    ],
    [],
  );

  const supportMenu = useMemo(
    () => [
      {
        label: 'Notifications',
        path: '/notifications',
        badge: alertCount || undefined,
        icon: <Bell size={20} />,
      },
      {
        label: 'Architecture',
        path: '/architecture',
        icon: <Layers size={20} />,
      },
      {
        label: 'Component',
        path: '/component',
        icon: <Blocks size={20} />,
      },
    ],
    [alertCount],
  );

  const scopeOptions = [
    { id: 'all', label: 'Semua Company' },
    { id: 'risk', label: 'High Risk' },
    { id: 'priority', label: 'Prioritas Hari Ini' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    closeSidebar?.();
  };

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-40 border-0 bg-black/30 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        aria-label="Close sidebar"
        onClick={closeSidebar}
      />

      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen bg-sidebar-bg dark:bg-dark-sidebar text-sidebar-text dark:text-dark-text shadow-md border-r border-slate-300/30 flex shrink-0 flex-col z-50 md:self-start
          transform transition-all duration-500 ease-out
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          md:translate-x-0 md:w-16 md:hover:w-64
          group
        `}
      >
        <div className="flex flex-col justify-start space-y-4 p-5">
          <div className="flex items-center justify-between space-x-3 md:justify-start">
            <div className="flex min-w-0 items-center space-x-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sub-menu-active font-bold tracking-[0.06em] text-white">
                KP
              </span>
              <span className="min-w-full whitespace-nowrap text-xl font-bold text-sidebar-text transition-opacity duration-300 ease-out dark:text-dark-text md:opacity-0 md:group-hover:opacity-100">
                Kospintar Admin
              </span>
            </div>

            <button
              type="button"
              className="rounded p-2 transition-colors duration-200 hover:bg-gray-600/20 md:hidden"
              aria-label="Close sidebar"
              onClick={closeSidebar}
            >
              <X size={20} />
            </button>
          </div>

          <div className="w-full overflow-hidden transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <div className="relative">
              <select
                className="block w-full cursor-pointer appearance-none rounded-lg border border-slate-300/30 bg-sidebar-bg px-3 py-2 text-sm text-sidebar-text focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-dark-sidebar dark:text-dark-text"
                value={activeScope}
                onChange={(event) => setActiveScope(event.target.value)}
              >
                {scopeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sidebar-text dark:text-gray-300">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2">
          <MenuSection
            title="Main Menu"
            items={mainMenu}
            location={location}
            onItemClick={handleNavigate}
          />
          <MenuSection
            title="Sub Menu"
            items={supportMenu}
            location={location}
            onItemClick={handleNavigate}
          />
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
