// @flow
import React, { Component } from 'react';
import { Track } from './../../models/Track';

export default class Lyrics extends Component {
  props: {
    lyrics: ?string,
    track: Track,
    lyricsError: ?string
  };

  render() {
    const { lyrics, track } = this.props;
    return (
      <div>{lyrics}</div>
    );
  }
}
