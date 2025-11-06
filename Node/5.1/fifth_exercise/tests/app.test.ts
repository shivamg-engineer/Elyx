import request from 'supertest';
import app from '../src/app';

describe('Route tests', () => {
  it('GET /ping returns 200', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'pong' });
  });

  it('GET /error returns 500', async () => {
    const res = await request(app).get('/error');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Something went wrong' });
  });

  it('GET /notfound returns 404', async () => {
    const res = await request(app).get('/notfound');
    expect(res.status).toBe(404);
  });
});
