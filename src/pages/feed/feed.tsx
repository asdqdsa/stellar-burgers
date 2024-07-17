import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  // const orders: TOrder[] = useAppSelector(
  //   (globalState) => globalState.feedSlice.orders
  // );

  const orders: TOrder[] = [
    {
      _id: '6697ecf2119d45001b4f998e',
      ingredients: ['643d69a5c3f7b9001cfa0943'],
      status: 'done',
      name: 'Space бургер',
      createdAt: '2024-07-17T16:10:26.628Z',
      updatedAt: '2024-07-17T16:10:27.071Z',
      number: 99999
    }
  ];

  if (!orders.length) return <Preloader />;
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        console.log('refresh');
      }}
    />
  );
};
