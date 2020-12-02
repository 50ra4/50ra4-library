import { nanoid } from '../external';
import { getLength } from './length';

type NanoIdParameter = Parameters<typeof nanoid>;
export const createId = (...args: NanoIdParameter) => nanoid(...args);
export const createIdWithPrefix = (prefix: string, ...args: NanoIdParameter) => {
  const prefixLength = getLength(prefix);
  const [size = 21] = args;
  return `${prefix}${createId(size - prefixLength)}`;
};
