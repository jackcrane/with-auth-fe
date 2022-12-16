import { getDifferentKeys } from "./getDifferentKeys";

export const getObjectWithModifiedKeys = (newObj, oldObj) => {
  const modifiedKeys = getDifferentKeys(newObj, oldObj);
  let modifiedObj = {};
  modifiedKeys.forEach((key) => {
    modifiedObj[key] = newObj[key];
  });
  return modifiedObj;
};
