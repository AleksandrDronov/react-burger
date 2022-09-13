import React, { useEffect, useState } from 'react';
import Menu from '../menu/menu';
import Card from '../card/card';
import burger from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

function BurgerIngredients () {
  const { ingredients } = useSelector(store => store.ingredients);
  const [current, setCurrent] = useState({ tab1: 'one', tab2: '', tab3: ''});

  const [ ref, inView ] = useInView({threshold: 0 });
  const [ ref2, inView2 ] = useInView({threshold: 0 });
  const [ ref3, inView3 ] = useInView({threshold: 0.2 });


  useEffect(() => {
    if(inView && inView2 && !inView3) {
      setCurrent({ tab1: 'one', tab2: '', tab3: '' })
    } else if ((!inView && inView2 && inView3) || (!inView && inView2 && !inView3)) {
      setCurrent({ tab1: '', tab2: 'two', tab3: '' })
    } else if (!inView && !inView2 && inView3){
      setCurrent({ tab1: '', tab2: '', tab3: 'three' })
    }
  },[inView, inView2, inView3])

  return(
    <section className={burger.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Menu {...current}/>
      <div className={`${burger.box} #scrollArea`}  >
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <div className={burger.buns} ref={ref}>
          {ingredients.map(item => (
            item.type === 'bun' && <Card item={item} key={item._id} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" >Соусы</h2>
        <div className={burger.souses} ref={ref2}>
          {ingredients.map(item => (
            item.type === 'sauce' && <Card item={item} key={item._id} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" >Начинки</h2>
        <div className={burger.souses} ref={ref3}>
          {ingredients.map(item => (
            item.type === 'main' && <Card item={item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default BurgerIngredients;
