import { flow } from 'fp-ts/function';
import { prop } from '@/ramda';
import { ObjectType } from '@/types';

export type TLookup = {
  id: string;
  value: string;
};

/**
 * ObjectのPropertyからLookupItem[]を作る
 * @param idKey id
 * @param valueKey value
 */
export const object2Lookups = <T extends ObjectType>(idKey: keyof T, valueKey: keyof T) => (objArr: T[]): TLookup[] =>
  objArr.map((obj) => ({ id: String(prop(idKey, obj)), value: String(prop(valueKey, obj)) }));

/**
 * Lookup[]から{id: value}のObjectを作る
 * @param lookupItems
 */
export const toLookupObject = (lookupItems: TLookup[]): { [id: string]: string } =>
  lookupItems.reduce((pre, { id, value }) => ({ ...pre, [id]: value }), {});

/**
 * object2Lookups => toLookupObject
 * @param idKey id
 * @param valueKey value
 */
export const object2LookupObject = <T extends ObjectType>(idKey: keyof T, valueKey: keyof T) =>
  flow(object2Lookups(idKey, valueKey), toLookupObject);
