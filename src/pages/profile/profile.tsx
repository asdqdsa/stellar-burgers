import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  fetchUser,
  getUsername,
  userUpdate
} from '../../services/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useSelector } from 'react-redux';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  // const user = {
  //   name: useAppSelector(
  //     (globalState) => globalState.profileSlice.userData.name
  //   ),
  //   email: 'emailll'
  // };
  const user = useAppSelector((globalState) => globalState.profile.userData);
  const dispatch = useAppDispatch();
  // console.log(user, 'userr');
  // const isLoaded = useAppSelector(
  //   (globalState) => globalState.profile.isLoading
  // );

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormValue((prevState) => ({
        ...prevState,
        name: user?.name || '',
        email: user?.email || ''
      }));
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('save data profile', formValue);
    dispatch(userUpdate(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
