/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePageComponent from './containers/HomePage/HomePage';
import LyricsPageComponent from './containers/LyricsPage/LyricsPage';

export default () => (
  <App>
    <Switch>
      <Route path="/lyrics" component={LyricsPageComponent} />
      <Route path="/" component={HomePageComponent} />
    </Switch>
  </App>
);
