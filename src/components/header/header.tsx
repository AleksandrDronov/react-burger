import React, { FC } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';
import { TLocation } from '../../services/types/data';


const Header: FC = () => {
  const { pathname } = useLocation<TLocation>();
  return(
    <header className={headerStyles.header}>
      <nav className="pt-4">
        <ul className={headerStyles.nav_links}>
          <li className={headerStyles.nav_burger} >
            <NavLink to='/' exact={true} className={headerStyles.nav_link} activeClassName={headerStyles.active_nav_link}>
              <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
              <span className="text text_type_main-default pl-2 pr-2">Конструктор</span>
            </NavLink>
          </li>
          <li className={headerStyles.nav_list}>
            <NavLink  to='/feed' className={headerStyles.nav_link} activeClassName={headerStyles.active_nav_link}>
              <ListIcon type={pathname === '/feed' ? "primary" : "secondary"} />
              <span className="text text_type_main-default pl-2">Лента заказов</span>
            </NavLink>
          </li>
          <li><NavLink to='/'><Logo /></NavLink></li>
          <li className={headerStyles.nav_account}>
            <NavLink  to='/profile' className={headerStyles.nav_link} activeClassName={headerStyles.active_nav_link}>
              <ProfileIcon type={pathname.includes('/profile') ? "primary" : "secondary"} />
              <span className="text text_type_main-default pl-2">Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
