import React, { useEffect, useState, useRef, useCallback, FC } from 'react';
import Menu from '../menu/menu';
import Card from '../card/card';
import burger from './burger-ingredients.module.css';
import { useSelector } from '../../services/hooks';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients: FC = () => {
  const { ingredients } = useSelector(store => store.ingredients);
  const [current, setCurrent] = useState('one');

  const [ ref, inView ] = useInView();
  const [ ref2, inView2 ] = useInView();
  const [ ref3, inView3 ] = useInView();

  const buns = useRef<HTMLHeadingElement>(null);
  const souses = useRef<HTMLHeadingElement>(null);
  const main = useRef<HTMLHeadingElement>(null);

  const setTab = useCallback((value: string) => {
    switch (value) {
      case 'one':
        buns.current?.scrollIntoView({behavior: "smooth"});
        break;
      case 'two':
        souses.current?.scrollIntoView({behavior: "smooth"});
        break;
      case 'three':
        main.current?.scrollIntoView({behavior: "smooth"});
        break;
      default:
        break;
    };
  },[])

  const handleScroll = useCallback(() => {
    switch (true) {
      case inView:
        setCurrent('one');
        break;
      case inView2:
        setCurrent('two');
        break;
      case inView3:
        setCurrent('three');
        break;
      default:
        break;
    }
  },[inView, inView2, inView3]);

  useEffect(() => {
    handleScroll();
  },[inView, inView2, inView3])

  return(
    <section className={burger.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Menu current={current} setTab={setTab}/>
      <div className={`${burger.box} #scrollArea`}  >
        <h2 className="text text_type_main-medium mb-6" ref={buns}>Булки</h2>
        <div className={burger.buns} ref={ref}>
          {ingredients.map(item => (
            item.type === 'bun' && <Card item={item} key={item._id} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={souses}>Соусы</h2>
        <div className={burger.souses} ref={ref2}>
          {ingredients.map(item => (
            item.type === 'sauce' && <Card item={item} key={item._id} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={main}>Начинки</h2>
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
