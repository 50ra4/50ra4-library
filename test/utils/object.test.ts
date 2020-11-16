import { keys, omit, pick, prop, toPairs, values } from '../../src';

type Test = {
  a: number;
  b: string;
  c: boolean;
  d: number[];
  e: {
    a: number;
    b: string;
    c: boolean;
  };
};

const TEST_DATA: Test = {
  a: 1,
  b: 'v',
  c: false,
  d: [1, 2, 3],
  e: {
    a: 1,
    b: '',
    c: true,
  },
};

describe('utils/object', () => {
  describe('prop', () => {
    it('should return property value', () => {
      expect(prop('a', TEST_DATA)).toBe(TEST_DATA.a);
      expect(prop('b', TEST_DATA)).toBe(TEST_DATA.b);
      expect(prop('c', TEST_DATA)).toBe(TEST_DATA.c);
      expect(prop('d', TEST_DATA)).toBe(TEST_DATA.d);
      expect(prop('e', TEST_DATA)).toBe(TEST_DATA.e);
    });
  });
  describe('toPairs', () => {
    it('should return key & value pairs', () => {
      const expects = [
        ['a', TEST_DATA.a],
        ['b', TEST_DATA.b],
        ['c', TEST_DATA.c],
        ['d', TEST_DATA.d],
        ['e', TEST_DATA.e],
      ];
      const results = toPairs(TEST_DATA);
      results.forEach((result, i) => {
        expect(result).toEqual(expects[i]);
      });
    });
  });
  describe('keys', () => {
    it('should return key array', () => {
      const expects = ['a', 'b', 'c', 'd', 'e'];
      const results = keys(TEST_DATA);
      results.forEach((result, i) => {
        expect(result).toBe(expects[i]);
      });
    });
  });
  describe('values', () => {
    it('should return value array', () => {
      const expects = [TEST_DATA.a, TEST_DATA.b, TEST_DATA.c, TEST_DATA.d, TEST_DATA.e];
      const results = values(TEST_DATA);
      results.forEach((result, i) => {
        expect(result).toEqual(expects[i]);
      });
    });
  });
  describe('pick', () => {
    const pickedKeys: (keyof Test)[] = ['b', 'c', 'e'];
    it('should return the Object of the selected property', () => {
      expect(pick(pickedKeys, TEST_DATA)).toEqual({
        b: 'v',
        c: false,
        e: {
          a: 1,
          b: '',
          c: true,
        },
      });
    });
    it('should not return the Object of the un-selected property', () => {
      const ignoreKeys = keys(TEST_DATA).filter((key) => !pickedKeys.includes(key));
      ignoreKeys.forEach((key) => {
        expect(pick(pickedKeys, TEST_DATA)).not.toHaveProperty(key);
      });
    });
  });
  describe('omit', () => {
    const omittedKeys: (keyof Test)[] = ['b', 'c', 'e'];
    it('should return the Object of the selected property', () => {
      expect(omit(omittedKeys, TEST_DATA)).toEqual(pick(['a', 'd'], TEST_DATA));
    });
  });
});
