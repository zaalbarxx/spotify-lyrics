import { Artist } from './Artist';
import { Album } from './Album';

export type Song = {
  name: string,
  uri: string,
  length: number,
  album: Album,
  artist: Artist,
  location: {}
};
