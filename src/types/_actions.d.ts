export type Action<T = Record<string, unknown>> = {
  type: string;
  payload?: T;
};

export type LoginUser = {
  emailOrPhone: string;
  password: string;
  remember?: Array<string>;
};

export type Message = {
  message: string;
};

export type DeleteUser = {
  id: string;
};

export type CreateUserByAdmin = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
};
