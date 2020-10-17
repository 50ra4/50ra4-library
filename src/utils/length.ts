import { allPass, gte, lte } from '../ramda';
import { isArray, isNumber, isString } from '.';

export const toLength = (value: unknown): number => {
  if (isNumber(value)) {
    return value;
  }
  if (isArray(value) || isString(value)) {
    return value.length;
  }
  return NaN;
};

export const isValidLength = (config: { max: number; min?: number }, value: unknown): boolean => {
  const { max, min } = config;
  const length = toLength(value);
  const isLteMax = lte(max);
  if (!min) {
    return isLteMax(length);
  }
  const isGteMin = gte(min);
  return allPass([isLteMax, isGteMin])(length);
};
