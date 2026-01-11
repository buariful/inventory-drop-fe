import api, { saveTokens } from "./axios";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  saveTokens(res.data.data.accessToken, res.data.data.refreshToken);
  return res.data.data; // contains user
};

export const signupUser = async ({ username, email, password }) => {
  await api.post("/auth/signup", { username, email, password });
};
