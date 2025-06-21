export interface IUserGet
{
    id: string,
    email: string,
    login: string,
    firstName: string,
    lastName: string,
    role: string,
    bankName?: string,
    regionName?: string,
    phoneNumber: string,
    imagePath:string|null,
    isBlocked:boolean
    regionId: string;
    bankId: string;
    generateNewPassword: boolean,
}