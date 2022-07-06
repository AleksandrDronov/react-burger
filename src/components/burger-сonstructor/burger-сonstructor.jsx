import React from 'react';
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burger from './burger-сonstructor.module.css'
import image3 from '../../images/Subtract.png'
import ingredientType from '../../utils/type';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';


function BurgerConstructor ({ data }) {

  const [state, setState] = React.useState({
    visible: false
  });

  const handleOpenModal = () => {
    setState({ visible: true });
  };

  const handleCloseModal = () => {
    setState({ visible: false });
  }

  return(
    <section className={burger.section}>
      <div className={burger.upBun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <div className={burger.box}>
        {data.map(item => (
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
          text={`${data[0].name} (низ)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <div className={burger.button}>
        <p className="text text_type_digits-medium">630</p>
        <img src={image3} alt="" className='pr-10 pl-2'/>
        <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
        {state.visible &&
        <Modal onClose={handleCloseModal}>
          <OrderDetails/>
        </Modal>

          }
      </div>
    </section>
  );
};


BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};


export default BurgerConstructor;
