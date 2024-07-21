import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { getUsername } from '../../services/slices/profileSlice';

export const AppHeader: FC = () => {
  // const profileName = useAppSelector(
  //   (globalState) => globalState.profile.userData
  // );
  const profileName = useAppSelector(getUsername);
  console.log(profileName);
  return <AppHeaderUI userName={profileName} />;
};
