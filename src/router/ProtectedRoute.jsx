import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
  const location = useLocation();
  const { authInitialized, isAuthenticated, user } = useSelector((state) => state.authReducers);
  const isAdmin = String(user?.role || '').toLowerCase() === 'admin';

  if (!authInitialized) {
    return null;
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
