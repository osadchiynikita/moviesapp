import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import { loadMovies, updateMovies } from 'redux/modules/movies';
import { createGuestSession } from 'redux/modules/auth';
import { MoviesList, Loader } from 'components';
import './App.scss';

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    const state = getState();

    if (!state.movies.loading && !state.movies.loaded) {
      promises.push(dispatch(loadMovies()));
    }

    // TODO: store session and check if it exists
    if (!state.auth.loading && !state.auth.loaded) {
      promises.push(dispatch(createGuestSession()));
    }

    Promise.all(promises);
  }
}])

@connect(
  state => ({
    auth: state.auth,
    movies: state.movies
  }),
  dispatch => bindActionCreators({ updateMovies }, dispatch)
)

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    auth: PropTypes.object.isRequired,
    movies: PropTypes.object.isRequired,
    updateMovies: PropTypes.func.isRequired
  }

  render() {
    const { movies, updateMovies, children } = this.props; // eslint-disable-line no-shadow

    if (movies.loading || !movies.loaded) {
      return (
        <div className="app-container">
          <Loader />
        </div>
      );
    }

    return (
      <div className="app-container">
        <div className="content">
          <aside className="sidebar">
            <MoviesList
              movies={movies.data}
              loadMore={updateMovies}
            />
          </aside>

          {children ? (
            <main className="main">
              {children}
            </main>
          ) : (
            <main className="main">
              <div className="main__empty">
                Please, select movie from the list
              </div>
            </main>
          )}
        </div>

        {children && (
          <div className="mobile-details">
            <div className="mobile-details__header">
              <Link className="mobile-details__back-link" to="/">
                Back
              </Link>
            </div>
            <div className="mobile-details__content">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }
}
