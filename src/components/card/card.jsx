import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


class Card extends React.Component {

  render() {
    return(
      <div style={{position: 'relative', width: '272px', height: '208px' }}>
        <img src={this.props.image} alt={this.props.name} className="pl-4"/>
        <div style={{display: 'flex', justifyContent: 'center'}} className="mt-1 mb-1">
            <h3 className="text text_type_digits-default mr-2">{this.props.price}</h3>
            <CurrencyIcon type="primary" />
        </div>
        <h4 className="text text_type_main-default" style={{textAlign: 'center'}}>{this.props.name}</h4>
        <Counter count={1} size="default" />
      </div>
    );
  }
};

export default Card;
