// @flow
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { rootEpic, rootReducer } from '../reducers';
import type { lyricsStateType } from '../reducers/lyrics';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const observable = createEpicMiddleware(rootEpic);
const pack = reduxPackMiddleware;
const enhancer = applyMiddleware(router, observable, pack);

function configureStore(initialState?: lyricsStateType) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
