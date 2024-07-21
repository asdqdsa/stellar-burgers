import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { loginUser } from '../../services/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(
    (globalState) => globalState.profile.isAuthorized
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('press login', email, password);
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthorized) navigate(-1);
  });

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
