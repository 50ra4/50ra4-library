import format from 'date-fns/fp/format';
import { toPairs } from '../ramda';

export const EDateFormat = {
  dateISO: 'yyyy-MM-dd',
  dateJp: 'yyyy年MM月dd日',
  dateTimeISO: 'yyyy-MM-dd HH:mm:ss',
  timestampISO: 'yyyy-MM-dd HH:mm:ss.SSS',
} as const;
type DateFormatKey = keyof typeof EDateFormat;
type DateFormat = typeof EDateFormat[DateFormatKey];

export const formatDate = toPairs(EDateFormat)
  .map((v) => v as [DateFormatKey, DateFormat])
  .reduce(
    (acc, [key, fmt]) => ({ ...acc, [key]: format(fmt) }), //
    {} as Record<DateFormatKey, (dateStr: string) => Date>,
  );
