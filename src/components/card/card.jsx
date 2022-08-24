import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import card from './card.module.css'
import ingredientType from '../../utils/type';
import { useDrag } from "react-dnd";
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../services/actions/ingredients';


function Card ({ item }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { _id, __v, type } = item;

  // console.log(location);


  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id, __v, type }
  });

  const getIngredient = () => {
    dispatch({
      type: CURRENT_INGREDIENT,
      data: item
    });
  }


  return(
    <div className={card.card} ref={dragRef}>
      <Link to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location }
      }}>
        <img src={item.image} alt={item.name} className={`pl-4 ${card.image}`} onClick={getIngredient}/>
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


Card.propTypes =  ingredientType.isRequired

export default Card;
