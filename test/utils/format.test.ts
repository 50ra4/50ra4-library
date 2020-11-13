import { toPairs } from '../../src/ramda';
import { ELogLevel, formatLogMessage, replaceMessage } from '../../src/utils';

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
});
