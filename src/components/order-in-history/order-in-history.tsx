import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import styles from './order-in-history.module.css';
import { formatDate } from '../../utils/formate-date';
import { Link, useLocation } from 'react-router-dom';
import { TLocation, TOrderFeed } from '../../services/types/data';

const OrderInHistory: FC<{order: TOrderFeed}> = ({ order }) => {
  const { ingredients } = useSelector(store => store.ingredients);
  const location = useLocation<TLocation>();

  const orderIngredients = [];
  for(let i = 0; i < ingredients.length; i++) {
    for(let g = 0; g < order.ingredients.length; g++) {
      if(ingredients[i]._id === order.ingredients[g]) {
        orderIngredients.push(ingredients[i])
      }
    }
  }

  const orderPrice = orderIngredients.reduce((acc, item) => item.type === 'bun' ? acc + item.price * 2 : acc + item.price, 0);
  const hiddenNumber = order.ingredients.length - 6;

  return(
    <Link className={styles.link} to={{
      pathname: `/profile/orders/${order._id}`,
      state: { background: location }
    }}>
      <div className={styles.card}>
        <p className={`text text_type_digits-default pt-6 pl-6 pr-6 ${styles.order_number}`}>#{order.number}<span className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</span></p>
        <h2 className="text text_type_main-medium pt-6 pb-2 pl-6 pr-6">{order.name}</h2>
        <p className="text text_type_main-default pl-6 pr-6 pb-6">
          {order.status === 'done' && <span className={styles.order_status}>Выполнен</span>}
          {order.status === 'created' && <span>Создан</span>}
          {order.status === 'pending' && <span>Готовится</span>}
        </p>
        <div className={`pb-6 pl-6 pr-6 ${styles.ingredients_container}`}>
          <div className={styles.ingredients}>
            {orderIngredients.slice(0, 6).map((item, pos) => (
              pos !== 5 ?
              (<div className={styles.image_container} key={pos}>
                <div className={styles.image_container2}> <img className={styles.image} src={item.image_mobile} alt={item.name}/></div>
              </div>) :
              (<div className={`text text_type_main-default ${styles.image_container}`} key={pos}>
                <p className={styles.hidden_number}>{hiddenNumber === 0 ? '' : `+${hiddenNumber}`}</p>
                <div className={hiddenNumber === 0 ? styles.image_container2 : styles.image_container2_hidden}>
                  <img className={styles.image} src={item.image_mobile} alt={item.name}/>
                </div>
              </div>)
            ))}
          </div>
          <div className={styles.price}>
            <p className='text text_type_digits-default pr-2'>{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderInHistory;
