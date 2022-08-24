import React, { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';
import { RegistrationRequest } from '../services/actions/auth';


export default function RegisterPage () {

  const { authorization } = useSelector(store => store.auth);

  const dispatch = useDispatch();
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  };

  const reg = useCallback(
    e => {
      e.preventDefault();
      dispatch(RegistrationRequest(form));
    },
    [form, dispatch]
  );

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
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <div className={`${styles.container} pb-6`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={form.name}
          name={'name'}/>
      </div>
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
      <Button type="primary" size="medium" onClick={reg}>Зарегистрироваться</Button>
      <p className="text text_type_main-default text_color_inactive pt-20">Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></p>
    </form>
  )
}
