import { getCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk } from '../types';
import { TIngredient, TIngredients, TOrderDetails } from '../types/data';

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const UPDATE_TYPE: "UPDATE_TYPE" = "UPDATE_TYPE";
export const DELET_INGREDIENT: "DELET_INGREDIENT" = "DELET_INGREDIENT";
export const INCREASE_INGREDIENT: "INCREASE_INGREDIENT" = "INCREASE_INGREDIENT";
export const CHANGE_INGREDIENT_BUN: "CHANGE_INGREDIENT_BUN" = "CHANGE_INGREDIENT_BUN";
export const MOVE_CARD: "MOVE_CARD" = "MOVE_CARD";
export const GET_ORDERDETAILS_REQUEST: "GET_ORDERDETAILS_REQUEST" = "GET_ORDERDETAILS_REQUEST";
export const GET_ORDERDETAILS_SUCCESS: "GET_ORDERDETAILS_SUCCESS" = "GET_ORDERDETAILS_SUCCESS";
export const GET_ORDERDETAILS_FAILED: "GET_ORDERDETAILS_FAILED" = "GET_ORDERDETAILS_FAILED";
export const CLEARE_CONSTRUCTOR: "CLEARE_CONSTRUCTOR" = "CLEARE_CONSTRUCTOR";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IUpdateTypeAction {
  readonly type: typeof UPDATE_TYPE;
  readonly _id: string;
  readonly __v: number;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELET_INGREDIENT;
  readonly _id: string;
  readonly id: number;
}

export interface IIncreaseIngredientAction {
  readonly type: typeof INCREASE_INGREDIENT;
  readonly _id: string;
  readonly __v: number;
}

export interface IChangeIngredientBunAction {
  readonly type: typeof CHANGE_INGREDIENT_BUN;
  readonly _id: string;
  readonly __v: number;
}

export interface IMoveCardAction {
  readonly type: typeof MOVE_CARD;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IGetOrderDetailsRequestAction {
  readonly type: typeof GET_ORDERDETAILS_REQUEST;
}

export interface IGetOrderDetailsSuccessAction {
  readonly type: typeof GET_ORDERDETAILS_SUCCESS;
  readonly orderDetals: TOrderDetails;
}

export interface IGetOrderDetailsFailedAction {
  readonly type: typeof GET_ORDERDETAILS_FAILED;
}

export interface ICleareConstructorAction {
  readonly type: typeof CLEARE_CONSTRUCTOR;
}

export type TIngredientsActions =
    IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IUpdateTypeAction
  | IDeleteIngredientAction
  | IIncreaseIngredientAction
  | IMoveCardAction
  | IGetOrderDetailsRequestAction
  | IGetOrderDetailsSuccessAction
  | IGetOrderDetailsFailedAction
  | ICleareConstructorAction
  | IChangeIngredientBunAction

export const baseUrl: "https://norma.nomoreparties.space/api" = "https://norma.nomoreparties.space/api";

export function getResponseData<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

export const getIngredients: AppThunk = () => async(dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  await fetch(`${baseUrl}/ingredients`)
    .then(getResponseData<TIngredients>)
    .then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data,
      });
    })
    .catch(err => {
      console.log(`Ошибка: ${err.status}`);
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    });
}

export const getOrderDetails: AppThunk = (allId: ReadonlyArray<string>) => async(dispatch: AppDispatch) => {
  dispatch({
    type: GET_ORDERDETAILS_REQUEST,
  });
  await fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      ingredients: allId,
    }),
  })
    .then(getResponseData<TOrderDetails>)
    .then(res => {
      dispatch({
        type: GET_ORDERDETAILS_SUCCESS,
        orderDetals: res,
      });
      dispatch({
        type: CLEARE_CONSTRUCTOR,
      });
    })
    .catch(err => {
      console.log(`Ошибка: ${err.status}`);
      dispatch({
        type: GET_ORDERDETAILS_FAILED,
      });
    });
}
