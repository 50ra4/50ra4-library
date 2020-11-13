/* eslint-disable no-console */
import { formatLogMessage } from '.';
import { partial, toPairs, values } from '../ramda';

export const ELogLevel = {
  debug: 'DEBUG',
  log: 'LOG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
} as const;
export type LogLevel = typeof ELogLevel[keyof typeof ELogLevel];

const Console = {
  [ELogLevel.error]: console.error,
  [ELogLevel.warn]: console.warn,
  [ELogLevel.info]: console.info,
  [ELogLevel.log]: console.log,
  [ELogLevel.debug]: console.debug,
} as const;

const LoggerLevels: ReadonlyArray<LogLevel> = values(ELogLevel);
const shouldOutputLogLevel = (targetLevel: LogLevel, level: LogLevel): boolean => {
  const targetIndex = LoggerLevels.indexOf(targetLevel);
  const index = LoggerLevels.indexOf(level);
  return targetIndex <= index;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
const dummyLogger = (message: string, ...optionalParams: ReadonlyArray<unknown>): void => {};
const logger = (logLevel: LogLevel, message: string, ...optionalParams: ReadonlyArray<unknown>): void =>
  Console[logLevel](formatLogMessage(logLevel, message), ...optionalParams);

type Logger = (message: string, optionalParams: ReadonlyArray<unknown>) => void;
type CustomLoggerOption = {
  target?: LogLevel;
};
export const CustomLogger = (options?: CustomLoggerOption): Record<keyof typeof ELogLevel, Logger> =>
  toPairs(ELogLevel).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: shouldOutputLogLevel(options?.target ?? ELogLevel.info, value) ? partial(logger, [value]) : dummyLogger,
    }),
    {} as Record<keyof typeof ELogLevel, Logger>,
  );
