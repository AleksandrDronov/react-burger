import React from 'react';
import './app.module.css';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor'
import data from '../../utils/data.js'

class App extends React.Component {

  state = { data };

  render() {
    return (
      <>
        <Header />
        <main style={{display: 'flex', justifyContent: 'center'}}>
          <BurgerIngredients data={this.state.data} />
          <BurgerConstructor data={this.state.data} />
        </main>
      </>
    );
  }
};

export default App;
