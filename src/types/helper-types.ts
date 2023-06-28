export type Maybe<T> = T | null;
export type Id = string;

export interface IError {
  statusCode: number;
  localization?: string;
  message: string;
}
