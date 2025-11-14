export const initAuth = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const setAuthToken = (token) => {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
};

