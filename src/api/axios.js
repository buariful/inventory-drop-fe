import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// helpers
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const saveTokens = (access, refresh) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

// axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// attach access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  queue = [];
};

// handle expired token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = "Bearer " + token;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        const res = await axios.post(`${API_BASE}/auth/refresh`, {
          refreshToken,
        });

        saveTokens(res.data.accessToken, res.data.refreshToken);
        api.defaults.headers.Authorization = "Bearer " + res.data.accessToken;

        processQueue(null, res.data.accessToken);
        return api(original);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { saveTokens };
