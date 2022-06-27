import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import card from './card.module.css'


class Card extends React.Component {

  render() {
    return(
      <div className={card.card}>
        <img src={this.props.image} alt={this.props.name} className="pl-4"/>
        <div className={card.price}>
            <h3 className="text text_type_digits-default mr-2">{this.props.price}</h3>
            <CurrencyIcon type="primary" />
        </div>
        <h4 className={`${card.name} text text_type_main-default`}>{this.props.name}</h4>
        <Counter count={1} size="default" />
      </div>
    );
  }
};


Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Card;
