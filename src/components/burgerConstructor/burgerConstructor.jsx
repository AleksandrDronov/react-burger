import React from 'react';
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burger from './burgerConstructor.module.css'
import image3 from '../../images/Subtract.png'


class BurgerConstructor extends React.Component {
  render() {
    return(
      <section className={burger.section}>
        <div style={{paddingLeft: '48px', paddingBottom: '16px'}}>
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
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}} key={item._id}>
              <DragIcon type="primary"/>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <div style={{paddingLeft: '48px', paddingTop: '16px'}}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${this.props.data[0].name} (верх)`}
            price={this.props.data[0].price}
            thumbnail={this.props.data[0].image}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} className="pt-10 pr-4">
          <p className="text text_type_digits-medium">630</p>
          <img src={image3} alt="" className='pr-10 pl-2'/>
          <Button type="primary" size="large">Оформить заказ</Button>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired)
};


export default BurgerConstructor;
