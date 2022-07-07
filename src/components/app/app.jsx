import React from 'react';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-сonstructor/burger-сonstructor'
import main from './app.module.css'

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App () {
  const [ingredients, setIngredients] = React.useState({
    success: false,
    data: []
  })

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(url)
      .catch((err) => console.log(err));
      if(res.ok) {
        const data = await res.json();
        setIngredients(data);
      } else {
        console.log(`Ошибка: ${res.status}`)
      }
    };
    getData()
  },[]);

  const { success, data } = ingredients;

  return (
    <>
      <Header />
      <main className={main.app}>
        { data.length && success &&
        <>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </>
        }
      </main>
    </>
  );
};

export default App;
