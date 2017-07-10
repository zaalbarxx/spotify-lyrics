// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lyrics from '../../components/Lyrics/Lyrics';
import Loader from '../../components/Loader/Loader';
import TrackInfo from '../../components/TrackInfo/TrackInfo';
import styles from './LyricsPage.scss';
import { Track } from '../../types/Track';

export class LyricsPage extends Component {
  props: {
    lyrics: ?string,
    track: ?Track,
    lyricsError: ?string
  }

  render() {
    const { lyrics, track, lyricsError } = this.props;
    let render = null;
    if (track && lyrics) {
      render = (
        <div>
          <TrackInfo track={track} />
          <Lyrics lyrics={lyrics} track={track} lyricsError={lyricsError} />
        </div>
      );
    } else if (lyricsError) {
      render = <div className={styles.lyricsError}>{lyricsError}</div>;
    } else {
      render = (
        <div className={styles.loader}>
          <div>Loading lyrics...</div>
          <Loader />
        </div>
      );
    }
    return (
      <div className={styles.container}>
        {render}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  track: state.songs.status ? state.songs.status.track : null,
  lyrics: state.lyrics.lyrics,
  lyricsError: state.lyrics.error
});

export default connect(mapStateToProps)(LyricsPage);
