/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function lt(a: number, b: number): boolean;
export function lt(a: number): (b: number) => boolean;
export function lt(a: number, b?: number) {
  if (arguments.length === 1) {
    return (_b: number) => _b < a;
  }
  return b! < a;
}

export function lte(a: number, b: number): boolean;
export function lte(a: number): (b: number) => boolean;
export function lte(a: number, b?: number) {
  if (arguments.length === 1) {
    return (_b: number) => _b <= a;
  }
  return b! <= a;
}

export function gt(a: number, b: number): boolean;
export function gt(a: number): (b: number) => boolean;
export function gt(a: number, b?: number) {
  if (arguments.length === 1) {
    return (_b: number) => _b > a;
  }
  return b! > a;
}

export function gte(a: number, b: number): boolean;
export function gte(a: number): (b: number) => boolean;
export function gte(a: number, b?: number) {
  if (arguments.length === 1) {
    return (_b: number) => _b >= a;
  }
  return b! >= a;
}
