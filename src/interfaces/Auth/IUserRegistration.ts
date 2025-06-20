export interface IUserRegistration{
    email:string,
    pasword:string,
    firstName:string,
    lastName:string,
    regionId?:number|null,
    bankId?: number | null
}