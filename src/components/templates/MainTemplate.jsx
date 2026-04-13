import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';
import Snackbar from '../organisms/Snackbar';
import ErrorBoundary from '../../pages/ErrorBoundary';

function MainTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.authReducers.user);
  const notifications = useSelector((state) => state.snackbar.items);

  const headerSubtitle = useMemo(() => {
    if (!user) return 'Admin monitoring console';
    return `Masuk sebagai ${user.name} (${user.role})`;
  }, [user]);

  const toggleSidebar = () => setSidebarOpen((value) => !value);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="layout-shell bg-gray-50">
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      <div className="layout-main flex-1 min-w-0 bg-app-shell">
        <div className="layout-header">
          <Header
            title="Kospintar Marketing Dashboard"
            subtitle={headerSubtitle}
            toggleSidebar={toggleSidebar}
            alertCount={notifications.length}
          />
        </div>

        <main className="layout-content">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      <Snackbar />
    </div>
  );
}

export default MainTemplate;
