import { hasPath } from '../ramda';
import { isArray, isNumber, isString, isNil } from '.';

const hasLengthProp = (x: unknown): x is Record<'length', unknown> => hasPath(['length'], x);

// eslint-disable-next-line complexity
export const getLength = (value: unknown): number => {
  if (isNumber(value)) {
    return value;
  }
  if (isArray(value) || isString(value)) {
    return value.length;
  }
  if (hasLengthProp(value)) {
    return getLength(value.length);
  }
  if (isNil(value)) {
    return 0;
  }
  return Number.NaN;
};
