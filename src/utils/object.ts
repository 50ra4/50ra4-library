import { ObjectType } from '../types';

export const toPairs = <T extends ObjectType, K extends keyof T = keyof T>(obj: T): ReadonlyArray<[K, T[K]]> => {
  return Object.entries(obj) as [K, T[K]][];
};

export const keys = <V extends ObjectType>(obj: V): ReadonlyArray<keyof V> => {
  return Object.keys(obj) as (keyof V)[];
};

export const values = <T extends ObjectType, K extends keyof T>(obj: T): ReadonlyArray<T[K]> => {
  return Object.values(obj) as T[K][];
};

export const pick = <T extends ObjectType, K extends keyof T>(keys: K[], obj: T): Readonly<Pick<T, K>> => {
  return Object.fromEntries(toPairs<T, K>(obj).filter(([key]) => keys.includes(key))) as Pick<T, K>;
};

export const omit = <T extends ObjectType, K extends keyof T>(keys: K[], obj: T): Readonly<Omit<T, K>> => {
  return (Object.fromEntries(toPairs<T, K>(obj).filter(([key]) => !keys.includes(key))) as unknown) as Omit<T, K>;
};

export const prop = <T extends ObjectType, K extends keyof T>(key: K, obj: T): Readonly<T[K]> => obj[key];
