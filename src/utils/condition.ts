import { SafePred } from '../types';

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

export const match = <A extends ReadonlyArray<unknown>, B>(
  onDefault: (...params: A) => B, //
  fns: CondFns<A, B>[],
) => (...params: A): B => cond(fns)(...params) || onDefault(...params);

export const allPass = <A extends ReadonlyArray<unknown>>(fns: SafePred<A>[]) => (...value: A): boolean =>
  fns.every((fn) => fn(...value));

export const anyPass = <A extends ReadonlyArray<unknown>>(fns: SafePred<A>[]) => (...value: A): boolean =>
  fns.some((fn) => fn(...value));
