import { useMemo, useState } from 'react';
import {
  Bell,
  Blocks,
  Building2,
  ChevronDown,
  Layers,
  LayoutDashboard,
  Users,
  Activity,
  X,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuSection from './MenuSection';
import nextLogo from '../../assets/next-level-ic.svg';

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
        label: 'Tenant Activity',
        path: '/tenants',
        icon: <Activity size={20} />,
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
          fixed md:sticky top-0 left-0 h-screen bg-sidebar-bg dark:bg-dark-sidebar text-sidebar-text dark:text-dark-text shadow-[0_10px_28px_rgba(44,62,80,0.06)] border-r border-border flex shrink-0 flex-col z-50 md:self-start
          transform transition-all duration-500 ease-out
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          md:translate-x-0 md:w-16 md:hover:w-64
          group
        `}
      >
        <div className="flex flex-col justify-start space-y-4 p-5">
          <div className="flex items-center justify-between space-x-3 md:justify-start">
            <div className="flex min-w-0 items-center space-x-3">
              <img src={nextLogo} alt="Kospintar" className="h-10 w-auto shrink-0" />
              <span className="min-w-full whitespace-nowrap text-xl font-bold text-sidebar-text transition-opacity duration-300 ease-out dark:text-dark-text md:opacity-0 md:group-hover:opacity-100">
                Lulu
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
