export const SET_VERSION = "SET_VERSION";

export const setVersion = (version) => {
  return {
    type: SET_VERSION,
    version: version,
  };
};
