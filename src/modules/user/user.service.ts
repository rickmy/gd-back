import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PayloadModel } from 'src/auth/models/payloadModel';

@Injectable()
export class UserService {
  constructor(private _prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const { dni, email } = createUserDto;
    const existDni = await this.findByDni(dni);
    console.log(existDni);
    if (existDni)
      throw new UnprocessableEntityException('El usuario ya existe');

    const existEmail = await this.findByEmail(email);
    if (existEmail)
      throw new UnprocessableEntityException('El usuario ya existe');

    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = this._prismaService.user.create({
      data: createUserDto,
    });
    return newUser;
  }

  async comparePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, storedPasswordHash);
  }

  async validateUser(payload: PayloadModel): Promise<boolean> {
    const user = await this.findByEmail(payload.email);
    if (!user) {
      throw new UnprocessableEntityException('Usuario no existe');
    }
    return !!user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this._prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findByDni(dni: string) {
    return this._prismaService.user.findUnique({
      where: {
        dni,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
