// @flow
import React, { Component } from 'react';
import styles from './Home.scss';
import Loader from './../loader/Loader';
import LogoPath from './../../../resources/spotify-logo.jpg';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <img src={LogoPath} alt="logo" />
          <Loader />
        </div>
      </div>
    );
  }
}
