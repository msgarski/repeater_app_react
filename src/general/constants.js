export const API_URL = "http://localhost:8080";

export const INITIAL_CREDENTIALS_STATE = {
  email: "",
  password: "",
  expiresIn: null, // ? is this needed?
};
export const INITIAL_USER_SIGNUP_STATE = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

// todo final version for implementing in every places
export const INITIAL_PASSWORD_VALIDATION_STATE = {
  properLength: false,
  specCharExists: false,
  numberExists: false,
  identity: false,
};

export const INITIAL_EMAIL_VALIDATION_STATE = {
  nonOmittedFirst: true,
  nonOmittedSecond: true,
  properStructure: true,
  identity: true,
};

export const INITIAL_PAIR_PASSWORD_STATE = {
  password: "",
  password_confirmation: "",
};

export const INITIAL_PAIR_EMAIL_STATE = {
  email: "",
  email_confirmation: "",
};

export const INITIAL_USER_NAME_STATE = {
  valid: false,
  omitted: false,
};

export const INITIAL_USER_NAME_VALIDATION_STATE = {
  nonOmitted: true,
  properLength: false,
};

export const MINIMUM_USER_NAME_LENGTH = 3;

export const PASSWORD_MIN_MAX_LENGTH = [5, 15];
// export const ASCII_REGEX = /^[\x00-\x7F]*$/;

export const SPECIAL_CHAR_REGEX = /[!@#$%^&*)\\(+=.<>{}[\]:;'"|~`_-]/;

export const SPECIAL_CHARS_ALLOWED_IN_PASSWORD =
  "~`!@#$%^&*()_-+={[}]|\\:;\",'<,>.?/";

export const EMAIL_VALIDATION_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const INITIAL_USER_OPTIONS_PACK = {
  userId: "",
  learningBatchLimit: 10,
  learningDayLimit: 20,
  repeatDayLimit: 30,
  fastRepeatBatch: 10,
  overlearning: true,
};
