import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchOrdersUser } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersUser());
  }, [dispatch]);

  const orders: TOrder[] = useAppSelector(
    (globalState) => globalState.orderSlice.ordersByUser
  );

  console.log(orders);

  return <ProfileOrdersUI orders={orders} />;
};
