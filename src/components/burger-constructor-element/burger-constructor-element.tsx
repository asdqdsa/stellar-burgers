import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from '../../services/store';
import {
  removeIngredient,
  moveIngredient,
  removeAllIngredients
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const handleMoveDown = () => {
      dispatch(moveIngredient({ index, move: -1 }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ index, move: 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
      console.log('remove', ingredient);
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
