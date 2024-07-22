import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { getUsername } from '../../services/slices/profileSlice';

export const AppHeader: FC = () => {
  const profileName = useAppSelector(getUsername);
  return <AppHeaderUI userName={profileName} />;
};
