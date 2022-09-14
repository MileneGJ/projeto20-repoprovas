export interface IUserDB {
    id:number;
    email: string;
    password: string;
}

export interface IUserBody {
    email: string;
    password: string;
    confirmPassword:string;
}

export type TUserInsertDB = Omit<IUserDB,'id'>