import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import { HashRouter as Router } from 'react-router-dom';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_END,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_END,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_ORDERS,
  TSocketMiddlewareActions,
} from './services/actions/websocket';

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';

const wsActions: TSocketMiddlewareActions = {
  wsInit: WS_CONNECTION_START,
  wsEnd: WS_CONNECTION_END,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS
};

const wsActionsAuth: TSocketMiddlewareActions = {
  wsInit: WS_AUTH_CONNECTION_START,
  wsEnd: WS_AUTH_CONNECTION_END,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_AUTH_GET_ORDERS
};

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrl, wsActionsAuth)));
export const store = createStore(rootReducer, enhancer);

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
