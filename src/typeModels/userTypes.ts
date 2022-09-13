export interface IUserDB {
    id:number;
    email: string;
    password: string;
}

export type TUserBody = Omit<IUserDB, 'id'>