import React from 'react';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-сonstructor/burger-сonstructor';
import main from './app.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App () {
  return (
    <>
      <Header />
      <main className={main.app}>
        <DndProvider backend={HTML5Backend}>
          <>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </>
        </DndProvider>
      </main>
    </>
  );
};

export default App;
