// @flow
import React from 'react';
import styles from './Loader.scss';

export default function () {
  return (
    <div className={styles.container}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
      <div/>
    </div>
  );
}

