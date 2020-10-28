import { isArray, isNumber, isString, isNil } from '.';

// eslint-disable-next-line complexity
export const toLength = (value: unknown): number => {
  if (isNumber(value)) {
    return value;
  }
  if (isArray(value) || isString(value)) {
    return value.length;
  }
  if (isNil(value)) {
    return 0;
  }
  return Number.NaN;
};
