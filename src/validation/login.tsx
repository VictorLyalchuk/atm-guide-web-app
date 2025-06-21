interface FormData {
  email: string;
  password: string;
  authType: string;

}

interface Errors {
  email: string;
  password: string;
  authType: string;
}

export const validateLogin = (formData: FormData): { isValid: boolean; newErrors: Errors } => {
  let isValid = true;

  const newErrors: Errors = {
    email: "",
    password: "",
    authType: 'web'
  };

  if (formData.email.trim() === '' || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Невірний формат електронної пошти";
    isValid = false;
  }


  if (formData.password.trim() === '') {
    newErrors.password = "Пароль є обов'язковим";
    isValid = false;
  }

  return { isValid, newErrors };
}
