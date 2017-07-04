// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/home/Home';
import { loadCurrentSong } from './../actions/songs';
import { push } from 'react-router-redux';

export class HomePage extends Component {

  componentDidMount() {
    this.props.loadCurrentSong();
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ loadCurrentSong }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

