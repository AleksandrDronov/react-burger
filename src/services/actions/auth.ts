import { getResponseData } from "./ingredients";
import { baseUrl } from "./ingredients";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import { TRegistrationDetals, TResetPassword, TUserFull } from "../types/data";
import { AppDispatch, AppThunk } from "../types/index";

export const REGISTRATION_REQUEST: "REGISTRATION_REQUEST" = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED: "REGISTRATION_FAILED" = "REGISTRATION_FAILED";
export const AUTHORIZATION_REQUEST: "AUTHORIZATION_REQUEST" = "AUTHORIZATION_REQUEST";
export const AUTHORIZATION_SUCCESS: "AUTHORIZATION_SUCCESS" = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED: "AUTHORIZATION_FAILED" = "AUTHORIZATION_FAILED";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";
export const RESET2_PASSWORD_REQUEST: "RESET2_PASSWORD_REQUEST" = "RESET2_PASSWORD_REQUEST";
export const RESET2_PASSWORD_SUCCESS: "RESET2_PASSWORD_SUCCESS" = "RESET2_PASSWORD_SUCCESS";
export const RESET2_PASSWORD_FAILED: "RESET2_PASSWORD_FAILED" = "RESET2_PASSWORD_FAILED";
export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const SAVE_USER_REQUEST: "SAVE_USER_REQUEST" = "SAVE_USER_REQUEST";
export const SAVE_USER_SUCCESS: "SAVE_USER_SUCCESS" = "SAVE_USER_SUCCESS";
export const SAVE_USER_FAILED: "SAVE_USER_FAILED" = "SAVE_USER_FAILED";

export interface IRegistrationRequestAction {
  readonly type: typeof REGISTRATION_REQUEST;
}

export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly registrationDetals: TRegistrationDetals;
}

export interface IRegistrationFailedAction {
  readonly type: typeof REGISTRATION_FAILED;
  readonly registrationDetals: {}
}

export interface IAuthorizationRequestAction {
  readonly type: typeof AUTHORIZATION_REQUEST;
}

export interface IAuthorizationSuccessAction {
  readonly type: typeof AUTHORIZATION_SUCCESS;
  readonly authDetals: TRegistrationDetals;
}

export interface IAuthorizationFailedAction {
  readonly type: typeof AUTHORIZATION_FAILED;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly data: TResetPassword;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IReset2PasswordRequestAction {
  readonly type: typeof RESET2_PASSWORD_REQUEST;
}

export interface IReset2PasswordSuccessAction {
  readonly type: typeof RESET2_PASSWORD_SUCCESS;
  readonly data: TResetPassword;
}

export interface IReset2PasswordFailedAction {
  readonly type: typeof RESET2_PASSWORD_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly userDetals: TUserFull;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface ISaveUserRequestAction {
  readonly type: typeof SAVE_USER_REQUEST;
}

export interface ISaveUserSuccessAction {
  readonly type: typeof SAVE_USER_SUCCESS;
  readonly userDetals: TUserFull;
}

export interface ISaveUserFailedAction {
  readonly type: typeof SAVE_USER_FAILED;
}

export type TAuthActions =
    IRegistrationRequestAction
  | IRegistrationSuccessAction
  | IRegistrationFailedAction
  | IAuthorizationRequestAction
  | IAuthorizationSuccessAction
  | IAuthorizationFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IReset2PasswordRequestAction
  | IReset2PasswordSuccessAction
  | IReset2PasswordFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | ISaveUserRequestAction
  | ISaveUserSuccessAction
  | ISaveUserFailedAction



export const registrationRequest: AppThunk = (form : { name: string, email: string, password: string }) => (dispatch: AppDispatch) => {
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
    .then(getResponseData<TRegistrationDetals>)
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
        registrationDetals: {},
      });
    });
};

export const loginRequest: AppThunk = (form: { email: string, password: string }) => (dispatch: AppDispatch) => {
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
    .then(getResponseData<TRegistrationDetals>)
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

export const logoutRequest: AppThunk = () => async(dispatch: AppDispatch) => {
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

export const resetPasswordRequest: AppThunk = (form: { email: string }) => (dispatch: AppDispatch) => {
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
    .then(getResponseData<TResetPassword>)
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

export const resetRequest: AppThunk = (form: { token: string, password: string }) => (dispatch: AppDispatch) => {
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
    .then(getResponseData<TResetPassword>)
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

export const getUser: AppThunk = () => async(dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  const data: TUserFull = await fetch(`${baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
    .then(getResponseData<TUserFull>)
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
      .then(getResponseData<TRegistrationDetals>)
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
      .then(getResponseData<TUserFull>)
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

export const saveUser: AppThunk = (form: { name: string, email: string, password: string }) => (dispatch: AppDispatch) => {
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
    .then(getResponseData<TUserFull>)
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
