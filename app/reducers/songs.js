// @flow
import { Observable } from 'rxjs/Observable';
import { createAction } from 'redux-actions';
import { empty } from 'ramda';
import { SpotifyStatus } from './../models/SpotifyStatus';
import SpotifyWebHelper from './../services/SpotifyWebHelper';

export type SongsStateType = {
  status: ?SpotifyStatus,
  currentId: ?string,
  webHelperError: ?string,
  loaded: boolean
};

type actionType<T> = {
  type: string,
  payload?: T
};

export const INITIALIZE_WEB_HELPER = 'INITIALIZE_WEB_HELPER';
export const UPDATE_CURRENT_STATUS = 'UPDATE_CURRENT_STATUS';
export const UPDATE_CURRENT_STATUS_ERROR = 'UPDATE_CURRENT_STATUS_ERROR';

const defaultState = {
  status: null,
  currentId: '123',
  webHelperError: null,
  loaded: false,
};

export default function songsReducer(
  state: SongsStateType = defaultState,
  action: actionType<*>
): SongsStateType {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CURRENT_STATUS:
      return {
        ...state,
        loaded: true,
        status: payload,
        currentId: payload.track.uri
      };
    case UPDATE_CURRENT_STATUS_ERROR:
      return { ...state, webHelperError: payload };
    default:
      return state;
  }
}

// action creators
export const initializeWebHelper = createAction(INITIALIZE_WEB_HELPER);
export const updateCurrentStatus = createAction(UPDATE_CURRENT_STATUS, payload => payload);
const updateCurrentStatusError = createAction(UPDATE_CURRENT_STATUS_ERROR, payload => payload);

// selectors
export const getTrackNameAndArtistName = ({ songs }: { songs: SongsStateType}) => ({
  track: songs.status ? songs.status.track.name : null,
  artist: songs.status ? songs.status.track.artist.name : null,
});

// epics
const spotifyWebHelper = new SpotifyWebHelper();

export const initializeWebHelperEpic = (action$, store: Store) =>
  action$.ofType(INITIALIZE_WEB_HELPER)
    .mergeMap(() =>
      Observable.interval(1000)
        .flatMap(() => Observable.fromPromise(spotifyWebHelper.getStatusAsync()))
        .filter(empty)
        .filter((status) => SpotifyWebHelper.didStatusChange(store.getState().songs.status, status))
        .map((status) => updateCurrentStatus(status))
        .catch((e) => Observable.of(updateCurrentStatusError(e.toString())))
    );
