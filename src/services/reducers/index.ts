import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { authReducer } from './auth';
import { wsReducer } from './websocket';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  ordersList: wsReducer
});
