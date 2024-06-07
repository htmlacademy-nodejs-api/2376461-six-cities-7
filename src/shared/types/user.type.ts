import type { UserType } from '../enums/index.js';

export type TUser = {
  firstname: string;
  lastname: string;
  email: string;
  avatarPath?: string;//url
  password?: string;
  type: UserType;
};
