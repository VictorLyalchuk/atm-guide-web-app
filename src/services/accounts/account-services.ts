import axios from "axios";
import {APP_ENV} from "../../env/config.ts"
import type {IUserCreate} from "../../interfaces/Auth/IUserCreate.ts";
import type {IUserEdit} from "../../interfaces/Auth/IUserEdit.ts";
import type {ILogin} from "../../interfaces/Auth/ILogin.ts";
import type {IUser} from "../../interfaces/Auth/IUser.ts";
import { jwtDecode } from "jwt-decode";
import {AuthUserActionType} from "../../interfaces/Auth/IAuthUser.ts";
import type {IUserRegistration} from "../../interfaces/Auth/IUserRegistration.ts";
import type {IUserGet} from "../../interfaces/Auth/IUserGet.ts";


const baseUrl = APP_ENV.BASE_URL;

// Створюємо екземпляр axios
const instance = axios.create({
    baseURL: `${baseUrl}/api/AccountControllers`,
    headers: {
        "Content-Type": "application/json"
    }
});

// Інтерцептор для додавання токену до заголовків
instance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Інтерцептор для обробки помилок і оновлення токену
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshToken();
                setToken(newToken);
                originalRequest.headers["Authorization"] = "Bearer " + newToken;
                return instance(originalRequest);
            } catch (err) {
                console.error("Failed to refresh token:", err);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

// Функція для отримання токену з локального сховища
export function getToken() {
    const token = window.localStorage.getItem("token");
    return token;
}

// Функція для збереження токену в локальне сховище
export function setToken(token: string) {
    window.localStorage.setItem("token", token);
}

// Функція для видалення токенів з локального сховища
export function removeTokens() {
    window.localStorage.removeItem("token");
}

export async function refreshToken() {
    try {
        const localToken = getToken();
        if (localToken) {
            const response = await instance.put("/refresh-token", {
                token: getToken(),
            });
            const token = response.data;
            setToken(response.data);
            return token;
        }
    } catch (error)
    {
        console.error("Failed to refresh token:", error);
        throw error;
    }
}
export async function login(_user: ILogin, dispatch: any) {
    try {
        const response = await instance.post(`Login`, _user)
        const { token } = response.data;
        const user = jwtDecode(token) as IUser;
        dispatch({
            type: AuthUserActionType.LOGIN_USER,
            payload: {
                Id: user.id,
                Email: user.email,
                FirstName: user.firstName,
                LastName: user.lastName,
                Role: user.role,
                BankId: user.bankId,
                RegionId: user.regionId
            } as IUser,
        });
        await setToken(token);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Login request failed:', error.response?.data?.message || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export async function register(user: IUserRegistration) {
    try {
        await instance.post(`Registration`, user, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.error('Failed to edit user data:', error);
        throw error;
    }
}

export async function createUser(model: IUserCreate) {
    const token = localStorage.getItem('token');
    try {
        await instance.post(`CreateUser`, model, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to create user data:', error);
        throw error;
    }
}

export async function editUser(model: IUserEdit) {
    const token = localStorage.getItem('token');
    try {
        await instance.post(`editUser`, model, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to edit user data:', error);
        throw error;
    }
}

export async function getUsersByPage(page: number) {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<IUserGet[]>(`UsersByPage/${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return resp.data;
    } catch (error) {
        console.error('Failed to fetch users data:', error);
        throw error;
    }
}

export async function GetUserById(id: string) {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<IUserGet>(`GetUserById/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return resp.data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}

export async function getUsersQuantity() {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<number>(`UsersQuantity`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return resp.data;
    } catch (error) {
        console.error('Failed to fetch quantity users data:', error);
        throw error;
    }
}

export async function deleteUserByID(id: string) {
    const token = localStorage.getItem('token');
    try {
        await instance.delete(`DeleteUserByID/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}




