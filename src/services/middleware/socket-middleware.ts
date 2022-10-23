import { Middleware, MiddlewareAPI } from "redux";
import { TSocketMiddlewareActions, TWsConnectionStartEnd } from "../actions/websocket";
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (wsUrl: string, wsActions: TSocketMiddlewareActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWsConnectionStartEnd)=> {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsEnd, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      };

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsEnd) {
          socket.close(1000);
        };
      };

      next(action);
    };
  };
};
