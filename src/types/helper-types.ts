export type Maybe<T> = T | null;

export interface IError {
  statusCode: number;
  localization?: string;
  message: string;
}
