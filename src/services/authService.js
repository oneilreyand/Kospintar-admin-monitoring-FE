const TOKEN_KEY = 'kospintar-admin-monitoring-token';
const USER_KEY = 'kospintar-admin-monitoring-user';

const authService = {
  getSession() {
    const token = localStorage.getItem(TOKEN_KEY);
    const rawUser = localStorage.getItem(USER_KEY);
    return {
      token,
      user: rawUser ? JSON.parse(rawUser) : null,
    };
  },

  saveSession({ token, user }) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export default authService;
