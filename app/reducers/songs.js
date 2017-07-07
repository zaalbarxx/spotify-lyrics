// @flow
import { Observable } from 'rxjs/Observable';
import { createAction } from 'redux-actions';
import { empty, omit } from 'ramda';
import { Track } from './../models/Track';
import { SpotifyStatus } from './../models/SpotifyStatus';
import SpotifyWebHelper from './../services/SpotifyWebHelper';

export type songsStateType = {
  currentSong: ?Track,
  status: ?SpotifyStatus,
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
  currentSong: null,
  status: null,
  webHelperError: null,
  loaded: false,
};

export default function songs(state: songsStateType = defaultState,
                              action: actionType<*>): songsStateType {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CURRENT_STATUS:
      return {
        ...state,
        loaded: true,
        currentSong: payload.track,
        status: omit(['track'], payload)
      };
    default:
      return state;
  }
}

export const initializeWebHelper = createAction(INITIALIZE_WEB_HELPER);
const updateCurrentStatus = createAction(UPDATE_CURRENT_STATUS, (payload) => payload);

const spotifyWebHelper = new SpotifyWebHelper();

export const initializeWebHelperEpic = (action$) =>
  action$.ofType(INITIALIZE_WEB_HELPER)
    .mergeMap(() =>
      Observable.interval(1000)
        .flatMap(() => Observable.fromPromise(spotifyWebHelper.getStatusAsync()))
        .filter(empty)
        .map((status) => updateCurrentStatus(status))
    );
