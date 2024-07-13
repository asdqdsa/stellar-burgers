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

import { AppHeader } from '@components';
import { Feed } from '@pages';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    {/* <ConstructorPage /> */}

    <Routes>
      <Route path='*' element={<NotFound404 />} />
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
    </Routes>
  </div>
);

export default App;
