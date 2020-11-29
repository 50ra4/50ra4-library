import format from 'date-fns/fp/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { EDateFormat, toPairs, formatDate, parseDateStr } from '../../src';

const TEST_DATE = new Date();
const TEST_DATE_STRING_ARRAY = toPairs(EDateFormat).map(([key, fmt]) => ({
  key,
  fmt,
  dateStr: format(fmt, TEST_DATE),
}));

describe('utils/date', () => {
  describe('formatDate', () => {
    it('should return same format', () => {
      toPairs(EDateFormat).forEach(([key, fmt]) => {
        expect(formatDate[key](TEST_DATE)).toBe(format(fmt, TEST_DATE));
      });
    });
  });
  describe('parseDateStr', () => {
    it('should return same Date', () => {
      TEST_DATE_STRING_ARRAY.forEach(({ key, fmt, dateStr }) => {
        const expected = fmt === EDateFormat.ISOString ? parseISO(dateStr) : parse(dateStr, fmt, TEST_DATE);
        expect(parseDateStr[key](dateStr).toISOString()).toBe(expected.toISOString());
      });
    });
  });
});
