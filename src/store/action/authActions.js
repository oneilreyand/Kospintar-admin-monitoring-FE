import authService from '../../services/authService';

export const initAuth = () => (dispatch) => {
  const session = authService.getSession();

  if (session.token && session.user) {
    dispatch({
      type: 'AUTH_INIT',
      payload: {
        isAuthenticated: true,
        user: session.user,
        token: session.token,
      },
    });
    return;
  }

  dispatch({
    type: 'AUTH_INIT',
    payload: {
      isAuthenticated: false,
      user: null,
      token: null,
    },
  });
};

export const loginSuccess = ({ user, token }) => (dispatch) => {
  authService.saveSession({ user, token });
  dispatch({
    type: 'AUTH_LOGIN_SUCCESS',
    payload: { user, token },
  });
};

export const logout = () => (dispatch) => {
  authService.clearSession();
  dispatch({ type: 'AUTH_LOGOUT' });
};
