import React, { useCallback, useState, useRef, useEffect } from 'react';
import OrderInHistory from '../components/order-in-history/order-in-history.jsx';
import { NavLink, Route, Switch } from "react-router-dom";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutRequest, saveUser } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from '../hooks/use-form';
import styles from './login.module.css';
import profile from './profile.module.css';
import { getCookie } from '../utils/cookie.js';
import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_END
} from '../services/actions/websocket.jsx';

export default function ProfilePage () {
  const { user } = useSelector(store => store.auth.authorization);
  const { orders } = useSelector(store => store.ordersList.userOrders);

  const inputRefName = useRef(null);
  const inputReflogin = useRef(null);
  const inputRefPass = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const { values, handleChange, setValues } = useForm({ name: user.name, email: user.email, password: '' });

  const [disableName, setDisableName] = useState(true);
  const [disablelogin, setDisablelogin] = useState(true);
  const [disablePass, setDisablePass] = useState(true);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    dispatch({ type: WS_AUTH_CONNECTION_START, payload: `?token=${accessToken}` });
    return () => {
      dispatch({ type: WS_AUTH_CONNECTION_END });
    }
  }, [])

  const logout = useCallback(
    async() => {
      await dispatch(logoutRequest());
      history.replace({ pathname: '/login' });
    },
    [history, dispatch]
  );

  const save = useCallback(
    e => {
      e.preventDefault();
      dispatch(saveUser(values));
    },
    [values, dispatch]
  );

  const cancel = e => {
    e.preventDefault();
    setValues({ name: user.name, email: user.email, password: '' })
  };

  return (
    <div className={profile.container}>
      <div>
        <ul className={profile.menu}>
          <li className={profile.item}>
            <NavLink to='/profile' exact={true} className={`${profile.link} text text_type_main-medium text_color_inactive`} activeClassName={profile.active_link}>Профиль</NavLink>
          </li>
          <li className={profile.item}>
            <NavLink to='/profile/orders' exact={true} className={`${profile.link} text text_type_main-medium text_color_inactive`} activeClassName={profile.active_link}>История заказов</NavLink>
          </li>
          <li className={profile.item}>
            <button className={`${profile.button} text text_type_main-medium text_color_inactive`} onClick={logout}>Выход</button>
          </li>
        </ul>
        <p className={`${profile.sign} text text_type_main-default`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Switch>
        <Route path='/profile' exact={true}>
          <form className={`${profile.form}`} onSubmit={save}>
            <div className={`${styles.container} pb-6`}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                value={values.name}
                name={'name'}
                icon={'EditIcon'}
                onIconClick={() => {
                  setDisableName(false)
                  setTimeout(() => inputRefName.current.focus(), 0) }}
                ref={inputRefName}
                disabled={disableName}
                onBlur={() => setDisableName(true)}
                />
            </div>
            <div className={`${styles.container} pb-6`}>
              <Input
                type={'email'}
                placeholder={'Логин'}
                onChange={handleChange}
                value={values.email}
                name={'email'}
                icon={'EditIcon'}
                onIconClick={() => {
                  setDisablelogin(false)
                  setTimeout(() => inputReflogin.current.focus(), 0) }}
                ref={inputReflogin}
                disabled={disablelogin}
                onBlur={() => setDisablelogin(true)}
                />
            </div>
            <div className={`${styles.container} pb-6`}>
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={handleChange}
                value={values.password}
                name={'password'}
                icon={'EditIcon'}
                onIconClick={() => {
                  setDisablePass(false)
                  setTimeout(() => inputRefPass.current.focus(), 0) }}
                ref={inputRefPass}
                disabled={disablePass}
                onBlur={() => setDisablePass(true)}
                />
            </div>
            <div className={profile.button_container}>
              <button className={`${profile.cancel_button} text text_type_main-default mr-7`} onClick={cancel}>Отмена</button>
              <Button type="primary" size="medium" >Сохранить</Button>
            </div>
          </form>
        </Route>
        <Route path='/profile/orders' >
          <div className={profile.box}>
            {orders?.map(order => (
              <OrderInHistory order={order} key={order._id}/>
            ))}
          </div>
        </Route>
      </Switch>
    </div>
  )
}
