export const verifyURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
