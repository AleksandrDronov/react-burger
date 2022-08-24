import React, { useCallback, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import styles from './login.module.css';
import { LoginRequest } from '../services/actions/auth';

export default function LoginPage () {
  const { authorization } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  };

  const login = useCallback(
    e => {
      e.preventDefault();
      dispatch(LoginRequest(form));
    },
    [form]
  );

  if (authorization.user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <form className={styles.form} >
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      <div className={`${styles.container} pb-6`}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={onChange}
          value={form.email}
          name={'email'}/>
      </div>
      <div className={`${styles.container} pb-6`}>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}/>
      </div>
      <Button type="primary" size="medium" onClick={login}>Войти</Button>
      <p className="text text_type_main-default text_color_inactive pb-4 pt-20">Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link></p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить</Link></p>
    </form>
  )
}
