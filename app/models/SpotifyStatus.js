import { Track } from './Track';

export type SpotifyResource = {
  name: string,
  uri: string,
  location: {
    og: ?string
  }
};

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
  shuffle: boolean
};

export type SpotifyResponse = SpotifyStatus & {
  track: {
    album_resource: SpotifyResource,
    artist_resource: SpotifyResource,
    track_resource: SpotifyResource,
    length: number
  }
};
