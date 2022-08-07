import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burger from './constructor-element.module.css'
import ingredientType from '../../utils/type';
import { useDispatch } from 'react-redux';
import { DELET_INGREDIENT, MOVE_CARD } from '../../services/actions/ingredients';
import { useDrag, useDrop } from "react-dnd";


export default function ElementConstructor ({ ingredient , index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDrag }, drag] = useDrag({
    type: "element",
    item: { index },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [ { handlerId }, drop] = useDrop({
    accept: "element",
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      };

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      };

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;

    }
  });

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_CARD,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  const opacity = isDrag ? 0 : 1;

  drag(drop(ref))

  return (
    <div className={burger.filling} style={{ opacity }} ref={ref} data-handler-id={handlerId} >
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch({ type: DELET_INGREDIENT, id: ingredient.id, _id: ingredient._id })}
      />
    </div>
  )
};

ElementConstructor.propTypes =  {
  ingredient: ingredientType.isRequired,
  index: PropTypes.number
}


