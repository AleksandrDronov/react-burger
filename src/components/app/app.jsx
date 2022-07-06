import React from 'react';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-сonstructor/burger-сonstructor'
import main from './app.module.css'

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App () {
  const [state, setState] = React.useState({
    success: false,
    data: []
  })

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(url);
      if(res.ok) {
        const data = await res.json();
        setState(data);
      } else {
        console.log(`Ошибка: ${res.status}`)
      }
    };
    getData()
  },[]);

  const { success, data } = state;

  return (
    <>
      <Header />
      <main className={main.app}>
        { data.length && success && <BurgerIngredients data={data} />}
        { data.length && success && <BurgerConstructor data={data} />}
      </main>
    </>
  );
};

export default App;
