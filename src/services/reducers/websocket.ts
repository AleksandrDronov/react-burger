import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_ORDERS,
  TWsActions,
} from '../actions/websocket';
import { TOrdersFeed } from '../types/data';


type TWsState = {
  wsConnected: boolean;
  orders?: TOrdersFeed;
  userOrders?: TOrdersFeed;
}
const initialState: TWsState = {
  wsConnected: false,
  orders: undefined,
  userOrders: undefined
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_AUTH_GET_ORDERS:
      return {
        ...state,
        userOrders: { ...action.payload, orders: action.payload.orders.reverse() }
      };
    default:
      return state;
  }
};
