import React, { useCallback, useState } from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './login.module.css';
import { ResetRequest } from '../services/actions/auth';

export default function ResetPasswordPage () {
  const { resetPassword, resetPassword2, authorization } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [form, setValue] = useState({ token: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  };

  const reset = useCallback(
     e => {
      e.preventDefault();
      dispatch(ResetRequest(form));
    },
    [form, resetPassword2]
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
    <form className={styles.form} >
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      <div className={`${styles.container} pb-6`}>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}/>
      </div>
      <div className={`${styles.container} pb-6`}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={form.token}
          name={'token'}/>
      </div>
      <Button type="primary" size="medium" onClick={reset}>Сохранить</Button>
      <p className={`${styles.error} text text_type_main-default pt-5`}>{message}</p>
      <p className="text text_type_main-default text_color_inactive pb-4 pt-20">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
    </form>
  )
}
