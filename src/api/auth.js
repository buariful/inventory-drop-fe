import api, { saveTokens } from "./axios";

export const loginUser = async (username, password) => {
  const res = await api.post("/auth/login", { username, password });
  saveTokens(res.data.accessToken, res.data.refreshToken);
  return res.data; // contains user
};

export const signupUser = async (username, password) => {
  await api.post("/auth/register", { username, password });
};
