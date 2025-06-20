export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export function validateLogin(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email обовʼязковий';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Невірний формат email';
  }
  
  if (!values.password.trim()) {
    errors.password = 'Пароль обовʼязковий';
  } else if (values.password.length < 3) {
    errors.password = 'Пароль надто короткий';
  }

  return errors;
}
