import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import './MoviesList.scss';

const MoviesList = ({ movies, loadMore }) => {
  return (
    <div className="movies-list">
      <div className="movies-list__body">
        {movies.results && Array.isArray(movies.results) && movies.results.map(movie => {
          return (
            <Link className="movies-list__item" to={`/movie/${movie.id}`} key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`} />
              <div className="movies-list__item-content">
                <span>{movie.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="movies-list__footer">
        <button
          type="button"
          onClick={() => loadMore({ page: movies.page + 1 })}
          className="movies-list__load-button">
          Load More
        </button>
      </div>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.object.isRequired,
  loadMore: PropTypes.func.isRequired
};

export default MoviesList;
