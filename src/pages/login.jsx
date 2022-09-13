import React, { useCallback, useState, useEffect } from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import styles from './login.module.css';
import { loginRequest } from '../services/actions/auth';
import useForm from '../hooks/use-form';

export default function LoginPage () {
  const { authorization } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const { values, handleChange } = useForm({ email: '', password: '' });

  const login = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginRequest(values));
    },
    [values]
  );

  if (authorization.user) {
    return (
      <Redirect
        to={ location?.state?.from || '/' }
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={login}>
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      <div className={`${styles.container} pb-6`}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}/>
      </div>
      <div className={`${styles.container} pb-6`}>
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}/>
      </div>
      <Button type="primary" size="medium">Войти</Button>
      <p className="text text_type_main-default text_color_inactive pb-4 pt-20">Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link></p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить</Link></p>
    </form>
  )
}
