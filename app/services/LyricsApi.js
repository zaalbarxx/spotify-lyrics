import axios from 'axios';
import cheerio from 'cheerio';

export default class LyricsApi {
  baseEndpoint = 'https://www.musixmatch.com';
  searchEndpoint = `${this.baseEndpoint}/search/:search/tracks`;

  async fetch({ track, artist }: { track: string, artist: string }) {
    const query = encodeURI(`${track} ${artist}`.replace(' ', '-'));
    const endpoint = this.searchEndpoint.replace(':search', query);
    const searchPageResponse = await axios.get(endpoint);
    const $searchPage = cheerio.load(searchPageResponse.data);
    const lyricsPageUrl = $searchPage('.tracks.list li:first-child a.title').prop('href');

    if (!lyricsPageUrl) throw new Error('No lyrics found!');

    const lyricsPageResponse = await axios.get(`${this.baseEndpoint}${lyricsPageUrl}`);
    const $lyricsPage = cheerio.load(lyricsPageResponse.data);
    const lyrics = $lyricsPage('.mxm-lyrics__content').map((i, el) => cheerio(el).text()).get().join(' ');

    if (!lyrics) throw new Error('No lyrics found!');

    return lyrics;
  }
}
