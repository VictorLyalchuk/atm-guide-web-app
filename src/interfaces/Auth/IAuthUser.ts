import type {IUser} from "./IUser.ts";

export interface IAuthUser {
    isAuth: boolean
    user?: IUser
}

export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER",
    UPDATE_USER = "UPDATE_USER"
}