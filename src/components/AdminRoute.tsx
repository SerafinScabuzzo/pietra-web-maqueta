import { Navigate } from 'react-router-dom';
import { getAuth } from '../utils/auth';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const auth = getAuth();

  if (!auth.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;

