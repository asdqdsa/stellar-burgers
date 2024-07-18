import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItemsSelector = useSelector(/* selector from slice*/);
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: [
  //     {
  //       _id: '643d69a5c3f7b9001cfa093c',
  //       name: 'Краторная булка N-200i',
  //       type: 'bun',
  //       proteins: 80,
  //       fat: 24,
  //       carbohydrates: 53,
  //       calories: 420,
  //       price: 1255,
  //       image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  //       image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  //       image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  //       __v: 0
  //     },
  //     {
  //       _id: '643d69a5c3f7b9001cfa093f',
  //       name: 'Мясо бессмертных моллюсков Protostomia',
  //       type: 'main',
  //       proteins: 433,
  //       fat: 244,
  //       carbohydrates: 33,
  //       calories: 420,
  //       price: 1337,
  //       image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  //       image_mobile:
  //         'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  //       image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  //       __v: 0
  //     }
  //   ]
  // };
  const constructorItems = useAppSelector(
    (globalState) => globalState.burgerConstructorSlice.constructorItems
  );

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
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
