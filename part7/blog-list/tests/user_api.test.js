const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

test('Successfully create user with valid inputs', async () => {
  const response = await api
    .post('/api/users')
    .send({
      name: 'test',
      password: 'password',
      username: 'test',
    })
    .expect(201);

  expect(response.body.username).toBe('test');

  const usersAfterRequest = await User.find({});
  const usernames = usersAfterRequest.map((user) => user.username);

  expect(usersAfterRequest.length).toBe(1);
  expect(usernames).toContain('test');
});

test('Create user fails when username is missing', async () => {
  const response = await api
    .post('/api/users')
    .send({
      name: 'test',
      password: 'password',
    })
    .expect(400);

  expect(response.body.error).toBeDefined();

  const usersAfterRequest = await User.find({});
  expect(usersAfterRequest.length).toBe(0);
});

test('Create user fails when username is too short', async () => {
  const response = await api
    .post('/api/users')
    .send({
      name: 'test',
      password: 'password',
      username: 'ab',
    })
    .expect(400);

  expect(response.body.error).toBeDefined();

  const usersAfterRequest = await User.find({});
  expect(usersAfterRequest.length).toBe(0);
});

test('Create user fails when username already exists', async () => {
  await api
    .post('/api/users')
    .send({
      name: 'test',
      password: 'password',
      username: 'test',
    })
    .expect(201);

  const response = await api
    .post('/api/users')
    .send({
      name: 'test',
      password: 'password',
      username: 'test',
    })
    .expect(400);

  expect(response.body.error).toBeDefined();

  const usersAfterRequest = await User.find({});
  expect(usersAfterRequest.length).toBe(1);
});

test('Create user fails when password is missing', async () => {
  const response = await api
    .post('/api/users')
    .send({
      name: 'string',
      username: 'test',
    })
    .expect(400);

  expect(response.body.error).toBeDefined();

  const usersAfterRequest = await User.find({});
  expect(usersAfterRequest.length).toBe(0);
});

test('Create user fails when password is too short', async () => {
  const response = await api
    .post('/api/users')
    .send({
      name: 'test',
      password: 'pa',
      username: 'test',
    })
    .expect(400);

  expect(response.body.error).toBeDefined();

  const usersAfterRequest = await User.find({});
  expect(usersAfterRequest.length).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
