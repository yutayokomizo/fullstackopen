const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);

const getLoginToken = async () => {
  // Create user
  await api.post('/api/users').send({
    username: 'test',
    name: 'test',
    password: 'password',
  });

  // Login
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'test', password: 'password' });
  const { token } = loginResponse.body;

  return token;
};

module.exports = { getLoginToken };
