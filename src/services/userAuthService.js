import httpClient from './httpClient';

const userAuthService = {
  async login({ email, password }) {
    const payload = await httpClient.post('/users/login', {
      body: { email, password },
    });

    return {
      requiresTwoFactor: payload?.requiresTwoFactor === true,
      twoFactorToken: payload?.twoFactorToken || null,
      user: payload?.user || null,
      token: payload?.token || null,
      refreshToken: payload?.refreshToken || null,
    };
  },

  async getCurrentUser(token) {
    return httpClient.get('/users/me', { token });
  },
};

export default userAuthService;
