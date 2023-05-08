const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  return response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user;

  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: user._id,
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  return response.status(201).json(result);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const requestedBlog = await Blog.findById(request.params.id);

  if (!requestedBlog) {
    return response
      .status(404)
      .json({ error: 'Requested blog does not exist' });
  }

  if (
    requestedBlog.user &&
    requestedBlog.user.toString() !== request.user._id.toString()
  ) {
    return response.status(403).json({ error: 'User invalid' });
  }

  await Blog.deleteOne({ _id: request.params.id });

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true },
  );

  response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
