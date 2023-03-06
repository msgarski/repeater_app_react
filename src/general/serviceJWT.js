export const changeTokenInResponse = () => {
  //
};

export const shouldWeUpdateJWT = (response, oldToken) => {
  if (!response || !oldToken) {
    return true;
  } else {
    return !oldToken.localeCompare(
      response.config.headers.Authorization.split(" ")[1]
    );
  }
};
