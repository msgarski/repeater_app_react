import {
  PASSWORD_MIN_MAX_LENGTH,
  SPECIAL_CHAR_REGEX,
  EMAIL_VALIDATION_REGEX,
} from "./constants";

export function checkPasswordLength(str) {
  return (
    str.length >= PASSWORD_MIN_MAX_LENGTH[0] &&
    str.length <= PASSWORD_MIN_MAX_LENGTH[1]
  );
}

export function checkProperStringLength(str, min, max = 200) {
  return str.length >= min && str.length <= max ? 1 : str.length < min ? 0 : -1;
}
export function isStringExists(str) {
  return !!str.length;
}
export function checkStringForSpecialChar(str) {
  return SPECIAL_CHAR_REGEX.test(str);
}
export function isNumberInString(str) {
  return /[0-9]/.test(str);
}
export function identityChecking(str1, str2) {
  if (str1 && str2) {
    return str1.localeCompare(str2) ? false : true;
  }
  return false;
}
export function passwordValidation(password) {
  return true;
}
export const hasEmailProperStructure = (email = "none") => {
  return EMAIL_VALIDATION_REGEX.test(email);
};

// todo czy to potrzebne???
export function emailValidation(emailAddress) {
  return true;
}
