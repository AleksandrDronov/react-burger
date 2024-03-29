import React, { FC } from "react";
import ingredient from "../components/ingredient-details/ingredient-details.module.css"
import ingredientfull from "./ingredient-details-full.module.css"
import { useSelector } from "../services/hooks";
import { useParams } from "react-router-dom";

const IngredientDetailsFull: FC = () => {
  const { ingredients } = useSelector(store => store.ingredients);
  const { id } = useParams<{ id: string }>();

  const card = ingredients.find(({ _id }) => _id === id);

  return (
    <div className={ingredientfull.container}>
      <h2 className={`${ingredientfull.title} text text_type_main-large pt-10 pb-2`}>Детали ингредиента</h2>
      <img src={card?.image_large} alt={card?.name} className={ingredient.image}></img>
      <p className={`text text_type_main-medium pt-4 pb-8 ${ingredient.title}`}>{card?.name}</p>
      <div className={`${ingredient.container} pb-15 pl-25 pr-25`}>
        <div className={ingredient.box}>
          <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{card?.calories}</p>
        </div>
        <div className={ingredient.box}>
          <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{card?.proteins}</p>
        </div>
        <div className={ingredient.box}>
          <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{card?.fat}</p>
        </div>
        <div className={ingredient.box}>
          <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{card?.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
};

export default IngredientDetailsFull;
