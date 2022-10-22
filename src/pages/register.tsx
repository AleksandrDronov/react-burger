import React, { useCallback, FC, SyntheticEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../services/hooks';
import styles from './login.module.css';
import { registrationRequest } from '../services/actions/auth';
import useForm from '../hooks/use-form';


const RegisterPage: FC = () => {

  const { authorization } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });

  const reg = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(registrationRequest(values));
    },
    [values, dispatch]
  );

  if (authorization?.user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  };

  return (
    <form className={styles.form} onSubmit={reg}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <div className={`${styles.container} pb-6`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}/>
      </div>
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
      <Button type="primary" size="medium">Зарегистрироваться</Button>
      <p className="text text_type_main-default text_color_inactive pt-20">Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></p>
    </form>
  )
};

export default RegisterPage;
