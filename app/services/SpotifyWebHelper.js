import { SpotifyWebHelper as WebHelper } from 'node-spotify-webhelper';
import Promise from 'bluebird';

export default class SpotifyWebHelper extends WebHelper {
  constructor(...opts) {
    super(...opts);
    this.getStatus = Promise.promisify(this.getStatus);
  }
}
