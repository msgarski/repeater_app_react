export function emailValidation(emailAddress) {
  return true;
}

export function passwordValidation(password) {
  return true;
}
export function identityChecking(str1, str2) {
  return str1.localeCompare(str2) ? false : true;
}
export const validateEmail = (email) => {
  return String(email).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
