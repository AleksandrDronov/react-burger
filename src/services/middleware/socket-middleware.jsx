import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socketFeed = null;
    let socketOrders = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsFeed, wsOrders, wsEnd, onOpen, onClose, onError, onOrders, onUserOrders } = wsActions;
      const { authorization } = getState().auth;
      const accessToken = getCookie('accessToken');

      if (type === wsFeed) {
        socketFeed = new WebSocket(`${wsUrl}/all`);
      };

      if (type === wsOrders && authorization.user) {
        socketOrders = new WebSocket(`${wsUrl}?token=${accessToken}`);
      };

      if (socketFeed) {
        socketFeed.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socketFeed.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socketFeed.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onOrders, payload: parsedData });
        };

        socketFeed.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsEnd) {
          socketFeed.close(1000);
        };
      };

      if (socketOrders) {
        socketOrders.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socketOrders.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socketOrders.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onUserOrders, payload: parsedData });
        };

        socketOrders.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsEnd) {
          socketOrders.close(1000);
        };

      };

      next(action);
    };
  };
};
