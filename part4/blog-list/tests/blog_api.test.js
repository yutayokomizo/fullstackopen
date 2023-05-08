const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const { getLoginToken } = require('./test_helper');

const api = supertest(app);

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test('GET /api/blogs response in JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('GET /api/blogs returns correct amount of blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

test('id field is included in the response', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('POST /api/blogs successfully saves', async () => {
  const initialResponse = await api.get('/api/blogs');

  const token = await getLoginToken();

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Post test',
      author: 'Yuta Yokomizo',
      url: 'https://yutayokomizo.com',
      likes: 0,
    })
    .expect(201);

  const responseAfterCreate = await api.get('/api/blogs');

  expect(responseAfterCreate.body).toHaveLength(
    initialResponse.body.length + 1,
  );

  const titles = responseAfterCreate.body.map((blog) => blog.title);
  expect(titles).toContain('Post test');
});

test('Default value of 0 is added when likes is missing on creating a blog', async () => {
  const token = await getLoginToken();

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Missing likes',
      author: 'Yuta Yokomizo',
      url: 'https://yutayokomizo.com',
    })
    .expect(201);

  expect(response.body.likes).toBe(0);
});

test('Missing title or url on new blog returns 400 error', async () => {
  const token = await getLoginToken();

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      author: 'Yuta Yokomizo',
      url: 'https://yutayokomizo.com',
    })
    .expect(400);

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Missing likes',
      author: 'Yuta Yokomizo',
    })
    .expect(400);
});

test('DELETE specific blog works', async () => {
  // create a blog
  const token = await getLoginToken();

  const createBlogResponse = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Post test',
      author: 'Yuta Yokomizo',
      url: 'https://yutayokomizo.com',
      likes: 0,
    });

  const deletingId = createBlogResponse.body.id;

  await api
    .delete(`/api/blogs/${deletingId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  const blogsInDb = await api.get('/api/blogs');
  const ids = blogsInDb.body.map((blog) => blog.id);

  expect(ids).not.toContain(deletingId);
});

test('PUT specific blog updates existing post', async () => {
  const updatingId = '5a422aa71b54a676234d17f8';

  const updatedBlog = await api.put(`/api/blogs/${updatingId}`).send({
    title: 'Updated post',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  });

  expect(updatedBlog.body.title).toBe('Updated post');
});

afterAll(async () => {
  await mongoose.connection.close();
});
