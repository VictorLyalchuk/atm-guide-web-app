interface Errors {
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    regionId: string;
    bankId: string;

  }
  
  export const phoneValidations = (
    value: string,
    currentErrors: Errors,
    setErrors: (errors: Errors) => void
  ) => {
    const isValidPrefix = /^(067|095|099|066|063|098|097|096|093)/.test(value.substr(0, 3));
    const isValidDigits = /^\d{7}$/.test(value.substr(3));
    const isValid = isValidPrefix && isValidDigits;
  
    setErrors({
      ...currentErrors,
      phoneNumber: isValid ? '' : 'Невірний формат електронної пошти',
    });
  };