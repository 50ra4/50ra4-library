import { parseISO } from 'date-fns/fp';
import { ELogLevel, EValueType, formatLogMessage, replaceMessage, toPairs, toString, ValueType } from '../../src/utils';

describe('utils/format', () => {
  describe('formatLogMessage', () => {
    it('should return LogLevel', () => {
      const levels = toPairs(ELogLevel);
      levels.forEach(([, level]) => {
        const logMessage = formatLogMessage(level, 'dummy');
        const tmp = logMessage.split(' ');
        expect(tmp[0]).toBe(`[${level}]`);
      });
    });

    it('should return message', () => {
      const message = 'dummy';
      const logMessage = formatLogMessage(ELogLevel.debug, message);
      const tmp = logMessage.split(' ');
      expect(tmp[3]).toBe(message);
    });
  });
  describe('replaceMessage', () => {
    it('should replace message', () => {
      const param = { 0: '1', 1: 'hoge' };
      const message = '{0} is 1, {1} is hoge';
      expect(replaceMessage(message, param)).toBe(`${param[0]} is ${param[0]}, ${param[1]} is hoge`);
    });
    it('should replace message', () => {
      const param = { max: '1000', min: 500 };
      const message = '{max} > x > {min}';
      expect(replaceMessage(message, param)).toBe(`${param.max} > x > ${param.min}`);
    });
  });

  describe('toString', () => {
    it('should return string', () => {
      const messageFormat = (valueType: ValueType, v: string) => `${valueType} to ${v}`;
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      function dummy(): void {}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const testData: [ValueType, any, string][] = [
        [EValueType.string, 'string', 'string to string'],
        [EValueType.number, 1000, 'number to 1000'],
        [EValueType.boolean, false, 'boolean to false'],
        [EValueType.date, parseISO('2020-11-11'), 'date to 2020-11-10T15:00:00.000Z'],
        [EValueType.array, [100, 1000, 10000], 'array to [100,1000,10000]'],
        [EValueType.symbol, Symbol('symbol'), 'symbol to Symbol(symbol)'],
        [EValueType.bigint, BigInt(1000), 'bigint to 1000'],
        [EValueType.object, { a: 1, b: 'b' }, 'object to {"a":1,"b":"b"}'],
        [EValueType.undefined, undefined, 'undefined to undefined'],
        [EValueType.null, null, 'null to null'],
        [EValueType.regExp, /a/, 'regExp to regExp'],
        [EValueType.function, dummy, 'function to function(dummy)'],
      ];
      testData.forEach(([valueType, value, expected]) => {
        const result = messageFormat(valueType, toString(value));
        expect(result).toBe(expected);
      });
    });
  });
});
