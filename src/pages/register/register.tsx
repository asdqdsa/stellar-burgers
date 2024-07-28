import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch } from '../../services/store';
import {
  fetchRegisterUser,
  fetchUser
} from '../../services/slices/profileSlice';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
    userName: ''
  });

  const { email, password, userName } = values as {
    email: string;
    password: string;
    userName: string;
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser({ email, password, name: userName }));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
