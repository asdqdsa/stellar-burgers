import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchOrdersUser,
  getOrdersByUser
} from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersUser());
  }, [dispatch]);

  const orders: TOrder[] = useAppSelector(getOrdersByUser);

  return <ProfileOrdersUI orders={orders} />;
};
