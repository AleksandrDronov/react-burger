import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import menu from './menu.module.css'

function Menu (props) {

  return (
    <div className={menu.menu}>
      <Tab value="one" active={props.tab1}>
        Булки
      </Tab>
      <Tab value="two" active={props.tab2}>
        Соусы
      </Tab>
      <Tab value="three" active={props.tab3}>
        Начинки
      </Tab>
    </div>
  )
};

Menu.propTypes =  {
  tab1: PropTypes.string,
  tab2: PropTypes.string,
  tab3: PropTypes.string,
}


export default Menu;
