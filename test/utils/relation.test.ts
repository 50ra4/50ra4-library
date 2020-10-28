import { lt, lte, gt, gte } from '../../src/utils';

describe('relation', () => {
  it('lt', () => {
    const lt3 = lt(3);
    expect(lt3(1)).toBeTruthy();
    expect(lt3(2)).toBeTruthy();
    expect(lt3(3)).toBeFalsy();
    expect(lt3(4)).toBeFalsy();
  });
  it('gt', () => {
    const gt3 = gt(3);
    expect(gt3(2)).toBeFalsy();
    expect(gt3(3)).toBeFalsy();
    expect(gt3(4)).toBeTruthy();
    expect(gt3(5)).toBeTruthy();
  });
  it('lte', () => {
    const lte3 = lte(3);
    expect(lte3(2)).toBeTruthy();
    expect(lte3(3)).toBeTruthy();
    expect(lte3(4)).toBeFalsy();
    expect(lte3(5)).toBeFalsy();
  });
  it('gte', () => {
    const gte3 = gte(3);
    expect(gte3(1)).toBeFalsy();
    expect(gte3(2)).toBeFalsy();
    expect(gte3(3)).toBeTruthy();
    expect(gte3(4)).toBeTruthy();
  });
});
