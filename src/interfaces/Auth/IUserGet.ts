export interface IUserGet
{
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    bankId?: number | null;
    regionId?: number | null;
    phoneNumber?: string,
    imagePath:string|null,
    isBlocked:boolean
}