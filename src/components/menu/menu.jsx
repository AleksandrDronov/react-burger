import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import menu from './menu.module.css'

function Menu () {
  const [current, setCurrent] = React.useState('one')

  return (
    <div className={menu.menu}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
};

export default Menu;
