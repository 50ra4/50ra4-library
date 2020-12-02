import { createIdWithPrefix } from '../../src';

describe('utils/format', () => {
  describe('createIdWithPrefix', () => {
    const prefix = 'TEST';
    it('should return same prefix string', () => {
      const actual = createIdWithPrefix(prefix);
      const actualPrefix = actual.substr(0, prefix.length);
      expect(actualPrefix).toBe(prefix);
    });
    it('should return specific size string', () => {
      const size = 15;
      const actual = createIdWithPrefix(prefix, size);
      expect(actual.length).toBe(size);
    });
  });
});
