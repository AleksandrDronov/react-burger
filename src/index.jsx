import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app.jsx';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './services/middleware/socket-middleware.jsx';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  WS_FEED_CONNECTION_START,
  WS_ORDERS_CONNECTION_START,
  WS_CONNECTION_END,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS
} from './services/actions/websocket.jsx';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsFeed: WS_FEED_CONNECTION_START,
  wsOrders: WS_ORDERS_CONNECTION_START,
  wsEnd: WS_CONNECTION_END,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS,
  onUserOrders: WS_GET_USER_ORDERS
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));
const store = createStore(rootReducer, enhancer);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

