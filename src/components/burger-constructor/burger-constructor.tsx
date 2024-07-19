import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchOrderBurger } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useAppSelector(
    (globalState) => globalState.burgerConstructorSlice.constructorItems
  );

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
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
  };

  const closeOrderModal = () => {};

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
