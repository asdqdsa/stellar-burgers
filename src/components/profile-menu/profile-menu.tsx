import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/profileSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('logout');
    dispatch(logoutUser());
    navigate('/', { replace: true });
    console.log('here');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
