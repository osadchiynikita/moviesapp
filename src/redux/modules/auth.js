const GUEST_SESSION_CREATE = 'GUEST_SESSION_CREATE';
const GUEST_SESSION_CREATE_SUCCESS = 'GUEST_SESSION_CREATE_SUCCESS';
const GUEST_SESSION_CREATE_FAIL = 'GUEST_SESSION_CREATE_FAIL';

const initialState = {
  loading: false,
  loaded: false
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case GUEST_SESSION_CREATE:
      return {
        ...state,
        loading: true
      };
    case GUEST_SESSION_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case GUEST_SESSION_CREATE_FAIL:
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

export function createGuestSession() {
  return {
    types: [GUEST_SESSION_CREATE, GUEST_SESSION_CREATE_SUCCESS, GUEST_SESSION_CREATE_FAIL],
    promise: (client) => client.get('/authentication/guest_session/new')
  };
}
