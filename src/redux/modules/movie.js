const MOVIE_LOAD = 'MOVIE_LOAD';
const MOVIE_LOAD_SUCCESS = 'MOVIE_LOAD_SUCCESS';
const MOVIE_LOAD_FAIL = 'MOVIE_LOAD_FAIL';

const MOVIE_RATE = 'MOVIE_RATE';
const MOVIE_RATE_SUCCESS = 'MOVIE_RATE_SUCCESS';
const MOVIE_RATE_FAIL = 'MOVIE_RATE_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  updating: false,
  updated: false
};

export default function movie(state = initialState, action = {}) {
  switch (action.type) {
    case MOVIE_LOAD:
      return {
        ...state,
        loading: true,
        movieId: action.movieId
      };
    case MOVIE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case MOVIE_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadMovie(movieId) {
  return {
    types: [MOVIE_LOAD, MOVIE_LOAD_SUCCESS, MOVIE_LOAD_FAIL],
    promise: (client) => client.get(`/movie/${movieId}`),
    movieId: movieId
  };
}

export function rateMovie(movieId, auth) {
  const { guest_session_id } = auth.data;

  return {
    types: [MOVIE_RATE, MOVIE_RATE_SUCCESS, MOVIE_RATE_FAIL],
    promise: (client) => client.post(`/movie/${movieId}/rating`, {
      data: {
        value: 10
      },
      query: {
        guest_session_id: guest_session_id
      }
    }),
    movieId: movieId
  };
}
