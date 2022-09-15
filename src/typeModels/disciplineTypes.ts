export interface IDisciplineDB {
    id:number;
    name: string;
    termId:number;
    createdAt: Date;
}

export type TDisciplineReturnDB = Omit<IDisciplineDB, 'termId'| 'createdAt'>