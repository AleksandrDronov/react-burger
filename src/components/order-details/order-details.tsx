import React, { FC } from "react";
import order from "./order-details.module.css";
import PropTypes from 'prop-types';
import { TOrderDetails } from "../../services/types/data";

export const OrderDetails: FC<TOrderDetails> = (props) => {

  return (
    <>
      <h2 className={`text text_type_digits-large ${order.id} pt-30`}>
      {props.order.number}
      </h2>
      <p className={`text text_type_main-medium ${order.text} pt-8 pb-15`}>
        идентификатор заказа
      </p>
      <div className={order.done}></div>
      <p className={`text text_type_main-default ${order.text} pt-15 pb-2`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive ${order.text} pb-30`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
};

// OrderDetails.propTypes =  {
//   name: PropTypes.string.isRequired,
//   order: PropTypes.object.isRequired,
//   success: PropTypes.bool
// }
