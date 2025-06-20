import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Це правильний імпорт для React 18+
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AuthUserActionType } from "./interfaces/Auth/IAuthUser.ts";
import { store } from "./store";
import type { IUser } from "./interfaces/Auth/IUser.ts";
import { jwtDecode } from "jwt-decode";
import { setToken } from "./services/accounts/account-services.ts";

// Ініціалізація авторизації
if (localStorage.token) {
    setToken(localStorage.token);
    const user = jwtDecode<IUser>(localStorage.token);
    store.dispatch({ type: AuthUserActionType.LOGIN_USER, payload: user });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement); // Використовуємо імпортовану функцію createRoot

root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>
);

