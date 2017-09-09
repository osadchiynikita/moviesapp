const MOVIES_LOAD = 'MOVIES_LOAD';
const MOVIES_LOAD_SUCCESS = 'MOVIES_LOAD_SUCCESS';
const MOVIES_LOAD_FAIL = 'MOVIES_LOAD_FAIL';

const MOVIES_UPDATE = 'MOVIES_UPDATE';
const MOVIES_UPDATE_SUCCESS = 'MOVIES_UPDATE_SUCCESS';
const MOVIES_UPDATE_FAIL = 'MOVIES_UPDATE_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  updating: false,
  updated: false
};

export default function movies(state = initialState, action = {}) {
  switch (action.type) {
    case MOVIES_LOAD:
      return {
        ...state,
        loading: true
      };
    case MOVIES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case MOVIES_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };

    case MOVIES_UPDATE:
      return {
        ...state,
        updating: true
      };
    case MOVIES_UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: {
          ...state.data,
          page: action.query.page,
          results: [...state.data.results, ...action.result.results],
        },
        error: null
      };
    case MOVIES_UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        updated: false,
        data: state.data,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadMovies() {
  return {
    types: [MOVIES_UPDATE, MOVIES_LOAD_SUCCESS, MOVIES_LOAD_FAIL],
    promise: (client) => client.get('/movie/top_rated')
  };
}

export function updateMovies(query) {
  return {
    types: [MOVIES_UPDATE, MOVIES_UPDATE_SUCCESS, MOVIES_UPDATE_FAIL],
    promise: (client) => client.get('/movie/top_rated', {
      query: query
    }),
    query: query
  };
}
