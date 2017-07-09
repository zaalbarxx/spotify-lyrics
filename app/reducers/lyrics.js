// @flow
import { createAction } from 'redux-actions';
import { Observable } from 'rxjs/Observable';
import { UPDATE_CURRENT_STATUS, getTrackNameAndArtistName } from './songs';
import LyricsApi from './../services/LyricsApi';

export type LyricsStateType = {
  lyrics: string,
  currentId: ?string,
  error: ?string
};

type actionType<T> = {
  type: string,
  payload?: T
};

const LOAD_LYRICS_SUCCESS = 'LOAD_LYRICS_SUCCESS';
const LOAD_LYRICS_FAILED = 'LOAD_LYRICS_FAILED';

const defaultState = {
  lyrics: '',
  currentId: null,
  error: null,
};

export default function lyricsReducer(state: LyricsStateType = defaultState,
                                      action: actionType<*>) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_LYRICS_SUCCESS:
      return { ...state, lyrics: payload.lyrics, currentId: payload.currentId, error: null };
    case LOAD_LYRICS_FAILED:
      return { ...state, lyrics: '', error: payload };
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

export const fetchLyricsEpic = (action$, store: Store) =>
  action$
    .ofType(UPDATE_CURRENT_STATUS)
    .mergeMap((action) =>
      Observable.of(action)
        .filter(() => {
          const state = store.getState();
          return state.songs.currentId !== state.lyrics.currentId;
        })
        .switchMap(() =>
          Observable.fromPromise(lyricsApi.fetch(getTrackNameAndArtistName(store.getState())))
            .map((lyrics) => loadLyricsSuccess(lyrics, store.getState().songs.currentId))
            .catch((error) => Observable.of(loadLyricsFailed(error.toString())))
        )
    );
