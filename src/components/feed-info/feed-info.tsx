import { FC } from 'react';

import { TOrder, TOrdersData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  // const orders: TOrder[] = [
  //   {
  //     _id: '6697ecf2119d45001b4f998e',
  //     ingredients: ['643d69a5c3f7b9001cfa0943'],
  //     status: 'done',
  //     name: 'Space бургер',
  //     createdAt: '2024-07-17T16:10:26.628Z',
  //     updatedAt: '2024-07-17T16:10:27.071Z',
  //     number: 46265
  //   }
  // ];
  // const feed = {
  //   success: true,
  //   orders: [
  //     {
  //       _id: '6697ecf2119d45001b4f998e',
  //       ingredients: ['643d69a5c3f7b9001cfa0943'],
  //       status: 'done',
  //       name: 'Space бургер',
  //       createdAt: '2024-07-17T16:10:26.628Z',
  //       updatedAt: '2024-07-17T16:10:27.071Z',
  //       number: 46265
  //     }
  //   ],
  //   total: 45891,
  //   totalToday: 291
  // };
  const orders: TOrder[] = useAppSelector(
    (globalState) => globalState.feedSlice.orders
  );
  const feed: TOrdersData = useAppSelector(
    (globalState) => globalState.feedSlice
  );
  const readyOrders = getOrders(orders, 'done');
  console.log(feed.orders);

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
