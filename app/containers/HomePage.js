// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/home/Home';
import { initializeWebHelper } from './../reducers/songs';

export class HomePage extends Component {
  static propTypes = {
    playing: PropTypes.bool.isRequired,
    initializeWebHelper: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.initializeWebHelper();
  }

  componentWillUpdate(nextProps: any) {
    console.log(nextProps);
    if (nextProps.loaded === true) {
      this.props.push('/lyrics');
    }
  }

  render() {
    return (
      <Home />
    );
  }
}

const mapStateToProps = (state) => ({
  loaded: state.songs.loaded
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ initializeWebHelper, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

