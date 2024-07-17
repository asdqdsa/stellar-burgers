import {
  ConstructorPage,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, Link } from 'react-router-dom';

import { AppHeader, Modal, OrderInfo } from '@components';
import { Feed } from '@pages';
import ProtectedRoute from '../protected-route';
import { fetchIngredients } from '../../services/slices/burgerIngredientsSlice';
import { useAppDispatch } from '../../services/store';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='OrderInfo'
              onClose={() => console.log('onCloseModalOrderInfo')}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>

      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <ProtectedRoute>
              <Modal
                title='IngredientsDetails'
                onClose={() => console.log('onCloseModalIngredientsDetails')}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='IngredientsDetailsProtected'
              onClose={() => console.log('onCloseModalOrderInfoProtected')}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
