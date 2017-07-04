/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LyricsPage from './containers/LyricsPage';

export default () => (
  <App>
    <Switch>
      <Route path="/lyrics" component={LyricsPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
