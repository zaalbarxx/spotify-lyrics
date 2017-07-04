// @flow
import { handle } from 'redux-pack';
import { LOAD_CURRENT_SONG } from './../actions/songs';
import { Song } from './../models/Song';

export type songsStateType = {
  playing: boolean,
  currentSong: ?Song,
  webHelperError: ?string
};

type actionType<T> = {
  type: string,
  payload?: T
};

const defaultState = {
  currentSong: null,
  webHelperError: null,
};

export default function songs(state: songsStateType = defaultState, action: actionType<*>) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CURRENT_SONG:
      return handle(state, action, {
        success: prevState => {
          console.log(action, "ACTION");
          const newLyrics = { ...prevState.songs };
          newLyrics[payload.id] = payload.songs;
          return { ...prevState, currentSong: action.payload };
        },
        failure: prevState => ({ ...prevState, webHelperError: payload }),
      });
    default:
      return state;
  }
}

