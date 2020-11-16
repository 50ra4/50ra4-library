import { LogLevel } from '.';
import format from 'date-fns/format';
import { toPairs } from '../ramda';
import { EDateFormat } from './date';
import {
  isArray,
  isBigint,
  isBoolean,
  isDate,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isSymbol,
  isUndefined,
} from './typeGuard';

// eslint-disable-next-line complexity
export const toString = <T = unknown>(value: T): string => {
  if (isString(value) || isNumber(value) || isSymbol(value) || isBigint(value)) {
    return value.toString();
  }
  if (isArray(value)) {
    return `[${value.map(toString)}]`;
  }
  if (isDate(value)) {
    return value.toISOString();
  }
  if (isObject(value)) {
    return JSON.stringify(value);
  }
  if (isBoolean(value)) {
    return value ? 'true' : 'false';
  }
  if (isUndefined(value)) {
    return 'undefined';
  }
  if (isNull(value)) {
    return 'null';
  }
  if (isRegExp(value)) {
    return 'regExp';
  }
  if (isFunction(value)) {
    return `function(${value.name})`;
  }
  return 'unknown';
};

export const replaceMessage = (template: string, replaceParams: Record<string | number, unknown>): string =>
  toPairs(replaceParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, typeof value === 'string' ? value : toString(value)),
    template,
  );

const getTimeStamp = () => format(new Date(), EDateFormat.timestampISO);

export const formatLogMessage = (logLevel: LogLevel, message: string): string =>
  `[${logLevel}] ${getTimeStamp()}: ${message}`;
