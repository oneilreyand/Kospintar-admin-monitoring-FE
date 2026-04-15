import { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainTemplate from '../components/templates/MainTemplate';
import Spinner from '../components/atoms/Spinner';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const CompaniesPage = lazy(() => import('../pages/CompaniesPage'));
const TenantsPage = lazy(() => import('../pages/TenantsPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const ArchitecturePage = lazy(() => import('../pages/ArchitecturePage'));
const ComponentsPage = lazy(() => import('../pages/ComponentsPage'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));

function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<Spinner fullscreen label="Memuat halaman admin monitoring..." />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute />}>

            <Route path="/" element={<MainTemplate />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/tenants" element={<TenantsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/component" element={<ComponentsPage />} />
              <Route path="/components" element={<ComponentsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
