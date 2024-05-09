import type { UserType } from '../enums/index.js';

export type TUser = {
  name: string;
  email: string;
  avatar: string | undefined;//url
  password: string;
  type: UserType;
};
