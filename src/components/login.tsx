import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../validation/login';
import { login } from '../services/accounts/account-services';
import '../index.css';
import { FormControl, ThemeProvider } from '@mui/material';
import PasswordFieldComponent from '../ui/PasswordFieldComponent';
import TextFieldComponent from '../ui/TextFieldComponent';
import { theme } from '../theme/theme';
import type { ILogin } from '../interfaces/User/ILogin';
import axios from 'axios';
import ButtonComponent from '../ui/ButtonComponent';
import { useDispatch } from 'react-redux';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<ILogin>({
    email: '',
    password: '',
    authType: 'web',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    authType: 'web'
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isValid, newErrors } = validateLogin(formData);
    setErrors(newErrors);
    if (isValid) {
      try {
        await login(formData, dispatch);
        navigate("/admin/admin-panel-page/");
      } catch (error) {
        console.error("Login error:", error);
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.errors || error.message;
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage("невірний логін або пароль");
        }
        setTimeout(() => {
          setErrorMessage("");
        }, 1000);
      }
    };
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <main className="bg-gray-100 h-[80vh] flex items-center justify-center">
      <div className="container mx-auto p-8 flex relative max-w-md px-2 sm:px-2 lg:px-2 flex-col lg:flex-row justify-between">
        <div className="sm:mx-auto sm:w-full">
          <div className="bg-white rounded-md shadow-md p-5 flex flex-col lg:flex-row">
            <div className="order-1 lg:order-2 w-full p-5 mb-8 flex flex-col justify-center items-center">
              <div className="w-full mb-4">
                <form onSubmit={handleSubmit}>
                  <ThemeProvider theme={theme}>
                    <TextFieldComponent
                      label={'Лоігн'}
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      autoComplete="email"
                      maxLength={30}
                      placeholder={''}
                    />
                    <PasswordFieldComponent
                      label={'Пароль'}
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      autoComplete="password"
                      showPassword={showPassword}
                      handlePasswordToggle={handlePasswordToggle}
                    />
                  </ThemeProvider>
                  <FormControl fullWidth className="flex flex-col space-y-4"
                    variant="outlined">
                    <ButtonComponent
                      text='Вхід'
                      type="submit" />
                  </FormControl>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 ${errorMessage ? 'block' : 'hidden'}`}>
        <div className="bg-white p-4 rounded-md shadow-md">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </main>
  );
}