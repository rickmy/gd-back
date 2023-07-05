import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StudentsModule } from '../students/students.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [PrismaModule, StudentsModule],
})
export class ProjectModule {}
