// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/home/Home';
import { initializeWebHelper } from './../reducers/songs';
import { push } from 'react-router-redux';

export class HomePage extends Component {

  componentDidMount() {
    this.props.initializeWebHelper();
  }

  render() {
    return (
      <Home />
    );
  }
}

const mapStateToProps = (state) => ({
  currentSong: state
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ initializeWebHelper }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

