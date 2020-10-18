import { hasPath, omit, path, pick, toPairs, toString } from '../ramda';
import { Nullable, ReadonlyPartial } from '../types';
import {
  isBoolean,
  isEmpty,
  isFunction,
  isNil,
  isObject,
  isRegExp,
  isValidLength,
  replaceMessage,
  stringArray2EnumLikeObject,
} from '.';

export const EValidatorType = stringArray2EnumLikeObject([
  'required', //
  'length',
  'pattern1',
  'pattern2',
  'pattern3',
  'function1',
  'function2',
  'function3',
]);
type ValidatorType = keyof typeof EValidatorType;

type LengthValidatorType = Extract<ValidatorType, 'length'>;
type LengthValidatorConfig = { max: number; min?: number };

type PatternValidatorType = Extract<ValidatorType, 'pattern1' | 'pattern2' | 'pattern3'>;
type PatternValidatorConfig = RegExp;

type FunctionValidatorType = Extract<ValidatorType, 'function1' | 'function2' | 'function3'>;
type FunctionValidatorConfig<T> = (v: Nullable<T>) => boolean;

type RequiredValidatorType = Extract<ValidatorType, 'required'>;
type RequiredValidatorConfig<T> = true | FunctionValidatorConfig<T>;

type ValidatorConfig<T, K extends ValidatorType> = K extends RequiredValidatorType
  ? RequiredValidatorConfig<T>
  : K extends LengthValidatorType
  ? LengthValidatorConfig
  : K extends PatternValidatorType
  ? PatternValidatorConfig
  : K extends FunctionValidatorType
  ? FunctionValidatorConfig<T>
  : never;

export type ValueValidatorConfig<T> = ReadonlyPartial<
  {
    [K in ValidatorType]: ValidatorConfig<T, K>;
  }
>;
type ValueValidatorConfigType<T> = ValueValidatorConfig<T>[keyof ValueValidatorConfig<T>];

type ValidationMessageReplaceParameter = {
  name: string;
  max?: number;
  min?: number;
};
export type ValueValidatorMessageTemplate<K extends ValidatorType> = Pick<ValidationMessageReplaceParameter, 'name'> &
  ReadonlyPartial<Record<K, string>>;
type ValidatorCustomizeConfig<K extends ValidatorType> = ['pick' | 'omit', K[]];

export class ValidationError implements TypeError {
  public readonly name = 'ValidationError';
  public readonly message: string;

  private toMessage(type: ValidatorType) {
    const _template = this.template[type] ?? `{name} is invalid value.(${toString(this.value)})`;
    return replaceMessage(_template, this.parameter);
  }

  constructor(
    public readonly value: unknown,
    public readonly types: ReadonlyArray<ValidatorType>, //
    private readonly template: ValueValidatorMessageTemplate<ValidatorType>,
    private readonly parameter: ValidationMessageReplaceParameter,
  ) {
    this.message = this.toMessage(types[0]);
  }

  get messages(): string[] {
    return this.types.map(this.toMessage);
  }
}

const toMessageReplaceParameter = <T>(
  validatorConfig: ValueValidatorConfig<T>,
  template: ValueValidatorMessageTemplate<keyof typeof validatorConfig>,
): ValidationMessageReplaceParameter => {
  const { name } = template;
  const lengthConfig = path([EValidatorType.length], validatorConfig);
  if (!isObject(lengthConfig)) {
    return { name };
  }
  return { name, ...lengthConfig };
};

// eslint-disable-next-line complexity
const isInvalidValue = <T>(
  value: T,
  isRequired: boolean,
  config: ValueValidatorConfigType<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type: ValidatorType, //
): boolean => {
  if (isNil(config)) {
    return false;
  }
  if (!isRequired && isEmpty(value)) {
    // If it is not a required input item and it is not entered, false is returned.
    return false;
  }
  if (isFunction(config)) {
    return !config(value);
  }
  if (isBoolean(config)) {
    return isEmpty(value);
  }
  if (isRegExp(config)) {
    if (Array.isArray(value)) {
      return !value.map(toString).every((v) => config.test(v));
    }
    return !config.test(toString(value));
  }
  if (isObject(config)) {
    return !isValidLength(config, value);
  }
  // never
  return true;
};

const customizeValueValidator = <T>(
  validatorConfig: ValueValidatorConfig<T>,
  customConfig?: ValidatorCustomizeConfig<keyof typeof validatorConfig>,
): ValueValidatorConfig<T> => {
  if (!customConfig) {
    return validatorConfig;
  }
  const [option, types] = customConfig;
  return option === 'pick' //
    ? pick(types, validatorConfig)
    : omit(types, validatorConfig);
};

export const valueValidator = <T>(validatorConfig: ValueValidatorConfig<T>) => (
  template: ValueValidatorMessageTemplate<keyof typeof validatorConfig>,
  customConfig?: ValidatorCustomizeConfig<keyof typeof validatorConfig>,
) => (value: T): ValidationError | false => {
  const customizedValidator = customizeValueValidator(validatorConfig, customConfig);
  const isRequired = hasPath(['required'], customizedValidator);
  const invalidTypes = toPairs(customizedValidator)
    // type cast
    .map(([type, conf]) => [type, conf] as [ValidatorType, ValueValidatorConfigType<T>])
    .reduce(
      (acc, [type, conf]) => (isInvalidValue(value, isRequired, conf, type) ? [...acc, type] : acc),
      [] as ReadonlyArray<ValidatorType>,
    );

  if (invalidTypes.length) {
    const messageParameter = toMessageReplaceParameter(validatorConfig, template);
    return new ValidationError(value, invalidTypes, template, messageParameter);
  }
  // has no error
  return false;
};
