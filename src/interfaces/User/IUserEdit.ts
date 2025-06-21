export interface IUserEdit {
    id: string,
    firstName: string,
    lastName: string,
    regionId: string,
    bankId: string,
    phoneNumber?: string
    email: string,
    login: string,
    role: string,
    imagePath: string | null,
    isBlocked: boolean
    generateNewPassword: boolean,
}