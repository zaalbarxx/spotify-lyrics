// @flow
import { LOAD_LYRICS } from './../actions/lyrics';
import { handle } from 'redux-pack';

export type lyricsStateType = {
  lyrics: { [string]: string },
  loading: boolean,
  error: ?string
};

type actionType<T> = {
  type: string,
  payload?: T
};

const defaultState = {
  lyrics: {},
  loading: false,
  error: null,
};

export default function lyrics(state: lyricsStateType = defaultState, action: actionType) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_LYRICS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: true,
          error: false,
        }),
        finish: prevState => ({ ...prevState, loading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => {
          const newLyrics = { ...prevState.lyrics };
          newLyrics[payload.id] = payload.lyrics;
          return { ...prevState, lyrics: newLyrics };
        }
      });
    default:
      return state;
  }
}
