import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth.js';
import movies from './movies.js';
import movie from './movie.js';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  movies,
  movie
});
