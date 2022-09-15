export interface IUserDB {
    id:number;
    email: string;
    password: string | Promise<string>;
}

export interface IUserBody {
    email: string;
    password: string;
    confirmPassword:string|null;
}

export interface IUserToken {
    id:number
}

export type TUserInsertDB = Omit<IUserDB,'id'>