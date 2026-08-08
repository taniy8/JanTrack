import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getRoleDashboardPath, isRoleAllowed } from '../utils/dashboardData';

export default function RoleProtectedRoute({ children, allowedRoles, redirectTo, message = 'You do not have access to this area.' }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, message }} replace />;
  }

  if (!isRoleAllowed(user?.role, allowedRoles)) {
    const destination = redirectTo || getRoleDashboardPath(user?.role);
    return <Navigate to={destination} replace />;
  }

  return children;
}
