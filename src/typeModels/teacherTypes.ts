export interface ITeacherDB {
    id: number;
    name: string;
    createdAt: Date;
}

export type TTeacherReturnDB = Omit<ITeacherDB, 'createdAt'>