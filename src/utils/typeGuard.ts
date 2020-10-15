import { propEq, toPairs } from '@/ramda';
import { IndexedObject } from '@/types';

/**
 * enumか？
 * @param fromEnum EnumライクなObject
 */
export const isEnum = <T>(fromEnum: IndexedObject<T>) => (x: unknown): x is T => toPairs(fromEnum).some(propEq('1', x));
