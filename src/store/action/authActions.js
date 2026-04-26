import authService from '../../services/authService';
import userAuthService from '../../services/userAuthService';

export const initAuth = () => async (dispatch) => {
  const session = authService.getSession();

  if (session.token && session.user) {
    try {
      const currentUser = await userAuthService.getCurrentUser(session.token);
      const role = String(currentUser?.role || '').toLowerCase();
      if (role !== 'admin') {
        authService.clearSession();
        throw new Error('Akses monitoring hanya untuk admin.');
      }

      authService.saveSession({
        user: currentUser,
        token: session.token,
        refreshToken: session.refreshToken,
      });

      dispatch({
        type: 'AUTH_INIT',
        payload: {
          isAuthenticated: true,
          user: currentUser,
          token: session.token,
          refreshToken: session.refreshToken,
        },
      });
      return;
    } catch (_error) {
      authService.clearSession();
    }
  }

  dispatch({
    type: 'AUTH_INIT',
    payload: {
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
    },
  });
};

export const loginSuccess = ({ user, token, refreshToken }) => (dispatch) => {
  authService.saveSession({ user, token, refreshToken });
  dispatch({
    type: 'AUTH_LOGIN_SUCCESS',
    payload: { user, token, refreshToken },
  });
};

export const logout = () => (dispatch) => {
  authService.clearSession();
  dispatch({ type: 'AUTH_LOGOUT' });
};
