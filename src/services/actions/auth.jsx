import { getResponseData } from "./ingredients";
import { baseUrl } from "./ingredients";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const AUTHORIZATION_REQUEST = "AUTHORIZATION_REQUEST";
export const AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED = "AUTHORIZATION_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET2_PASSWORD_REQUEST = "RESET2_PASSWORD_REQUEST";
export const RESET2_PASSWORD_SUCCESS = "RESET2_PASSWORD_SUCCESS";
export const RESET2_PASSWORD_FAILED = "RESET2_PASSWORD_FAILED";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const SAVE_USER_REQUEST = "SAVE_USER_REQUEST";
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const SAVE_USER_FAILED = "SAVE_USER_FAILED";


export function registrationRequest(form) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
    fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then(getResponseData)
      .then(data => {
        dispatch({
          type: REGISTRATION_SUCCESS,
          registrationDetals: data,
        });
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
        dispatch({
          type: REGISTRATION_FAILED,
          registrationDetals: null,
        });
      });
  };
};

export function loginRequest(form) {
  return function (dispatch) {
    dispatch({
      type: AUTHORIZATION_REQUEST,
    });
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then(getResponseData)
      .then(data => {
        setCookie('accessToken', data.accessToken.split('Bearer ')[1], {path : '/'});
        setCookie('refreshToken', data.refreshToken, {path : '/'});
        dispatch({
          type: AUTHORIZATION_SUCCESS,
          authDetals: data,
        });
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
        dispatch({
          type: AUTHORIZATION_FAILED,
        });
      });
  };
};

export function logoutRequest() {
  return async function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
      .then(getResponseData)
      .then(() => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}

export function resetPasswordRequest(form) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    fetch(`${baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then(getResponseData)
      .then(data => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          data: data
        });
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
};

export function resetRequest(form) {
  return function (dispatch) {
    dispatch({
      type: RESET2_PASSWORD_REQUEST,
    });
    fetch(`${baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then(getResponseData)
      .then(data => {
        dispatch({
          type: RESET2_PASSWORD_SUCCESS,
          data: data
        });
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
        dispatch({
          type: RESET2_PASSWORD_FAILED,
        });
      });
  };
};

export function getUser() {
  return async function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    const data = await fetch(`${baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('accessToken')
      }
    })
      .then(getResponseData)
      .then(data => {
        dispatch({
          type: GET_USER_SUCCESS,
          userDetals: data,
        });
        return data
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
        dispatch({
          type: GET_USER_FAILED,
        });
        return err.json()
      });

    if(!data.success) {
      await fetch(`${baseUrl}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getCookie('refreshToken')
        })
      })
        .then(getResponseData)
        .then(data => {
          deleteCookie('accessToken');
          setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
        })
        .catch(err => {
          console.log(`Ошибка: ${err.status}`);
        });

        await fetch(`${baseUrl}/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + getCookie('accessToken')
          }
        })
        .then(getResponseData)
        .then(data => {
            dispatch({
              type: GET_USER_SUCCESS,
              userDetals: data,
            });
        })
        .catch(err => {
          console.log(`Ошибка: ${err.status}`);
          dispatch({
            type: GET_USER_FAILED,
          });
        });
    }

  };
};

export function saveUser(form) {
  return function (dispatch) {
    dispatch({
      type: SAVE_USER_REQUEST,
    });
    fetch(`${baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(form)
    })
      .then(getResponseData)
      .then(data => {
          dispatch({
            type: SAVE_USER_SUCCESS,
            userDetals: data,
          });
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
        dispatch({
          type: SAVE_USER_FAILED,
        });
      });
  };
};
