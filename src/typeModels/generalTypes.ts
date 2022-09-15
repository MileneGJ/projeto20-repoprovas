type AppErrorTypes = "Conflict" | "NotFound" | "Unauthorized" | "InvalidInput";

export interface CustomError {
    status:AppErrorTypes;
    message:string;    
}