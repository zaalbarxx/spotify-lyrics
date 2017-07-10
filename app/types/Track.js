import { Artist } from './Artist';
import { Album } from './Album';

export type Track = {
  name: string,
  uri: string,
  length: number,
  album: Album,
  artist: Artist,
  location: {}
};
