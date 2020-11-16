export type ObjectKeyType = string | number | symbol;
export type ObjectType<T extends ObjectKeyType = string, K = unknown> = Record<T, K>;
export type IndexedObject<T> = ObjectType<string, T>;
export type Nullable<T> = T | undefined | null;
export type ReadonlyPartial<T> = Readonly<Partial<T>>;
export type FunctionType<A extends ReadonlyArray<unknown>, B = unknown> = (...a: A) => B;
export type SafePred<A extends ReadonlyArray<unknown>> = FunctionType<A, boolean>;
