import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../index';
import { TAuthActions } from '../actions/auth';
import { TIngredientsActions } from '../actions/ingredients';
import { TWsActions } from '../actions/websocket';

type TApplicationActions = TAuthActions | TIngredientsActions | TWsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
