// @flow
import React, { PureComponent } from 'react';
import styles from './Lyrics.scss';

export default class Lyrics extends PureComponent {
  props: {
    lyrics: ?string,
    lyricsError: ?string
  };

  render() {
    const { lyrics } = this.props;

    return (
      <div className={styles.container}>{lyrics}</div>
    );
  }
}
