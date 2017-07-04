import SpotifyWebHelper from './../services/SpotifyWebHelper';

export const LOAD_CURRENT_SONG = 'LOAD_CURRENT_SONG';

const spotifyWebHelper = new SpotifyWebHelper();
console.log(spotifyWebHelper);
export function loadCurrentSong() {
  return {
    type: LOAD_CURRENT_SONG,
    promise: spotifyWebHelper.getStatus(),
  };
}

