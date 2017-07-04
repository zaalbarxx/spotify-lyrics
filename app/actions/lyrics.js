import LyricsApi from './../services/LyricsApi';

export const LOAD_LYRICS = 'LOAD_LYRICS';

const lyricsApi = new LyricsApi();

export function loadLyrics(track) {
  return {
    type: LOAD_LYRICS,
    promise: lyricsApi.fetch(track),
  }
}
