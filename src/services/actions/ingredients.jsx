export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const UPDATE_TYPE = "UPDATE_TYPE";
export const DELET_INGREDIENT = "DELET_INGREDIENT";
export const INCREASE_INGREDIENT = "INCREASE_INGREDIENT";
export const CHANGE_INGREDIENT_BUN = "CHANGE_INGREDIENT_BUN";
export const MOVE_CARD = "MOVE_CARD";
export const GET_ORDERDETAILS_REQUEST = "GET_ORDERDETAILS_REQUEST";
export const GET_ORDERDETAILS_SUCCESS = "GET_ORDERDETAILS_SUCCESS";
export const GET_ORDERDETAILS_FAILED = "GET_ORDERDETAILS_FAILED";
export const CLEARE_CONSTRUCTOR = "CLEARE_CONSTRUCTOR";
export const CURRENT_INGREDIENT = "CURRENT_INGREDIENT";



export const baseUrl = "https://norma.nomoreparties.space/api";

export function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getIngredients() {
  return async function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    await fetch(`${baseUrl}/ingredients`)
      .then(getResponseData)
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

export function getOrderDetails(allId) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDERDETAILS_REQUEST,
    });
    fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: allId,
      }),
    })
      .then(getResponseData)
      .then((res) => {
        dispatch({
          type: GET_ORDERDETAILS_SUCCESS,
          orderDetals: res,
        });
        dispatch({
          type: CLEARE_CONSTRUCTOR,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDERDETAILS_FAILED,
        });
      });
  };
}
