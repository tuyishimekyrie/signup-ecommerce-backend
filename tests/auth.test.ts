import request from 'supertest';
import { configureApp } from '../src/server';
import { describe, expect, it } from '@jest/globals';

const app = configureApp(); // Replace with your app entry point

describe('POST /api/v1/auth/forgot-password', () => {
  it('should return a 400 error for an empty email', async () => {
    const response = await request(app)
      .post('/api/v1/auth/forgot-password')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return a 400 error for an invalid email', async () => {
    const response = await request(app)
      .post('/api/v1/auth/forgot-password')
      .send({ email: 'invalidEmail' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
