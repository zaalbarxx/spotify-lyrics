// @flow
import { Observable } from 'rxjs/Observable';
import { createAction } from 'redux-actions';
import { empty } from 'ramda';
import { SpotifyStatus } from '../types/SpotifyStatus';
import SpotifyWebHelper from './../services/SpotifyWebHelper';
import { StoreAction } from '../types/StoreAction';

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
export const TRACK_CHANGED = 'TRACK_CHANGED';

const defaultState = {
  status: null,
  currentId: null,
  webHelperError: null,
  loaded: false,
};

export default function songsReducer(
  state: SongsStateType = defaultState,
  action: StoreAction<*>
): SongsStateType {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CURRENT_STATUS:
      return {
        ...state,
        loaded: true,
        status: payload
      };
    case TRACK_CHANGED:
      return { ...state, currentId: payload };
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
export const trackChanged = createAction(TRACK_CHANGED, payload => payload);

// selectors
export const getTrackNameAndArtistName = ({ songs }: { songs: SongsStateType }) => ({
  track: songs.status ? songs.status.track.name : null,
  artist: songs.status ? songs.status.track.artist.name : null,
});

// epics
const spotifyWebHelper = new SpotifyWebHelper();

export const initializeWebHelperEpic = (action$: Observable<StoreAction>, store: Store) =>
  action$.ofType(INITIALIZE_WEB_HELPER)
    .flatMap((action) =>
      Observable.interval(1000)
          .flatMap(() => Observable.fromPromise(spotifyWebHelper.getStatusAsync())
        )
        .filter(empty)
        .filter((status) => SpotifyWebHelper.didStatusChange(
          store.getState().songs.status,
          status)
        )
        .flatMap((status) => {
          const actions = [Observable.of(updateCurrentStatus(status))];
          if (store.getState().songs.currentId !== status.track.uri) {
            actions.push(Observable.of(trackChanged(status.track.uri)));
          }
          return Observable.concat(...actions);
        })
        .catch((e) => {
  console.log('EMPTY');
          return Observable.empty();
          return Observable.of(updateCurrentStatusError(e.toString()));
        })
        .retry()
    );
