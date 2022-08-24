import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer
});
