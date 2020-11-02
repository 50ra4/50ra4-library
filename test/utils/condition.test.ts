import { always } from '../../src/ramda';
import { allPass, anyPass, cond, match } from '../../src/utils';

const mod = (n: number) => n % 2 === 0;
const odd = (n: number) => n % 2 === 1;
const multiple3 = (n: number) => n % 3 === 0;
const multiple6 = (n: number) => n % 6 === 0;

describe('utils/condition', () => {
  describe('allPass', () => {
    const TEST_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    it('should return true', () => {
      TEST_DATA.filter(multiple6).forEach((n) => {
        expect(allPass([mod, multiple3])(n)).toBeTruthy();
      });
    });
    it('should return false', () => {
      TEST_DATA.filter(multiple6).forEach((n) => {
        expect(allPass([mod, multiple3, odd])(n)).toBeFalsy();
      });
    });
  });

  describe('anyPass', () => {
    const TEST_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    it('should return true', () => {
      TEST_DATA.filter((n) => mod(n) || multiple3(n)).forEach((n) => {
        expect(anyPass([mod, multiple3])(n)).toBeTruthy();
      });
    });
    it('should return false', () => {
      TEST_DATA.filter((n) => !(mod(n) || multiple3(n))).forEach((n) => {
        expect(allPass([mod, multiple3])(n)).toBeFalsy();
      });
    });
  });

  const HttpStatusCode = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
  } as const;
  const equals = (statusCode: keyof typeof HttpStatusCode) => (n: number) => statusCode === n;
  const getMessage = (n: number): string => HttpStatusCode[n] || '';

  describe('cond', () => {
    const TEST_VALUE = [400, 401, 402, 403, 404];
    const testFn = cond([
      [equals(400), getMessage],
      [equals(401), getMessage],
      [equals(403), getMessage],
      [equals(404), getMessage],
    ]);

    it('should return HttpStatusCode message', () => {
      TEST_VALUE.filter((v) => v !== 402).forEach((v) => {
        expect(testFn(v)).toBe(HttpStatusCode[v]);
      });
    });
    it('should return undefined', () => {
      TEST_VALUE.filter((v) => v === 402).forEach((v) => {
        expect(testFn(v)).toBeUndefined();
      });
    });
  });

  describe('match', () => {
    const TEST_VALUE = [400, 401, 402, 403, 404];
    const DEFAULT_MESSAGE = 'Payment Required';
    const testFn = match(always(DEFAULT_MESSAGE), [
      [equals(400), getMessage],
      [equals(401), getMessage],
      [equals(403), getMessage],
      [equals(404), getMessage],
    ]);

    it('should return message', () => {
      TEST_VALUE.filter((v) => v !== 402).forEach((v) => {
        expect(testFn(v)).toBe(HttpStatusCode[v]);
      });
    });
    it('should return default message', () => {
      TEST_VALUE.filter((v) => v === 402).forEach((v) => {
        expect(testFn(v)).toBe(DEFAULT_MESSAGE);
      });
    });
  });
});
