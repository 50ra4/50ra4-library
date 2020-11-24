import { pipe } from '../../src/utils/pipe';

describe('utils/pipe', () => {
  it('number', () => {
    const f = (n: number) => n + 1;
    const g = (n: number) => n * 2;
    expect(6).toEqual(pipe(f, g)(2));
    expect(7).toEqual(pipe(f, g, f)(2));
    expect(14).toEqual(pipe(f, g, f, g)(2));
  });
  it('string', () => {
    const f = (n: string) => n + 'f';
    const g = (n: string) => n + 'g';
    const a = pipe(f, g);
    expect('fg').toEqual(a(''));
    expect('fgf').toEqual(pipe(f, g, f)(''));
    expect('fgfg').toEqual(pipe(f, g, f, g)(''));
  });
  it('complex parameter', () => {
    const f = (s: string, n: number) => `${s}+${n.toString().padStart(2, '0')}`;
    const g = (n: string) => n + 'g';
    const a = pipe(f, g);
    expect('f+03g').toEqual(a('f', 3));
  });
});
