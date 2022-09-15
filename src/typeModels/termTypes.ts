export interface ITermsDB {
    id:number;
    number:number;
    createdAt:Date;
}

export type TTermReturnDB = Omit<ITermsDB,'createdAt'>