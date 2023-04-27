export interface IUser{
    name:string;
    email:string;
    role:string;
    _id:string;
    createdAt:Date;
    updateAt:Date;
    __v:number
}

export interface GenericResponse{
    status:string;
    message:string;
}