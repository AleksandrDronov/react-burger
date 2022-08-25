import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';


function Header () {
  return(
    <header className={headerStyles.header}>
      <nav className="pt-4">
        <ul className={headerStyles.nav_links}>
          <li className={headerStyles.nav_burger} >
            <a href='#' className={headerStyles.nav_link}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default pl-2 pr-2">Конструктор</span>
            </a>
          </li>
          <li className={headerStyles.nav_list}>
            <a href='#' className={headerStyles.nav_link}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive pl-2">Лента заказов</span>
            </a>
          </li>
          <li><Logo /></li>
          <li className={headerStyles.nav_account}>
            <a href='#' className={headerStyles.nav_link}>
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;