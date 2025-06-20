export interface IUserCreate{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    imagePath?:string;
    bankId?: number | null;
    regionId?: number | null;
    phoneNumber?: string;
}