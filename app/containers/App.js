// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

export class App extends Component {
  props: {
    children: Children,
    push: () => mixed
  };


  componentWillMount() {
    this.props.push('/');
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ push }, dispatch);

export default connect(null, mapDispatchToProps)(App);
