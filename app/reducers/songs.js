// @flow
import { Observable } from 'rxjs/Observable';
import { createAction } from 'redux-actions';
import { Song } from './../models/Song';
import SpotifyWebHelper from 'spotify-web-helper';

export type songsStateType = {
  playing: boolean,
  currentSong: ?Song,
  webHelperError: ?string
};

type actionType<T> = {
  type: string,
  payload?: T
};

const INITIALIZE_WEB_HELPER = 'INITIALIZE_WEB_HELPER';
const LOAD_CURRENT_SONG = 'LOAD_CURRENT_SONG';
const UPDATE_CURRENT_STATUS = 'UPDATE_CURRENT_STATUS';

const defaultState = {
  playing: false,
  currentSong: null,
  webHelperError: null,
};

export default function songs(state: songsStateType = defaultState, action: actionType<*>) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CURRENT_STATUS:
      return { ...state, playing: payload.playing, currentSong: payload };
    default:
      return state;
  }
}

export const initializeWebHelper = createAction(INITIALIZE_WEB_HELPER);
const updateCurrentStatus = createAction(UPDATE_CURRENT_STATUS, (payload) => payload);

let spotifyWebHelper;

spotifyWebHelper = new SpotifyWebHelper();
console.log('NEW HELPER', spotifyWebHelper);
spotifyWebHelper.player.on('ready', () => console.log('ready'));
spotifyWebHelper.player.on('error', () => console.log('error'));

// epics
export const initializeWebHelperEpic = (action$) =>
  action$.ofType(INITIALIZE_WEB_HELPER)
    .mergeMap(() => {

      return Observable.fromEvent(spotifyWebHelper.player, 'ready')
        .switchMap(() => Observable.fromEvent(spotifyWebHelper.player, 'status-will-change'))
        .map((status) => updateCurrentStatus(status));
    });
