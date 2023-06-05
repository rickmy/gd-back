import { TypeDNI } from "@prisma/client";

export class CreateUserDto {
    dni: string;
    typeDni: TypeDNI;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    idRol: number;
}
