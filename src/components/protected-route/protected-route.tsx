import { userDataSelector } from '../../services/slices/profileSlice';
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  unAuthed?: boolean;
};

function ProtectedRoute({ unAuthed, children }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useAppSelector(userDataSelector);

  if (!unAuthed && !(user.name && user.email)) {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  if (unAuthed && user.name && user.email) {
    const fromPage = location.state?.from || { pathname: `/` };
    return <Navigate to={fromPage} replace />;
  }

  return children;
}

export default ProtectedRoute;
