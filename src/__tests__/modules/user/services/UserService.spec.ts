import { Connection } from 'typeorm';
import request from 'supertest';
import app from '../../../../app';
import { connect } from '../../../../utils/tests/createConnection';

interface Response {
  body: {
    name: string;
    deleted_at: string | null;
    id: number;
    created_at: string;
    updated_at: string;
  };
  status: number;
}

let connection: Connection;

beforeAll(async () => {
  connection = await connect();
});

describe('UserService', () => {
  it('should create', async () => {
    const response: Response = await request(app)
      .post('/users')
      .send({ name: 'test' });

    expect(response.status).toBe(200);
  });

  it('should update', async () => {
    const createResponse: Response = await request(app)
      .post('/users')
      .send({ name: 'test-update-create' });

    const updateResponse: Response = await request(app)
      .put(`/users/${createResponse.body.id}`)
      .send({ name: 'test-update' });

    expect(updateResponse.status).toBe(200);
  });

  it('should delete', async () => {
    const createResponse: Response = await request(app)
      .post('/users')
      .send({ name: 'test-delete-create' });

    const deleteResponse: Response = await request(app).delete(
      `/users/${createResponse.body.id}`
    );

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.deleted_at).toBeTruthy();
  });
});

afterAll(() => connection.close());
