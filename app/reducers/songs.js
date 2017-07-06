// @flow
import { Observable } from 'rxjs/Observable';
import { createAction } from 'redux-actions';
import { Song } from './../models/Song';
import SpotifyWebHelper from './../services/SpotifyWebHelper';

export type songsStateType = {
  playing: boolean,
  currentSong: ?Song,
  webHelperError: ?string,
  loaded: boolean
};

type actionType<T> = {
  type: string,
  payload?: T
};

const INITIALIZE_WEB_HELPER = 'INITIALIZE_WEB_HELPER';
const UPDATE_CURRENT_STATUS = 'UPDATE_CURRENT_STATUS';

const defaultState = {
  playing: false,
  currentSong: null,
  webHelperError: null,
  loaded: false,
};

export default function songs(
  state: songsStateType = defaultState,
  action: actionType<*>
): songsStateType {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CURRENT_STATUS:
      return { ...state, loaded: true, playing: payload.playing, currentSong: payload };
    default:
      return state;
  }
}

export const initializeWebHelper = createAction(INITIALIZE_WEB_HELPER);
const updateCurrentStatus = createAction(UPDATE_CURRENT_STATUS, (payload) => payload);

const spotifyWebHelper = new SpotifyWebHelper();
console.log(spotifyWebHelper);
// epics
export const initializeWebHelperEpic = (action$) =>
  action$.ofType(INITIALIZE_WEB_HELPER)
    .do(() => console.log(action$))
    .mergeMap(() =>
      Observable.interval(1000)
        .switchMap(() => Observable.fromPromise(spotifyWebHelper.getStatus()))
        .map((status) => updateCurrentStatus(status))
    );
