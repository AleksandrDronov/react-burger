import React, { useEffect, useState } from 'react';
import styles from './feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Order from '../components/order/order';


export default function Feed () {
  const { orders } = useSelector(store => store.ordersList);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch({ type: 'WS_FEED_CONNECTION_START' });
      return () => {
        dispatch({ type: 'WS_CONNECTION_END' });
      }
  }, [])

  return(
    orders.success &&
    (<section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.box}>
          {orders.orders.map(order => (
            <Order order={order} key={order._id}/>
          ))}
        </div>
        <div className={styles.box_two}>
          <div className={styles.order_info}>
            <div className={`text text_type_digits-default ${styles.order_done}`}>
              <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
              {orders.orders.slice(0, 5).map(item => (
                item.status === 'done' && <p className="pb-2" key={item._id}>{item.number}</p>
              ))}
            </div>
            <div className={`text text_type_digits-default ${styles.order_inwork}`}>
              <h2 className="text text_type_main-medium pb-6">В работе:</h2>
              {orders.orders.slice(0, 5).map(item => (
                item.status === 'pending' && <p className="pb-2" key={item._id}>{item.number}</p>
              ))}
            </div>
          </div>
          <h2 className="text text_type_main-medium mt-15">Выполнено за все время:</h2>
          <p className={`text text_type_digits-large ${styles.order_count}`}>{orders.total}</p>
          <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
          <p className={`text text_type_digits-large ${styles.order_count}`}>{orders.totalToday}</p>
        </div>
      </div>
    </section>)
  );
};



