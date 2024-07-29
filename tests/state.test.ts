import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/user';
import State from '../src/models/state';

let token: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await State.deleteMany({});

  const user = new User({ username: 'testuser', password: 'password' });
  await user.save();

  const res = await request(app).post('/api/users/login').send({ username: 'testuser', password: 'password' });
  token = res.body.token;
});

describe('State API', () => {
  it('should create a state', async () => {
    const res = await request(app)
      .post('/api/states')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Idle',
        description: 'Robot is idle',
        status: 'inactive'
      });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Idle');
  });

  it('should get all states', async () => {
    await new State({ name: 'Idle', description: 'Robot is idle', status: 'inactive', createdBy: 'testuser' }).save();
    const res = await request(app)
      .get('/api/states')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('should update a state', async () => {
    const state = await new State({ name: 'Idle', description: 'Robot is idle', status: 'inactive', createdBy: 'testuser' }).save();
    const res = await request(app)
      .put(`/api/states/${state._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Robot is now idle' });
    expect(res.status).toBe(200);
    expect(res.body.description).toBe('Robot is now idle');
  });

  it('should delete a state', async () => {
    const state = await new State({ name: 'Idle', description: 'Robot is idle', status: 'inactive', createdBy: 'testuser' }).save();
    const res = await request(app)
      .delete(`/api/states/${state._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('State deleted');
  });
});
