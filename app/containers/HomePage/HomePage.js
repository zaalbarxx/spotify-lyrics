// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import styles from './HomePage.scss';
import Loader from '../../components/Loader/Loader';
import { initializeWebHelper } from '../../reducers/songs';
import LogoPath from '../../../resources/spotify-logo.jpg';

export class HomePage extends Component {
  props: {
    loaded: boolean,
    initializeWebHelper: Function,
    push: Function
  };

  componentDidMount() {
    this.props.initializeWebHelper();
  }

  componentWillUpdate(nextProps: any) {
    if (nextProps.loaded === true) {
      this.props.push('/lyrics');
    }
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <img src={LogoPath} alt="logo" />
        <Loader />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loaded: state.songs.loaded
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ initializeWebHelper, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

