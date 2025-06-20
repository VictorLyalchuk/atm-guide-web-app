import type {IAuthUser} from "../../interfaces/Auth/IAuthUser.ts";
import {AuthUserActionType} from "../../interfaces/Auth/IAuthUser.ts";


const initState: IAuthUser =
    {
        isAuth: false
    }

export const authSlice = (state=initState, action: any): IAuthUser => {
    switch(action.type)
    {
        case AuthUserActionType.LOGIN_USER: {
            return {
                ...state,
                isAuth:true,
                user: action.payload
            };
        }
        case AuthUserActionType.LOGOUT_USER: {
            return {
                ...state,
                isAuth: false,
                user: undefined
            };
        }
        case AuthUserActionType.UPDATE_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload // Оновлення даних користувача
                }
            };
        }
    }

    return state;
}

export default authSlice;