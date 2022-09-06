import React, { useCallback, useState } from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './login.module.css';
import { resetRequest } from '../services/actions/auth';
import useForm from '../hooks/use-form';

export default function ResetPasswordPage () {
  const { resetPassword, resetPassword2, authorization } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ token: '', password: '' });

  const reset = useCallback(
     e => {
      e.preventDefault();
      dispatch(resetRequest(values));
    },
    [values, resetPassword2]
  );

  let message;
  if(resetPassword2.success) {
    message = 'Пароль восстановлен'
  }

  if (authorization.user || !resetPassword.success) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  };

  return (
    <form className={styles.form} onSubmit={reset}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      <div className={`${styles.container} pb-6`}>
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}/>
      </div>
      <div className={`${styles.container} pb-6`}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.token}
          name={'token'}/>
      </div>
      <Button type="primary" size="medium" >Сохранить</Button>
      <p className={`${styles.error} text text_type_main-default pt-5`}>{message}</p>
      <p className="text text_type_main-default text_color_inactive pb-4 pt-20">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
    </form>
  )
}
