import {
  PASSWORD_MIN_MAX_LENGTH,
  SPECIAL_CHAR_REGEX,
  EMAIL_VALIDATION_REGEX,
} from "./constants";

export function emailValidation(emailAddress) {
  return true;
}
export function checkLengthString(str) {
  return str.length >= PASSWORD_MIN_MAX_LENGTH[0] &&
    str.length >= PASSWORD_MIN_MAX_LENGTH[1]
    ? true
    : false;
}
export function checkStringForSpecialChar(str) {
  return SPECIAL_CHAR_REGEX.test(str);
}
export function passwordValidation(password) {
  return true;
}
export function identityChecking(str1, str2) {
  return str1.localeCompare(str2) ? false : true;
}
export const validateEmail = (email) => {
  return String(email).match(EMAIL_VALIDATION_REGEX);
};
