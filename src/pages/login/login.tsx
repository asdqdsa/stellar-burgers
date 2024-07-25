import { FC, SyntheticEvent, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getAuthStatus, loginUser } from '../../services/slices/profileSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  });

  const { email, password } = values as {
    email: string;
    password: string;
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getAuthStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthorized) navigate(-1);
  });

  return (
    <LoginUI
      errorText=''
      email={email}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
