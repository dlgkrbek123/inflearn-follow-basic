import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const AUTH_USER = "AUTH_USER";

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = (dataToSubmit) => {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const auth = () => {
  const request = axios.get("/api/users/auth").then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};
