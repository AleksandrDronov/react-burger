import React, { useCallback, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPasswordRequest } from '../services/actions/auth';

export default function ForgotPasswordPage () {

  const { resetPassword, authorization } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  };

  const reset = useCallback(
    e => {
      e.preventDefault();
      dispatch(ResetPasswordRequest(form));
    },
    [form, resetPassword]
  );

  if(resetPassword.success) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  };

  if (authorization.user) {
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
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={onChange}
          value={form.email}
          name={'email'}/>
      </div>
      <Button type="primary" size="medium" onClick={reset}>Восстановить</Button>
      <p className="text text_type_main-default text_color_inactive pb-4 pt-20">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
    </form>
  )
}
