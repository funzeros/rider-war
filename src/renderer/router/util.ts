export const isMeta = (auth = false, params?: GObj) => {
  return {
    auth,
    ...params,
  };
};
