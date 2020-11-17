import { SafePred } from '../types';
import { isNonNullable } from './typeGuard';

type CondFns<A extends ReadonlyArray<unknown>, B> = [SafePred<A>, (...a: A) => B];

export const cond = <A extends ReadonlyArray<unknown>, B>(fns: CondFns<A, B>[]) => (...params: A): B | undefined => {
  const matched = fns.find(([pred]) => pred(...params));
  if (!matched) {
    return undefined;
  }
  const [, transform] = matched;
  return transform(...params);
};

export const condAll = <A extends ReadonlyArray<unknown>, B>(fns: CondFns<A, B>[]) => (...params: A): B[] =>
  fns.filter(([pred]) => pred(...params)).map(([, transform]) => transform(...params));

export const match = <A extends ReadonlyArray<unknown>, B, C>(
  onDefault: (...params: A) => C, //
  fns: CondFns<A, B>[],
) => (...params: A): B | C => cond(fns)(...params) || onDefault(...params);

export const allPass = <A extends ReadonlyArray<unknown>>(fns: SafePred<A>[]) => (...value: A): boolean =>
  fns.every((fn) => fn(...value));

export const anyPass = <A extends ReadonlyArray<unknown>>(fns: SafePred<A>[]) => (...value: A): boolean =>
  fns.some((fn) => fn(...value));

export const and = <A extends ReadonlyArray<boolean>>(...args: A): boolean => args.every((v) => !!v);
export const or = <A extends ReadonlyArray<boolean>>(...args: A): boolean => args.some((v) => !!v);

export const ifElse = <A extends ReadonlyArray<unknown>, B, C>(
  fn: SafePred<A>,
  onTrue: (...a: A) => B,
  onFalse: (...a: A) => C,
): ((...a: A) => B | C) => {
  return (...args: A) => {
    if (fn(...args)) {
      return onTrue(...args);
    } else {
      return onFalse(...args);
    }
  };
};

const __getOrElse = <A, B>(onNil: () => A, value?: B): A | NonNullable<B> => {
  if (isNonNullable(value)) {
    return value;
  }
  return onNil();
};

export function getOrElse<A, B>(onNil: () => A, value: B): A | NonNullable<B>;
export function getOrElse<A>(onNil: () => A): <B>(value: B) => A | NonNullable<B>;
export function getOrElse<A, B>(onNil: () => A, value?: B) {
  if (arguments.length === 1) {
    return (v?: B) => __getOrElse(onNil, v);
  }
  return __getOrElse(onNil, value);
}
