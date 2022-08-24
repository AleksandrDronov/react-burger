import React, { useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burger from './burger-сonstructor.module.css';
import image3 from '../../images/Subtract.png';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ElementConstructor from '../constructor-element/constructor-element';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_TYPE, DELET_INGREDIENT, INCREASE_INGREDIENT, CHANGE_INGREDIENT_BUN, getOrderDetails } from '../../services/actions/ingredients';
import { useDrop } from "react-dnd";


export default function BurgerConstructor () {

  const { ingredientsInConstructor } = useSelector(store => store.ingredients);
  const { orderDetals } = useSelector(store => store.ingredients);

  const dispatch = useDispatch();

  const allIdIngredients = ingredientsInConstructor.map(item => item._id);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if(item.type === "bun") {
        dispatch({
        ...item,
        type: CHANGE_INGREDIENT_BUN,
        });
      } else {
        dispatch({
          ...item,
          type: UPDATE_TYPE,
        });
        dispatch({
          ...item,
          type: INCREASE_INGREDIENT,
        });
      }
    }
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    dispatch(getOrderDetails(allIdIngredients))
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const burgerPrice = ingredientsInConstructor.reduce((acc, item) => {
    return item.type === "bun" ? acc + item.price * 2 : acc + item.price
  },0);

  const disableButton = ingredientsInConstructor.length ? false : true;

  return(
    <section className={burger.section} >
      <div className={burger.upBun} >
        {ingredientsInConstructor.map(item => (
          (item.type === "bun") &&
          <ConstructorElement
            type="top"
            isLocked={false}
            text={`${item.name} (верх)`}
            price={item.price}
            thumbnail={item.image}
            key={item._id}
            handleClose={() => dispatch({ type: DELET_INGREDIENT, id: item.id, _id: item._id })}
          />))
        }
      </div>
      <div className={burger.box} ref={dropTarget} >
        {ingredientsInConstructor.map((item, index) => (
          (item.type === 'sauce' || item.type === 'main') &&
          <ElementConstructor ingredient={item} index={index} key={item.id}/>
        ))}
      </div>
      <div className={burger.downBun}>
        {ingredientsInConstructor.map(item => (
            (item.type === "bun") &&
            <ConstructorElement
              type="bottom"
              isLocked={false}
              text={`${item.name} (низ)`}
              price={item.price}
              thumbnail={item.image}
              key={item._id}
              handleClose={() => dispatch({ type: DELET_INGREDIENT, id: item.id, _id: item._id })}
            />))
          }
      </div>
      <div className={burger.button} >
        <p className="text text_type_digits-medium">{burgerPrice}</p>
        <img src={image3} alt="" className='pr-10 pl-2'/>
        <Button type="primary" size="large" onClick={handleOpenModal} disabled={disableButton}>Оформить заказ</Button>
        {isModalOpen && orderDetals.success &&
        <Modal onClose={handleCloseModal}>
          <OrderDetails {...orderDetals}/>
        </Modal>
          }
      </div>
    </section>
  );
};




