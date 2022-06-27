import React from 'react';
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burger from './burgerConstructor.module.css'
import image3 from '../../images/Subtract.png'
import ingredientType from '../../utils/type';


class BurgerConstructor extends React.Component {
  render() {
    return(
      <section className={burger.section}>
        <div className={burger.upBun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${this.props.data[0].name} (верх)`}
            price={this.props.data[0].price}
            thumbnail={this.props.data[0].image}
          />
        </div>
        <div className={burger.box}>
          {this.props.data.map(item => (
            (item.type === 'sauce' || item.type === 'main') &&
            <div className={burger.filling} key={item._id}>
              <DragIcon type="primary"/>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <div className={burger.downBun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${this.props.data[0].name} (низ)`}
            price={this.props.data[0].price}
            thumbnail={this.props.data[0].image}
          />
        </div>
        <div className={burger.button}>
          <p className="text text_type_digits-medium">630</p>
          <img src={image3} alt="" className='pr-10 pl-2'/>
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </section>
    );
  }
};


BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};


export default BurgerConstructor;
