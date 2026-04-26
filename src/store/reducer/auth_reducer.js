const initialState = {
  authInitialized: false,
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_INIT':
      return {
        ...state,
        authInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken || null,
      };
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        authInitialized: true,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken || null,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        authInitialized: true,
        isAuthenticated: false,
        token: null,
        refreshToken: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
