import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

class Menu extends React.Component {
  render() {
    // const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex' }} className="mb-10">
        <Tab value="one" active={true} >
          Булки
        </Tab>
        <Tab value="two">
          Соусы
        </Tab>
        <Tab value="three">
          Начинки
        </Tab>
      </div>
    )
  }
};

export default Menu;
