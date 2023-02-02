export const API_URL = "http://localhost:8080";

export const INITIAL_CREDENTIALS_STATE = {
  email: "",
  password: "",
  expiresIn: null, // todo is this needed?
};

export const INITIAL_EMAIL_CONFIRMATION_STATE = {
  email1: "",
  email2: "",
  finished: false,
  identity: false,
  correctness: false,
};
