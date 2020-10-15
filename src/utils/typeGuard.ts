/* eslint-disable @typescript-eslint/ban-types */
import { flow } from 'fp-ts/lib/function';
import { propEq, toPairs, anyPass, equals } from '@/ramda';
import { IndexedObject } from '@/types';
import { EValueType, getValueType, ValueType } from '.';

/**
 * enumか？
 * @param fromEnum EnumライクなObject
 */
export const isEnum = <T>(fromEnum: IndexedObject<T>) => (x: unknown): x is T => toPairs(fromEnum).some(propEq('1', x));
/**
 * value type is null or undefined
 */
export const isNil = (x: unknown): x is undefined | null => getValueType(x) === EValueType.undefined || getValueType(x) === EValueType.null;
/**
 * value type is not null or undefined
 */
export const isNonNullable = <T = unknown>(x: T): x is NonNullable<T> => !isNil(x);
/**
 * value type is string and ''
 */
export const isEmptyString = (x: unknown): x is '' => getValueType(x) === EValueType.string && equals(x, '');
/**
 * value type is object and {}
 */
export const isEmptyObject = (x: unknown): x is {} => getValueType(x) === EValueType.object && equals(x, {});
/**
 * value type is array and []
 */
export const isEmptyArray = <T = unknown>(x: unknown): x is T[] =>
  getValueType(x) === EValueType.array && equals(x, []);
/**
 * value is undefinded or null or {} or []
 */
export const isEmpty = <T = unknown>(x: unknown): x is undefined | null | '' | {} | T[] => {
  return anyPass([isNil, isEmptyString, isEmptyObject, isEmptyArray])(x);
};
