import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchOrderBurger,
  getOrderRequest,
  closeModalOrder,
  getOrderData,
  getOrderModalData,
  removeItemsConstructor
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUser, getAuthStatus } from '../../services/slices/profileSlice';
import { removeAllIngredients } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const isAuthorized = useAppSelector(
  //   (globalState) => globalState.profileSlice.isAuthorized
  // );
  const isAuthorized = useAppSelector(getAuthStatus);
  console.log(isAuthorized, 'user burg constr');
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useAppSelector(
    (globalState) => globalState.burgerConstructorSlice.constructorItems
  );
  // const constructorItems = useAppSelector(() => )

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // const orderRequest = false;
  // const orderRequest = useAppSelector(
  //   (globalState) => globalState.orderSlice.orderRequest
  // );
  const orderRequest = useAppSelector(getOrderRequest);
  console.log(orderRequest, 'orderReq');

  // const orderModalData = useAppSelector(
  //   (globalState) => globalState.orderSlice.orderData
  // );
  const orderModalData = useAppSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    console.log(isAuthorized);
    // if (!isAuthorized) return navigate('/login');
    const ingredientsId: string[] = constructorItems.ingredients.map(
      (item) => item._id
    );
    const order: string[] = [
      ...ingredientsId,
      constructorItems.bun._id,
      constructorItems.bun._id
    ];
    console.log(constructorItems.bun._id, ingredientsId, order);
    dispatch(fetchOrderBurger(order));
    dispatch(removeAllIngredients());
  };

  const closeOrderModal = () => {
    // navigate('/');
    // console.log('close', orderModalData);
    dispatch(closeModalOrder());

    // console.log('close', orderModalData);
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

  // return null;

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
