/* eslint-disable complexity */
export function pipe<A extends ReadonlyArray<unknown>, B, C>(
  f1: (...args: A) => B, // NOTE: no fix lint
  f2: (p2: B) => C,
): (...args: A) => C;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3: (p3: C) => D,
): (...args: A) => D;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D, E>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3: (p3: C) => D,
  f4: (p4: D) => E,
): (...args: A) => E;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3: (p3: C) => D,
  f4: (p4: D) => E,
  f5: (p4: E) => F,
): (...args: A) => F;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3: (p3: C) => D,
  f4: (p4: D) => E,
  f5: (p4: E) => F,
  f6: (p5: F) => G,
): (...args: A) => G;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3: (p3: C) => D,
  f4: (p4: D) => E,
  f5: (p4: E) => F,
  f6: (p5: F) => G,
  f7: (p7: G) => H,
): (...args: A) => H;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3: (p3: C) => D,
  f4: (p4: D) => E,
  f5: (p4: E) => F,
  f6: (p5: F) => G,
  f7: (p7: G) => H,
  f8: (p8: H) => I,
): (...args: A) => I;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3: (p3: C) => D,
  f4: (p4: D) => E,
  f5: (p4: E) => F,
  f6: (p5: F) => G,
  f7: (p7: G) => H,
  f8: (p8: H) => I,
  f9: (p9: I) => J,
): (...args: A) => J;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J, K>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3: (p3: C) => D,
  f4: (p4: D) => E,
  f5: (p4: E) => F,
  f6: (p5: F) => G,
  f7: (p7: G) => H,
  f8: (p8: H) => I,
  f9: (p9: I) => J,
  f10: (p10: J) => K,
): (...args: A) => K;
export function pipe<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J, K>(
  f1: (...args: A) => B,
  f2: (p2: B) => C,
  f3?: (p3: C) => D,
  f4?: (p4: D) => E,
  f5?: (p4: E) => F,
  f6?: (p5: F) => G,
  f7?: (p7: G) => H,
  f8?: (p8: H) => I,
  f9?: (p9: I) => J,
  f10?: (p10: J) => K,
) {
  if (typeof f3 === 'undefined') {
    return (...args: A): C => f2(f1(...args));
  }
  if (typeof f4 === 'undefined') {
    return (...args: A): D => f3(f2(f1(...args)));
  }
  if (typeof f5 === 'undefined') {
    return (...args: A): E => f4(f3(f2(f1(...args))));
  }
  if (typeof f6 === 'undefined') {
    return (...args: A): F => f5(f4(f3(f2(f1(...args)))));
  }
  if (typeof f7 === 'undefined') {
    return (...args: A): G => f6(f5(f4(f3(f2(f1(...args))))));
  }
  if (typeof f8 === 'undefined') {
    return (...args: A): H => f7(f6(f5(f4(f3(f2(f1(...args)))))));
  }
  if (typeof f9 === 'undefined') {
    return (...args: A): I => f8(f7(f6(f5(f4(f3(f2(f1(...args))))))));
  }
  if (typeof f10 === 'undefined') {
    return (...args: A): J => f9(f8(f7(f6(f5(f4(f3(f2(f1(...args)))))))));
  }
  return (...args: A): K => f10(f9(f8(f7(f6(f5(f4(f3(f2(f1(...args))))))))));
}
