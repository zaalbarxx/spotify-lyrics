import { SpotifyWebHelper as WebHelper } from 'node-spotify-webhelper';
import { SpotifyStatus } from './../models/SpotifyStatus';
import { Song } from './../models/Song';

const transformStatusToModel = (status: SpotifyStatus): Song => ({
  ...status.track.track_resource,
  length: status.track.length,
  album: { ...status.track.album_resource },
  artist: { ...status.track.artist_resource },
});

export default class SpotifyWebHelper extends WebHelper {
  getStatus() {
    return new Promise((resolve, reject) => {
      super.getStatus((err, result) => {
        if (err) return reject(err);
        resolve(transformStatusToModel(result));
      });
    });
  }
}
