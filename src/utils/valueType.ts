import { stringArray2EnumLikeObject } from './enum';

export const EValueType = stringArray2EnumLikeObject([
  'string',
  'number',
  'boolean',
  'symbol',
  'bigint',
  'function',
  'undefined',
  'object',
  'array',
  'date',
  'null',
  'regExp',
  'unknown',
]);
export type ValueType = typeof EValueType[keyof typeof EValueType];

// eslint-disable-next-line @typescript-eslint/ban-types, complexity
const getObjectType = (value: object | null): ValueType => {
  if (value === null) {
    return EValueType.null;
  }
  if (Array.isArray(value)) {
    return EValueType.array;
  }
  if (value instanceof Date) {
    return EValueType.date;
  }
  if (value instanceof RegExp) {
    return EValueType.regExp;
  }
  return EValueType.object;
};

// eslint-disable-next-line complexity
export const typeOf = (value: unknown): ValueType => {
  switch (typeof value) {
    case 'string':
      return EValueType.string;
    case 'number':
      return EValueType.number;
    case 'boolean':
      return EValueType.boolean;
    case 'function':
      return EValueType.function;
    case 'undefined':
      return EValueType.undefined;
    case 'symbol':
      return EValueType.symbol;
    case 'bigint':
      return EValueType.bigint;
    case 'object':
      return getObjectType(value);
    default:
      return EValueType.unknown;
  }
};
