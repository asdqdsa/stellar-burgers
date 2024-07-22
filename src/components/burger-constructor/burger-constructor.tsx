import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchOrderBurger,
  getOrderRequest,
  closeModalOrder,
  getOrderModalData
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUser, getAuthStatus } from '../../services/slices/profileSlice';
import {
  getConstructorItems,
  removeAllIngredients
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getAuthStatus);
  const constructorItems = useAppSelector(getConstructorItems);
  const orderRequest = useAppSelector(getOrderRequest);
  const orderModalData = useAppSelector(getOrderModalData);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthorized) return navigate('/login');
    const ingredientsId: string[] = constructorItems.ingredients.map(
      (item) => item._id
    );
    const order: string[] = [
      constructorItems.bun._id,
      ...ingredientsId,
      constructorItems.bun._id
    ];
    dispatch(fetchOrderBurger(order));
    dispatch(removeAllIngredients());
  };

  const closeOrderModal = () => {
    dispatch(closeModalOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
