import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchFeed, getFeedOrders } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const orders: TOrder[] = useAppSelector(getFeedOrders);

  if (!orders.length) return <Preloader />;
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
