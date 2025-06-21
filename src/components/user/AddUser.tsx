import { useEffect, useState } from 'react';
import { FormControl, MenuItem, TextField, ThemeProvider } from '@mui/material';
import { createUser } from '../../services/accounts/account-services';
import { theme } from '../../theme/theme';
import { useNavigate } from 'react-router-dom';
import LoaderModal from '../..//common/Loader/loaderModal';
import TextFieldNoLableComponent from '../../ui/TextFieldNoLableComponent';
import TextFieldReadOnlyNoLableComponent from '../../ui/TextFieldReadOnlyNoLableComponent';
import axios from 'axios';
import { State } from '../../interfaces/Phone/State';
import { IUserCreate } from '../../interfaces/User/IUserCreate';
import { Role, ROLES } from '../../constants/roles';
import PhoneNumberNoLableComponent from '../../ui/PhoneNumberNoLableComponent';
import RoleSelect from '../../ui/RoleSelect';
import { addUserValidation } from '../../validation/add-user-validation';
import { phoneValidations } from '../../validation/phone-validations';
import { IBank } from '../../interfaces/Bank/IBank';
import { IRegion } from '../../interfaces/Region/IRegion';
import { getBank } from '../../services/bank/bank-services';
import { getRegion } from '../../services/region/region-services';


const AddUser = () => {
    const navigate = useNavigate();
    const [isLoaderModal, setIsLoaderModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [bankList, setBanks] = useState<IBank[]>([]);
    const [regionList, setRegions] = useState<IRegion[]>([]);
    const [values, setValues] = useState<State>({
        textmask: '(   )    -  -  ',
    });

    const [formData, setFormData] = useState({
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        regionId: '',
        bankId: '',
    });

    const [errors, setErrors] = useState({
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        regionId: '',
        bankId: '',
    });

    useEffect(() => {
        getBank()
            .then(data => setBanks(data))
            .catch(error => console.error('Error fetching season data:', error));
        getRegion()
            .then(data => setRegions(data))
            .catch(error => console.error('Error fetching colors data:', error));
    }, []);



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const changePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        const cleanedValue = value.replace(/\D/g, '');
        setFormData((prevData) => ({
            ...prevData,
            phoneNumber: cleanedValue,
        }));

        phoneValidations(cleanedValue, errors, setErrors);
    };


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        event.preventDefault();
        const { isValid, newErrors } = addUserValidation(formData, values.textmask);
        setErrors(newErrors);
        if (isValid) {
            const model: IUserCreate = {
                login: formData.login,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                role: formData.role || '',
                regionId: formData.regionId || '',
                bankId: formData.bankId || '',
            };
            try {
                setIsLoaderModal(true);
                await createUser(model);
                navigate("/admin/user/user-list");
            }
            catch (error) {
                console.error("Login error:", error);
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.errors || error.message;
                    setErrorMessage(errorMessage);
                } else {
                    setErrorMessage("невідома помилка при створенні користувача");
                }
            }
            finally {
                setIsLoaderModal(false);
            }
            setTimeout(() => {
                setErrorMessage("");
            }, 1000);
        }
    };

    const handleCancel = () => {
        navigate('/admin/user/user-list');
    }

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        const selectedRole = ROLES.find(role => role.id === value) || null;
        setSelectedRole(selectedRole);
        setFormData((prevData) => ({
            ...prevData,
            role: selectedRole?.name || '',
        }));
    };

    return (
        <div className="bg-gray-100 pb-20">
            <div className="container mx-auto p-8 flex relative max-w-screen-2xl px-2 sm:px-2 lg:px-2 flex-col lg:flex-row justify-between">
                <div className="sm:mx-auto sm:w-full">
                    <div className="w-full ">
                        <div className="bg-white p-5 rounded-md shadow-md mb-8 mt-8 ">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center ">
                                <div className="pb-6 mt-6">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">{'Створення користувача'}</h2>
                                </div>
                            </div>
                            <div className="border-t">
                                <div className="space-y-6">
                                    <ThemeProvider theme={theme}>
                                        <div className="lg:col-span-9">
                                            <form onSubmit={onSubmit}>
                                                {/* Profile section */}
                                                <div className="px-4 py-6 sm:p-6 lg:pb-8">
                                                    <div className="mt-6 flex flex-col lg:flex-row">
                                                        <div className="flex-grow space-y-6">

                                                            <div>
                                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                                    {'Електронна пошта'}
                                                                </label>
                                                                <div className="mt-2 flex rounded-md shadow-sm">
                                                                    <TextFieldReadOnlyNoLableComponent
                                                                        name="email"
                                                                        id="email"
                                                                        value={formData.email}
                                                                        onChange={handleChange}
                                                                        error={errors.email}
                                                                        autoComplete="email"
                                                                        maxLength={30}
                                                                        readOnly={false}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label htmlFor="textmask" className="block text-sm font-medium leading-6 text-gray-900">
                                                                    {'Номер мобільного телефону'}
                                                                </label>
                                                                <div className="mt-2">
                                                                    <PhoneNumberNoLableComponent
                                                                        value={values.textmask}
                                                                        id="textmask"
                                                                        onChange={changePhoneNumber}
                                                                        error={errors.phoneNumber}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 grid grid-cols-12 gap-6">
                                                        <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                                                {'Ім’я'}
                                                            </label>
                                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                                <TextFieldNoLableComponent
                                                                    id="firstName"
                                                                    name="firstName"
                                                                    value={formData.firstName}
                                                                    onChange={handleChange}
                                                                    error={errors.firstName}
                                                                    autoComplete="firstName"
                                                                    maxLength={50}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                                                {'Прізвище'}
                                                            </label>
                                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                                <TextFieldNoLableComponent
                                                                    name="lastName"
                                                                    id="lastName"
                                                                    value={formData.lastName}
                                                                    onChange={handleChange}
                                                                    error={errors.lastName}
                                                                    autoComplete="lastName"
                                                                    maxLength={50}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="regionId" className="block text-sm font-medium leading-6 text-gray-900">
                                                                {'Регіон України'}
                                                            </label>
                                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        variant="standard"
                                                                        id="regionId"
                                                                        name="regionId"
                                                                        select
                                                                        value={formData.regionId}
                                                                        onChange={handleChange}
                                                                        error={!!errors.regionId}
                                                                    >
                                                                        {regionList && regionList.map((region, index) => (
                                                                            <MenuItem key={index} value={region.id}>
                                                                                {region.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                    {errors.bankId ? (
                                                                        <div className="h-6 text-xs text-red-500">Помилка: {errors.bankId}</div>
                                                                    ) : (<div className="h-6 text-xs "> </div>)}
                                                                </FormControl>
                                                            </div>
                                                        </div>

                                                        <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="bankId" className="block text-sm font-medium leading-6 text-gray-900">
                                                                {'Банк'}
                                                            </label>
                                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        variant="standard"
                                                                        id="bankId"
                                                                        name="bankId"
                                                                        select
                                                                        value={formData.bankId}
                                                                        onChange={handleChange}
                                                                        error={!!errors.bankId}
                                                                    >
                                                                        {bankList && bankList.map((bank, index) => (
                                                                            <MenuItem key={index} value={bank.id}>
                                                                                {bank.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                    {errors.bankId ? (
                                                                        <div className="h-6 text-xs text-red-500">Помилка: {errors.bankId}</div>
                                                                    ) : (<div className="h-6 text-xs "> </div>)}
                                                                </FormControl>
                                                            </div>
                                                        </div>



                                                        <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">
                                                                {'Логін'}
                                                            </label>
                                                            <div className="mt-3 flex rounded-md shadow-sm">
                                                                <TextFieldNoLableComponent
                                                                    name="login"
                                                                    id="login"
                                                                    value={formData.login}
                                                                    onChange={handleChange}
                                                                    error={errors.login}
                                                                    autoComplete="login"
                                                                    maxLength={50}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-span-12 sm:col-span-6">

                                                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                                                {'Роль'}
                                                            </label>
                                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                                <RoleSelect
                                                                    rolesList={ROLES}
                                                                    selectedRole={selectedRole}
                                                                    handleRoleChange={handleRoleChange}
                                                                    errors={errors}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className=" pt-6 ">
                                                    <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                                                        <div className="flex justify-end w-64">

                                                            <FormControl fullWidth variant="outlined">
                                                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                                                    <button
                                                                        type="submit"
                                                                        className={`p-2 flex items-center justify-center rounded-md border bg-indigo-600 hover:bg-indigo-700 px-8 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                                                    >
                                                                        {'Створити'}
                                                                    </button>
                                                                    <button type="button" className="p-2 mr-3 flex items-center rounded-md border bg-gray-200 hover:bg-gray-300 justify-center px-8 py-2 text-sm font-semibold leading-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleCancel}>
                                                                        {'Скасувати'}
                                                                    </button>
                                                                </div>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </ThemeProvider>

                                </div>
                            </div>
                        </div>
                        {isLoaderModal && (
                            <LoaderModal />
                        )}
                    </div>
                </div>

            </div>

            <div className={`fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 ${errorMessage ? 'block' : 'hidden'}`}>
                <div className="bg-white p-4 rounded-md shadow-md">
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddUser;