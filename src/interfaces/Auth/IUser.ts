export interface IUser {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    bankId?: number | null;
    regionId?: number | null;
    phoneNumber?: string;
}