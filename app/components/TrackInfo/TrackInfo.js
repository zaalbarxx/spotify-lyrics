// @flow
import React, { PureComponent } from 'react';
import styles from './TrackInfo.scss';
import { Track } from '../../types/Track';

export default class TrackInfo extends PureComponent {
  props: {
    track: Track
  };

  render() {
    const { track } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.trackName}>
          {track.name}
        </div>
        <div className={styles.artistName}>
          {track.artist.name}
        </div>
      </div>
    );
  }
}
