import { LogLevel } from '.';
import { format } from 'date-fns/fp';
import { toPairs, toString } from '../ramda';
import { EDateFormat } from './date';

export const replaceMessage = (template: string, replaceParams: Record<string | number, unknown>): string =>
  toPairs(replaceParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, typeof value === 'string' ? value : toString(value)),
    template,
  );

const getTimeStamp = () => format(EDateFormat.timestampISO, new Date());

export const formatLogMessage = (logLevel: LogLevel, message: string): string =>
  `[${logLevel}] ${getTimeStamp()}: ${message}`;
