import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from '@prisma/client';
import { prisma } from '../src/prisma/__mocks__/prisma-client';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user: User;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    user = await prisma.user.create({
      data: {
        name: 'Matheus da Costa',
        email: 'matheus@gmail.com',
        password: 'password',
      },
    });

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should return the user', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/users')
      .expect(200);

    expect(JSON.parse(response.text)).toMatchObject([user]);
  });
});
