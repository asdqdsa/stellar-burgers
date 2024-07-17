import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  // const buns = [
  //   {
  //     _id: '643d69a5c3f7b9001cfa093c',
  //     name: 'Краторная булка N-200i',
  //     type: 'bun',
  //     proteins: 80,
  //     fat: 24,
  //     carbohydrates: 53,
  //     calories: 420,
  //     price: 1255,
  //     image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  //     image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  //     image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  //     __v: 0
  //   }
  // ] as (TIngredient & { __v: number })[];
  // const buns = [] as TIngredient[];
  const buns: TIngredient[] = useSelector((state) =>
    state.ingredients.ingredients.filter(
      (item: TIngredient) => item.type === 'bun'
    )
  );
  const mains: TIngredient[] = useSelector((state) =>
    state.ingredients.ingredients.filter(
      (item: TIngredient) => item.type === 'main'
    )
  );
  const sauces: TIngredient[] = useSelector((state) =>
    state.ingredients.ingredients.filter(
      (item: TIngredient) => item.type === 'sauce'
    )
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // return null;

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
