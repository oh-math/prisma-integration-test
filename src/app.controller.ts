import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users')
  public async create(
    @Body() data: { name: string; email: string; password: string },
  ) {
    return this.appService.create(data);
  }

  @Get('users/:id')
  public async getUser (@Param() id: string) {
    return this.appService.getUser(id)
  }

  @Get('users')
  public async getAll () {
    return this.appService.getAllUsers()
  }

  @Delete('users')
  public async delete () {
    return this.appService.delete()
  }
}
