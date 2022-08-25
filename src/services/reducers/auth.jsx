import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET2_PASSWORD_REQUEST,
  RESET2_PASSWORD_SUCCESS,
  RESET2_PASSWORD_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SAVE_USER_REQUEST,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILED
} from '../actions/auth'

const initialState = {
  registration: {},
  registrationRequest: false,
  registrationFailed: false,

  authorization: {},
  authorizationRequest: false,
  authorizationFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  resetPassword: {},
  resetPasswordRequest: false,
  resetPasswordFailed: false,

  resetPassword2: {},
  resetPassword2Request: false,
  resetPassword2Failed: false,


  getUserRequest: false,
  getUserFailed: false,

  saveUserRequest: false,
  saveUserFailed: false,

};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationFailed: false,
        registration: action.registrationDetals,
        registrationRequest: false
      };
    }
    case REGISTRATION_FAILED: {
      return { ...state,
        registrationFailed: true,
        registration: action.registrationDetals,
        registrationRequest: false
      };
    }
    case AUTHORIZATION_REQUEST: {
      return {
        ...state,
        authorizationRequest: true
      };
    }
    case AUTHORIZATION_SUCCESS: {
      return {
        ...state,
        authorizationFailed: false,
        authorization: action.authDetals,
        authorizationRequest: false
      };
    }
    case AUTHORIZATION_FAILED: {
      return { ...state, authorizationFailed: true, authorizationRequest: false };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutFailed: false,
        authorization: {},
        logoutRequest: false
      };
    }
    case LOGOUT_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPassword: action.data,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return { ...state, resetPasswordFailed: true, resetPasswordRequest: false };
    }
    case RESET2_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPassword2Request: true
      };
    }
    case RESET2_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword2Failed: false,
        resetPassword2Request: false,
        resetPassword2: action.data,
      };
    }
    case RESET2_PASSWORD_FAILED: {
      return { ...state, resetPassword2Failed: true, resetPassword2Request: false };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserFailed: false,
        authorization: action.userDetals,
        getUserRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }
    case SAVE_USER_REQUEST: {
      return {
        ...state,
        saveUserRequest: true,
      };
    }
    case SAVE_USER_SUCCESS: {
      return {
        ...state,
        saveUserFailed: false,
        authorization: action.userDetals,
        saveUserRequest: false,
      };
    }
    case SAVE_USER_FAILED: {
      return { ...state, saveUserFailed: true, saveUserRequest: false };
    }
    default: {
      return state;
    }
  }
}
