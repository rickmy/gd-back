import { TypeDNI, User } from "@prisma/client";

export class UserEntity implements User {
    id: number;
    dni: string;
    typeDni: TypeDNI;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    state: boolean;
    idRol: number;
    
}
