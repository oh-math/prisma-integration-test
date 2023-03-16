import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from './prisma/prisma-client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data,
    });
  }

  public async getUser(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  public async getAllUsers() {
    return await this.prisma.user.findMany();
  }


  public async delete() {
    return await this.prisma.user.deleteMany();
  }
}
