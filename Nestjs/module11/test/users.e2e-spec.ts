import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request  from 'supertest';
import { AppModule } from 'src/app.module';


describe('UsersController (e2e)', () => {
  let app: INestApplication;
      beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/users')
      .expect(200)
      .expect([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});