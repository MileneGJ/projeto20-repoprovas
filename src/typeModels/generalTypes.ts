type AppErrorTypes = "Conflict" | "NotFound" | "Unauthorized" | "InvalidInput";

export interface CustomError {
    status:AppErrorTypes;
    message:string;    
}

export interface IJWTDecoded {
    payload:number;
    iat:number;
    exp:number
}