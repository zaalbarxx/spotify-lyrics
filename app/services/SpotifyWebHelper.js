import WebHelper from 'spotify-web-helper';
import { SpotifyStatus } from './../models/SpotifyStatus';
import { Song } from './../models/Song';

const transformStatusToModel = (status: SpotifyStatus): Song => ({
  ...status.track.track_resource,
  length: status.track.length,
  album: { ...status.track.album_resource },
  artist: { ...status.track.artist_resource },
});

export default WebHelper;
