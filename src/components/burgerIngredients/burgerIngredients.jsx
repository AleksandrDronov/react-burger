import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import Menu from '../menu/menu';
import Card from '../card/card';
import burger from './burgerIngredients.module.css'

class BurgerIngredients extends React.Component {

  render() {
    return(
      <section className={burger.section}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <Menu />
        <div className={burger.box}>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <div className={burger.buns}>
            {this.props.data.map(item => (
              item.type === 'bun' && <Card image={item.image} name={item.name} price={item.price} key={item._id} />
            ))}
          </div>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <div className={burger.souses}>
            {this.props.data.map(item => (
              item.type === 'sauce' && <Card image={item.image} name={item.name} price={item.price} key={item._id} />
            ))}
          </div>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <div className={burger.souses}>
            {this.props.data.map(item => (
              item.type === 'main' && <Card image={item.image} name={item.name} price={item.price} key={item._id} />
            ))}
          </div>
        </div>
      </section>
    );
  }
};

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired)
};


export default BurgerIngredients;
