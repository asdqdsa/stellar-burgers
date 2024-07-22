import { useSelector } from 'react-redux';
import {
  isAuthCheckedSelector,
  userDataSelector
} from '../../services/slices/profileSlice';
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  unAuthed?: boolean;
};

function ProtectedRoute({ unAuthed, children }: ProtectedRouteProps) {
  const location = useLocation();
  // const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  // const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store
  const isAuthChecked = useAppSelector(isAuthCheckedSelector);
  const user = useAppSelector(userDataSelector);
  console.log(
    isAuthChecked,
    '=isAuthChecked?',
    user,
    '=user',
    unAuthed,
    '=unAth?'
  );

  // if (!unAuthed && user) console.log('huh');
  if (!unAuthed && !(user.name && user.email)) {
    console.log('BINGO?');
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  if (unAuthed && user.name && user.email) {
    const fromPage = location.state?.from || { pathname: `/` };
    console.log(fromPage, 'fp');
    return <Navigate to={fromPage} replace />;
  }

  return children;
}

export default ProtectedRoute;
