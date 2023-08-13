type OnSuccess<T> =
  | ((data: AxiosResponse<any, any>, variables: T, context: unknown) => unknown)
  | undefined;

type OnError<T> =
  | ((error: unknown, variables: T, context: unknown) => unknown)
  | undefined;
