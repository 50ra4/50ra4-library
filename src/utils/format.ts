import { toPairs, toString } from '../ramda';

export const replaceMessage = (template: string, replaceParams: Record<string, unknown>): string =>
  toPairs(replaceParams).reduce((acc, [key, value]) => acc.replace(`{${key}}`, toString(value)), template);
