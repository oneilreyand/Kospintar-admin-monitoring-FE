import httpClient from './httpClient';

const userAuthService = {
  async login({ email, password }) {
    const payload = await httpClient.post('/users/login', {
      body: { email, password },
    });

    return {
      user: payload?.user || null,
      token: payload?.token || null,
      refreshToken: payload?.refreshToken || null,
    };
  },
};

export default userAuthService;
