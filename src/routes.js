import React from 'react';
import { Route } from 'react-router';
import { App, Movie } from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      <Route path="/movies/:movieId" component={Movie} />
    </Route>
  );
};
