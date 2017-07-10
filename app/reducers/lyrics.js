// @flow
import { createAction } from 'redux-actions';
import { Observable } from 'rxjs/Observable';
import { TRACK_CHANGED, getTrackNameAndArtistName } from './songs';
import LyricsApi from './../services/LyricsApi';
import { StoreAction } from '../types/StoreAction';

export type LyricsStateType = {
  lyrics: ?string,
  currentId: ?string,
  error: ?string
};

const LOAD_LYRICS_SUCCESS = 'LOAD_LYRICS_SUCCESS';
const LOAD_LYRICS_FAILED = 'LOAD_LYRICS_FAILED';

const defaultState = {
  lyrics: null,
  currentId: null,
  error: null,
};

export default function lyricsReducer(
  state: LyricsStateType = defaultState,
  action: StoreAction<*>) {
  const { type, payload } = action;
  switch (type) {
    case TRACK_CHANGED:
      return { ...state, ...defaultState };
    case LOAD_LYRICS_SUCCESS:
      return { ...state, lyrics: payload.lyrics, currentId: payload.currentId, error: null };
    case LOAD_LYRICS_FAILED:
      return { ...state, lyrics: null, error: payload };
    default:
      return state;
  }
}

const loadLyricsSuccess = createAction(
  LOAD_LYRICS_SUCCESS,
  (lyrics, currentId) => ({ lyrics, currentId })
);
const loadLyricsFailed = createAction(LOAD_LYRICS_FAILED, payload => payload);

const lyricsApi = new LyricsApi();

export const fetchLyricsEpic = (action$: Observable<StoreAction>, store: Store) =>
  action$
    .ofType(TRACK_CHANGED)
    .mergeMap((action) =>
      Observable.fromPromise(lyricsApi.fetch(getTrackNameAndArtistName(store.getState())))
        .map((lyrics) => loadLyricsSuccess(lyrics, action.payload))
        .catch((error) => Observable.of(loadLyricsFailed(error.toString())))
    );
