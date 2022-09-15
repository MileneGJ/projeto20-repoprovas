export interface ITestDB {
    id:number;
    name: string;
    pdfUrl: string;
    categoryId:number;
    teacherDisciplineId:number;
}

export interface ITestBody {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}

export type TTestInsertDB = Omit<ITestDB,'id'>