import { stringArray2EnumLikeObject } from '.';

export const EValidatiorType = stringArray2EnumLikeObject([
  'required', //
  'length',
  'pattern1',
  'pattern2',
  'pattern3',
  'function1',
  'function2',
  'function3',
]);
export type ValidatiorType = keyof typeof EValidatiorType;
