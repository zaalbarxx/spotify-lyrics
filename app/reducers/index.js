// @flow
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer as router } from 'react-router-redux';
import lyrics from './lyrics';
import songs, { initializeWebHelperEpic } from './songs';

export const rootEpic = combineEpics(
  initializeWebHelperEpic
);

export const rootReducer = combineReducers({
  lyrics,
  songs,
  router,
});
