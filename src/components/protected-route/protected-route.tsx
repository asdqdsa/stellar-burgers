import { useSelector } from 'react-redux';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  // const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store
  return children;
}

export default ProtectedRoute;
