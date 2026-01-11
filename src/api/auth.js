import api, { saveTokens } from "./axios";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  saveTokens(res.data.data.accessToken, res.data.data.refreshToken);
  return res.data.data; // contains user
};

export const signupUser = async ({ username, email, password }) => {
  const res = await api.post("/auth/signup", { username, email, password });
  saveTokens(res.data.data.accessToken, res.data.data.refreshToken);
  return res.data.data;
};
export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      await api.post("/auth/logout", { refreshToken });
    } catch (err) {
      console.error("Logout error:", err);
    }
  }
  localStorage.clear();
};
