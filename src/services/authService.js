const TOKEN_KEY = 'kospintar-admin-monitoring-token';
const USER_KEY = 'kospintar-admin-monitoring-user';
const REFRESH_TOKEN_KEY = 'kospintar-admin-monitoring-refresh-token';

const authService = {
  getSession() {
    const token = localStorage.getItem(TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const rawUser = localStorage.getItem(USER_KEY);
    return {
      token,
      refreshToken,
      user: rawUser ? JSON.parse(rawUser) : null,
    };
  },

  saveSession({ token, refreshToken, user }) {
    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export default authService;
