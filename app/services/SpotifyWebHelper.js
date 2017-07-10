import { SpotifyWebHelper as WebHelper } from 'node-spotify-webhelper';
import Promise from 'bluebird';
import { pick, omit } from 'ramda';
import deepEquals from 'deep-equal';
import { SpotifyStatus, SpotifyResponse } from '../types/SpotifyStatus';
import { Track } from '../types/Track';

type TransformedResponse = SpotifyStatus & { track: Track };

export default class SpotifyWebHelper extends WebHelper {
  getStatusAsync(): Promise {
    throw new Error("ERR");
    return Promise.fromCallback((cb) => this.getStatus(cb))
      .then((res: ?SpotifyResponse) => {
        if (!res) throw new Error('No response from Spotify');
        return SpotifyWebHelper.transformResponseToStatus(res);
      });
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

  static didStatusChange(previousStatus, currentStatus) {
    return !deepEquals(
      omit(['server_time'], previousStatus),
      omit(['server_time'], currentStatus)
    );
  }
}
