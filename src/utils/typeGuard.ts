/* eslint-disable @typescript-eslint/ban-types */
import { propEq, equals } from '../external/ramda';
import { IndexedObject } from '../types';
import { EValueType, typeOf, ValueType, anyPass, toPairs } from '.';
import { flow } from 'fp-ts/lib/function';

/**
 * enumか？
 * @param fromEnum EnumライクなObject
 */
export const isEnum = <T>(fromEnum: IndexedObject<T>) => (x: unknown): x is T => toPairs(fromEnum).some(propEq('1', x));

const valueTypeEq = (x: unknown, valueType: ValueType) => flow(typeOf, equals(valueType))(x);
export const isString = (x: unknown): x is string => valueTypeEq(x, EValueType.string);
export const isNumber = (x: unknown): x is number => valueTypeEq(x, EValueType.number);
export const isSymbol = (x: unknown): x is symbol => valueTypeEq(x, EValueType.symbol);
export const isBigint = (x: unknown): x is symbol => valueTypeEq(x, EValueType.bigint);
export const isBoolean = (x: unknown): x is boolean => valueTypeEq(x, EValueType.boolean);
export const isFunction = (x: unknown): x is Function => valueTypeEq(x, EValueType.function);
export const isDate = (x: unknown): x is Date => valueTypeEq(x, EValueType.date);
export const isObject = (x: unknown): x is object => valueTypeEq(x, EValueType.object);
export const isArray = <T = unknown>(x: unknown): x is T[] => valueTypeEq(x, EValueType.array);
export const isRegExp = (x: unknown): x is RegExp => valueTypeEq(x, EValueType.regExp);
export const isNull = (x: unknown): x is null => valueTypeEq(x, EValueType.null);
export const isUndefined = (x: unknown): x is undefined => valueTypeEq(x, EValueType.undefined);
export const isNil = (x: unknown): x is undefined | null => anyPass([isNull, isUndefined])(x);
export const isNonNullable = <T = unknown>(x: T): x is NonNullable<T> => !isNil(x);

export const isEmptyString = (x: unknown): x is '' => isString(x) && equals(x, '');
export const isEmptyObject = (x: unknown): x is {} => isObject(x) && equals(x, {});
export const isEmptyArray = <T = unknown>(x: unknown): x is T[] => isArray(x) && equals(x, []);
export const isEmpty = <T = unknown>(x: unknown): x is undefined | null | '' | {} | T[] => {
  return anyPass([isNil, isEmptyString, isEmptyObject, isEmptyArray])(x);
};
