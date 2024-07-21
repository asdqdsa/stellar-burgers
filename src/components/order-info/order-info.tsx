import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';
import { useParams } from 'react-router-dom';
import { removeItemsConstructor } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const paramsOrder = useParams();
  const orderData = useAppSelector((globalState) =>
    globalState.feedSlice.orders.find(
      (order) => order.number === +paramsOrder.number!
    )
  );
  // const ingredients: TIngredient[] = [];
  const ingredients: TIngredient[] = useAppSelector(
    (globalState) => globalState.ingredientsSlice.ingredients
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );
    console.log(orderData, orderInfo, 'order-info');
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
