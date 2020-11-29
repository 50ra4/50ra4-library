import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/fp/format';
import { partial } from '../external';
import { ObjectType } from '../types';
import { toPairs } from './object';

export const EDateFormat = {
  yearMonthJP: 'yyyy年MM月',
  yearMonthISO: 'yyyy/MM',
  monthDayJP: 'MM月dd日',
  monthDayISO: 'MM/dd',
  hourMinuteJP: 'HH時mm分',
  hourMinuteISO: 'HH:mm',
  dateISO: 'yyyy-MM-dd',
  dateJP: 'yyyy年MM月dd日',
  timeISO: 'HH:mm:ss',
  timeJP: 'HH時mm分ss秒',
  dateTimeISO: 'yyyy-MM-dd HH:mm:ss',
  dateTimeJP: 'yyyy年MM月dd日 HH時mm分ss秒',
  timestampISO: 'yyyy-MM-dd HH:mm:ss.SSS',
  ISOString: "yyy-MM-dd'T'HH:mm:ss.sssXXX",
} as const;

type DateFormat = keyof typeof EDateFormat;

export const formatDate = toPairs(EDateFormat).reduce(
  (acc, [key, fmt]) => ({ ...acc, [key]: partial(format, fmt) }),
  {} as ObjectType<DateFormat, (date: Date) => string>,
);

const ReferenceDate = new Date();
export const parseDateStr = toPairs(EDateFormat).reduce(
  (acc, [key, fmt]) => ({
    ...acc,
    [key]: (dateStr: string) =>
      fmt === EDateFormat.ISOString ? parseISO(dateStr) : parse(dateStr, fmt, ReferenceDate),
  }),
  {} as ObjectType<DateFormat, (dateStr: string) => Date>,
);
