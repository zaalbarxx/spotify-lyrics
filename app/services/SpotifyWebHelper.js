import { SpotifyWebHelper as WebHelper } from 'node-spotify-webhelper';
import Promise from 'bluebird';
import { pick, omit } from 'ramda';
import { SpotifyStatus, SpotifyResponse } from './../models/SpotifyStatus';
import { Track } from './../models/Track';

type TransformedResponse = SpotifyStatus & { track: Track };

export default class SpotifyWebHelper extends WebHelper {
  getStatusAsync(): Promise {
    return Promise.fromCallback((cb) => this.getStatus(cb))
      .then((res: SpotifyResponse) =>
        SpotifyWebHelper.transformResponseToStatus(res)
      );
  }

  static transformResponseToStatus(status: SpotifyResponse): TransformedResponse {
    return {
      ...omit(['track'], status),
      track: {
        ...pick(['name', 'location', 'uri'], status.track.track_resource),
        length: status.track.length,
        album: { ...status.track.album_resource },
        artist: { ...status.track.artist_resource },
      }
    };
  }
}
