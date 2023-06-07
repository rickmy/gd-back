import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(
    private _prismaService: PrismaService,
  ){}
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const { dni, email } = createUserDto;
    const existDni = await this.findByDni(dni);
    if(existDni)
      throw new UnprocessableEntityException('El email ya existe');
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = this._prismaService.user.create({
      data: createUserDto,
    })
    return newUser;
  }

  async comparePassword(
    password: string,
    storesPasswordHash: string,
  ): Promise<boolean>{
    return bcrypt.compare(password, storesPasswordHash);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string){
    return this._prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findByDni(dni: string){
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
