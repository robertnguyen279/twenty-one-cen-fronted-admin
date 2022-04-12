export type Action<T = Record<string, unknown>> = {
  type: string;
  payload?: T;
};

export type LoginUser = {
  emailOrPhone: string;
  password: string;
  remember?: Array<string>;
};

export type ErrorType = {
  message: string;
};
