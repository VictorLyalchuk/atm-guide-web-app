export interface IUserCreate{
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    role: string;
    imagePath?:string;
    bankId?: string;
    regionId?: string;
    phoneNumber?: string;
}