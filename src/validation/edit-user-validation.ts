interface FormData {
    id: string;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string,
}

interface Errors {
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export const editUserValidation = (formData: FormData, textmask: string): { isValid: boolean; newErrors: Errors } => {
    let isValid = true;
    const newErrors: Errors = {
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
    };

    if (formData.login.trim() === '') {
        newErrors.login = "Логін обов'язковий";
        isValid = false;
    }
    else if (formData.login.trim().length < 7) {
        newErrors.login = "Логін має містити мінімум 7 знаків";
        isValid = false;
    }

    if (formData.firstName.trim() === '') {
        newErrors.firstName = "Ім'я обов'язкове";
        isValid = false;
    }

    if (formData.lastName.trim() === '') {
        newErrors.lastName = "Прізвище обов'язкове";
        isValid = false;
    }

    if (formData.email.trim() === '' || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Невірний формат електронної пошти";
        isValid = false;
    }
    if (formData.role.trim() === '') {
        newErrors.role = "Невірна роль";
        isValid = false;
    }


    if (textmask) {
        const cleanedPhoneNumber = textmask.replace(/\D/g, '');
        if (cleanedPhoneNumber.trim() === '') {
            newErrors.phoneNumber = 'Phone Number is required';
            isValid = false;
        } else if (!/^(067|095|099|066|063|098|097|096|093)\d{7}$/.test(cleanedPhoneNumber)) {
            newErrors.phoneNumber = "Невірний формат телефонного номера";
            isValid = false;
        }
    } else {
        newErrors.phoneNumber = "Телефонний номер обов'язковий";
        isValid = false;
    }
    return { isValid, newErrors };
};