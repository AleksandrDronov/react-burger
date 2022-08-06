import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  UPDATE_TYPE,
  DELET_INGREDIENT,
  CHANGE_INGREDIENT_BUN,
  INCREASE_INGREDIENT,
  MOVE_CARD,
  GET_ORDERDETAILS_REQUEST,
  GET_ORDERDETAILS_SUCCESS,
  GET_ORDERDETAILS_FAILED
} from '../actions/ingredients'

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  ingredientsInConstructor: [],

  orderDetals: {},
  orderDetalsRequest: false,
  orderDetalsFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case UPDATE_TYPE: {
      return {
        ...state,
        ingredientsInConstructor: [
          ...state.ingredientsInConstructor,
          ...state.ingredients.filter(item => item._id === action._id).map(item => ({ ...item, id: Math.random() }))
        ]
      };
    }
    case INCREASE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.map(item => item._id === action._id ? { ...item, __v: ++item.__v } : item)
      };
    }
    case DELET_INGREDIENT: {
      return {
        ...state,
        ingredientsInConstructor: state.ingredientsInConstructor.filter(element => element.id !== action.id),
        ingredients: state.ingredients.map(item => {
          if(item._id === action._id && item.type !== "bun") {
            return { ...item, __v: --item.__v }
          } else if (item._id === action._id && item.type === "bun") {
            return { ...item, __v: item.__v - 2 }
          } else {
            return item;
          }
        })
      };
    }
    case CHANGE_INGREDIENT_BUN: {
      return {
        ...state,
        ingredientsInConstructor: [
          ...state.ingredients.filter(item => item._id === action._id),
          ...state.ingredientsInConstructor.filter(item => item.type !== "bun"),
        ],
        ingredients: state.ingredients.map(item => {
            if(item.type === "bun" && item._id === action._id && item.__v === 0) {
              return { ...item, __v: 2 }
            }
            if (item.type === "bun" && item._id !== action._id && item.__v === 2){
              return { ...item, __v: 0 }
            }
              return item;
          })
      };
    }
    case MOVE_CARD: {
      const ingredientsConstructor = [...state.ingredientsInConstructor];
      ingredientsConstructor.splice(action.dragIndex, 1);
      ingredientsConstructor.splice(action.hoverIndex, 0, [...state.ingredientsInConstructor][action.dragIndex]);

      return {
        ...state,
        ingredientsInConstructor: ingredientsConstructor,
      };
    }
    case GET_ORDERDETAILS_REQUEST: {
      return {
        ...state,
        orderDetalsRequest: true
      };
    }
    case GET_ORDERDETAILS_SUCCESS: {
      return {
        ...state,
        orderDetalsFailed: false,
        orderDetals: action.orderDetals,
        orderDetalsRequest: false
      };
    }
    case GET_ORDERDETAILS_FAILED: {
      return { ...state, orderDetalsFailed: true, orderDetalsRequest: false };
    }
    default: {
      return state;
    }
  };
};
