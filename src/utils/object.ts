import { ObjectType, ObjectKeyType } from '../types';

export const toPairs = <V extends ObjectType>(obj: V): ReadonlyArray<[keyof V, V[keyof V]]> => {
  return Object.entries(obj) as [keyof V, V[keyof V]][];
};

export const keys = <V extends ObjectType>(obj: V): ReadonlyArray<keyof V> => {
  return Object.keys(obj) as (keyof V)[];
};

export const values = <V extends ObjectType>(obj: V): ReadonlyArray<V[keyof V]> => {
  return Object.values(obj) as V[keyof V][];
};

export const pick = <K extends ObjectKeyType, T extends ObjectType<K>>(keys: K[], obj: T): Readonly<Pick<T, K>> => {
  return Object.fromEntries(toPairs<T>(obj).filter(([key]) => keys.includes(key as K))) as Pick<T, K>;
};

export const omit = <K extends ObjectKeyType, T extends ObjectType<K>>(keys: K[], obj: T): Readonly<Omit<T, K>> => {
  return (Object.fromEntries(toPairs<T>(obj).filter(([key]) => !keys.includes(key as K))) as unknown) as Omit<T, K>;
};

export const prop = <K extends ObjectKeyType, T extends ObjectType<K>>(key: K, obj: T): Readonly<T[K]> => obj[key];
