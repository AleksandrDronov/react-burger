import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';



class Header extends React.Component {
  render() {
    return(
      <header className={headerStyles.header}>
        <nav className="pt-4">
          <ul className={headerStyles.nav_links}>
            <li className={headerStyles.nav_burger} >
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default pl-2 pr-2">Конструктор</span>
            </li>
            <li className={headerStyles.nav_list}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default pl-2">Лента заказов</span>
            </li>
            <li><Logo /></li>
            <li className={headerStyles.nav_account}>
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default pl-2">Личный кабинет</span>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
};

export default Header;
