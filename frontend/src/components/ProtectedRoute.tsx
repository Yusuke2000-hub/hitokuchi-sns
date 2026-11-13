import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute: React.FC<{ requireAuth: boolean }> = ({ requireAuth }) => {
  const { isAuthenticated } = useAuth();
  if (requireAuth && !isAuthenticated) return <Navigate to="/login" replace />;
  if (!requireAuth && isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
