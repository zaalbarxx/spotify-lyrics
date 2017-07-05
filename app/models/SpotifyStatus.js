import { Album } from './Album';
import { Artist } from './Artist';
import { Song } from './Song';

export type SpotifyStatus = {
  client_version: string,
  context: {},
  next_enabled: true,
  online: true,
  open_graph_state: {
    posting_disabled: boolean,
    private_session: boolean
  },
  play_enabled: boolean,
  playing: boolean,
  playing_position: number,
  prev_enabled: boolean,
  repeat: boolean,
  running: boolean,
  server_time: number,
  shuffle: boolean,
  track: {
    album_resource: Album,
    artist_resource: Artist,
    track_resource: Song,
    length: number,
  }
};
