import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import menu from './menu.module.css'

const Menu: FC<{current: string; setTab: (value: string) => void}> = ({ current, setTab }) => {

  return (
    <div className={menu.menu}>
      <Tab value="one" active={current === "one"} onClick={setTab}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setTab}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setTab}>
        Начинки
      </Tab>
    </div>
  )
};

// Menu.propTypes =  {
//   tab1: PropTypes.string,
//   tab2: PropTypes.string,
//   tab3: PropTypes.string,
// }


export default Menu;
