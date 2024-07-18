import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  // const ordersT = [
  //   {
  //     _id: '6697ecf2119d45001b4f998e',
  //     ingredients: ['643d69a5c3f7b9001cfa0943'],
  //     status: 'done',
  //     name: 'Space бургер',
  //     createdAt: '2024-07-17T16:10:26.628Z',
  //     updatedAt: '2024-07-17T16:10:27.071Z',
  //     number: 99999
  //   }
  // ];
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
