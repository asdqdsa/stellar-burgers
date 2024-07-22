import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/slices/burgerIngredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredient = useParams();
  const ingredientData = useAppSelector(getIngredients).find(
    (item) => item._id === ingredient.id
  );

  if (!ingredientData) return <Preloader />;

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
