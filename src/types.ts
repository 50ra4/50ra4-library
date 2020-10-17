export type ObjectType = Record<string, unknown>;
export type IndexedObject<T> = Record<string, T>;
export type Nullable<T> = T | undefined | null;
export type ReadonlyPartial<T> = Readonly<Partial<T>>;
