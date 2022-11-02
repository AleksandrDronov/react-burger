import { TOrdersFeed } from "../types/data";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_END: 'WS_CONNECTION_END' = 'WS_CONNECTION_END';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_AUTH_CONNECTION_START: 'WS_AUTH_CONNECTION_START' = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_END: 'WS_AUTH_CONNECTION_END' = 'WS_AUTH_CONNECTION_END';
export const WS_AUTH_CONNECTION_SUCCESS: 'WS_AUTH_CONNECTION_SUCCESS' = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR: 'WS_AUTH_CONNECTION_ERROR' = 'WS_AUTH_CONNECTION_ERROR';
export const WS_AUTH_CONNECTION_CLOSED: 'WS_AUTH_CONNECTION_CLOSED' = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_AUTH_GET_ORDERS: 'WS_AUTH_GET_ORDERS' = 'WS_AUTH_GET_ORDERS';

export type TSocketMiddlewareActions = {
  readonly wsInit: typeof WS_CONNECTION_START | typeof WS_AUTH_CONNECTION_START;
  readonly wsEnd: typeof WS_CONNECTION_END | typeof WS_AUTH_CONNECTION_END;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_AUTH_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED | typeof WS_AUTH_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_ERROR | typeof WS_AUTH_CONNECTION_ERROR;
  readonly onMessage: typeof WS_GET_ORDERS | typeof WS_AUTH_GET_ORDERS;
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnectionEndAction {
  readonly type: typeof WS_CONNECTION_END;
  readonly payload?: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TOrdersFeed;
}

export interface IWsAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
  readonly payload: string;
}

export interface IWsAuthConnectionEndAction {
  readonly type: typeof WS_AUTH_CONNECTION_END;
  readonly payload?: string;
}

export interface IWsAuthConnectionSuccessAction {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

export interface IWsAuthConnectionErrorAction {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
}

export interface IWsAuthConnectionCloseAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

export interface IWsAuthGetOrdersAction {
  readonly type: typeof WS_AUTH_GET_ORDERS;
  readonly payload: TOrdersFeed;
}

export type TWsConnectionStartEnd =
  IWsConnectionStartAction
  | IWsConnectionEndAction
  | IWsAuthConnectionStartAction
  | IWsAuthConnectionEndAction

  export type TWsActions =
  IWsConnectionStartAction
  | IWsConnectionEndAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionCloseAction
  | IWsGetOrdersAction
  | IWsAuthConnectionStartAction
  | IWsAuthConnectionEndAction
  | IWsAuthConnectionSuccessAction
  | IWsAuthConnectionErrorAction
  | IWsAuthConnectionCloseAction
  | IWsAuthGetOrdersAction
