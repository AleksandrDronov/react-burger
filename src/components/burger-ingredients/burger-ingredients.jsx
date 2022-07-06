import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu/menu';
import Card from '../card/card';
import burger from './burger-ingredients.module.css'
import ingredientType from '../../utils/type';

function BurgerIngredients ({ data }) {
  return(
    <section className={burger.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Menu />
      <div className={burger.box}>
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <div className={burger.buns}>
          {data.map(item => (
            item.type === 'bun' && <Card {...item} key={item._id} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <div className={burger.souses}>
          {data.map(item => (
            item.type === 'sauce' && <Card {...item} key={item._id} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <div className={burger.souses}>
          {data.map(item => (
            item.type === 'main' && <Card {...item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};


export default BurgerIngredients;
