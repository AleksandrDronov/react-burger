import React from "react";
import order from "./order-details.module.css"


export default function OrderDetails () {
  return (
    <>
      <h2 className={`text text_type_digits-large ${order.id} pt-30`}>
        034536
      </h2>
      <p className={`text text_type_main-medium ${order.text} pt-8 pb-15`}>
        идентификатор заказа
      </p>
      <div className={order.done}></div>
      <p className={`text text_type_main-default ${order.text} pt-15 pb-2`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive ${order.text} pb-30`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}
