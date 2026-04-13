const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002').replace(/\/+$/, '');

const buildUrl = (path, query) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
};

const request = async (method, path, options = {}) => {
  const { token, query, body, headers = {} } = options;
  const url = buildUrl(path, query);
  const requestHeaders = {
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    requestHeaders['Content-Type'] = requestHeaders['Content-Type'] || 'application/json';
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message = (payload && payload.error) || (payload && payload.message) || `Request gagal (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

const httpClient = {
  get(path, options) {
    return request('GET', path, options);
  },
  post(path, options) {
    return request('POST', path, options);
  },
  put(path, options) {
    return request('PUT', path, options);
  },
  delete(path, options) {
    return request('DELETE', path, options);
  },
};

export default httpClient;
