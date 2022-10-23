import React, { FC } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import card from './card.module.css'
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom'
import { TIngredient, TLocation } from '../../services/types/data';

const Card: FC<{item: TIngredient}> = ({ item }) => {
  const location = useLocation<TLocation>();
  const { _id, __v, type } = item;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id, __v, type }
  });

  return(
    <div className={card.card} ref={dragRef}>
      <Link to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location }
      }}>
        <img src={item.image} alt={item.name} className={`pl-4 ${card.image}`} />
      </Link>
      <div className={card.price}>
        <h3 className="text text_type_digits-default mr-2">{item.price}</h3>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`${card.name} text text_type_main-default`}>{item.name}</h4>
      <Counter count={__v} size="default" />
    </div>
  );
};


export default Card;
