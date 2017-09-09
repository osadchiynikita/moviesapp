import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { loadMovie, rateMovie } from 'redux/modules/movie';
import { Loader } from 'components';
import './Movie.scss';

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState }, params }) => {
    const promises = [];
    const state = getState();
    const { movieId } = params;

    if (!state.movie.loading && state.movie.movieId !== movieId) {
      promises.push(dispatch(loadMovie(movieId)));
    }

    Promise.all(promises);
  }
}])

@connect(
  state => ({
    auth: state.auth,
    movie: state.movie
  }),
  dispatch => bindActionCreators({ rateMovie }, dispatch)
)

export default class Movie extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    movie: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    rateMovie: PropTypes.func.isRequired
  }

  render() {
    const { auth, movie, rateMovie, params: { movieId } } = this.props; // eslint-disable-line no-shadow

    if (movie.loading) {
      return (
        <div className="movie-card movie-card--loading">
          <Loader />
        </div>
      );
    }

    return (
      <div className="movie-card">
        <div className="movie-card__header">
          <div className="movie-poster">
            <img className="movie-poster__img" src={`https://image.tmdb.org/t/p/w150${movie.data.poster_path}`} />
          </div>

          <div className="movie-rating">
            <div className="movie-rating__value">
              {movie.data.vote_average}
            </div>
            <div className="movie-rating__voters-count">
              ({movie.data.vote_count}&nbsp;voters)
            </div>
            <button
              onClick={() => rateMovie(movieId, auth)}
              className="movie-rating__vote-button">
              <span>Like</span>
            </button>
          </div>
        </div>
        <div className="movie-card__body">
          <div className="movie-summary">
            <h2 className="movie-summary__title">
              {movie.data.title}
            </h2>
            <p className="movie-summary__description">
              {movie.data.overview}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
