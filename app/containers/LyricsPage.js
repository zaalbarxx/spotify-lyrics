// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lyrics from '../components/lyrics/Lyrics';
import Loader from './../components/loader/Loader';

import { Track } from './../models/Track';

export class LyricsPage extends Component {
  props: {
    lyrics: ?string,
    track: ?Track
  }

  render() {
    const { lyrics, track, lyricsError } = this.props;
    let render = null;
    if (track && lyrics) {
      render = <Lyrics lyrics={lyrics} track={track} lyricsError={lyricsError} />;
    } else {
      render = <Loader />;
    }
    return (
      render
    );
  }
}

const mapStateToProps = (state) => ({
  track: state.songs.status ? state.songs.status.track : null,
  lyrics: state.lyrics.lyrics,
  lyricsError: state.lyrics.error
});

export default connect(mapStateToProps)(LyricsPage);
