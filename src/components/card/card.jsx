import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import card from './card.module.css'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ingredientType from '../../utils/type';


function Card (props) {

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
    <div className={card.card}>
      <img src={props.image} alt={props.name} className={`pl-4 ${card.image}`} onClick={handleOpenModal}/>
      <div className={card.price}>
        <h3 className="text text_type_digits-default mr-2">{props.price}</h3>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`${card.name} text text_type_main-default`}>{props.name}</h4>
      <Counter count={1} size="default" />
      {state.visible &&
      <Modal onClose={handleCloseModal}>
        <IngredientDetails card={props}/>
      </Modal>
        }
    </div>
  );
};


Card.propTypes =  { ingredientType }

export default Card;
