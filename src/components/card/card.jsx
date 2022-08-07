import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import card from './card.module.css'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ingredientType from '../../utils/type';
import { useDrag } from "react-dnd";


function Card (props) {
  const { _id, __v, type } = props;
  const typeIng = type;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id, __v, typeIng }
  });

  const [isModalOpen, setModalOpen] = React.useState(false);


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return(
    <div className={card.card} ref={dragRef}>
      <img src={props.image} alt={props.name} className={`pl-4 ${card.image}`} onClick={handleOpenModal}/>
      <div className={card.price}>
        <h3 className="text text_type_digits-default mr-2">{props.price}</h3>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`${card.name} text text_type_main-default`}>{props.name}</h4>
      <Counter count={__v} size="default" />
      {isModalOpen &&
      <Modal onClose={handleCloseModal}>
        <IngredientDetails card={props}/>
      </Modal>
        }
    </div>
  );
};


Card.propTypes =  ingredientType.isRequired

export default Card;
