import { IUserGet } from "./IUserGet";

export interface IAccountResult {
  success: boolean;
  errors: string[];
  user: IUserGet;
  token: string;
  users: IUserGet[];
}