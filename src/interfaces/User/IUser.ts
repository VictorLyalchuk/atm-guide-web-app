export interface IUser {
    Id: string,
    Email: string,
    FirstName: string,
    LastName: string,
    Roles: string,
    bankName?: string,
    regionName?: string,
    PhoneNumber?: string,
    ImagePath?: string;
}