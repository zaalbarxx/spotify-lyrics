// @flow
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer as router } from 'react-router-redux';
import lyrics from './lyrics';
import songs from './songs';

export const rootEpic = combineEpics(

);

export const rootReducer = combineReducers({
  lyrics,
  songs,
  router,
});
