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

export interface ITestReturnDBTermDiscipline {
    name: string;
    pdfUrl: string;
    categories:{
        name:string;
    };
    teachersDisciplines:{
        teachers:{
            name:string;
        }
    }
}

export interface ITestReturnDBTeacher {
    name: string;
    pdfUrl: string;
    categories:{
        name:string;
    };
    teachersDisciplines:{
        disciplines:{
            name:string;
        }
    }
}

export type TTestInsertDB = Omit<ITestDB,'id'>