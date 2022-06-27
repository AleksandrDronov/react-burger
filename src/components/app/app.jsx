import React from 'react';
import './app.module.css';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor'
import data from '../../utils/data.js'
import main from './app.module.css'

class App extends React.Component {

  state = { data };

  render() {
    return (
      <>
        <Header />
        <main className={main.app}>
          <BurgerIngredients data={this.state.data} />
          <BurgerConstructor data={this.state.data} />
        </main>
      </>
    );
  }
};

export default App;
