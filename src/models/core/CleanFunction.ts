export type CleanFunctionOr<T> = CleanFunction<T> | T;

export type CleanFunctionFunc<T> = () => [T, () => void];

export class CleanFunction<T> {
  func: CleanFunctionFunc<T>;

  constructor(func: CleanFunctionFunc<T>) {
    this.func = func;
  }
}
