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

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const requestedBlog = await Blog.findById(request.params.id);
  const user = requestedBlog.user;

  if (!requestedBlog) {
    return response
      .status(404)
      .json({ error: 'Requested blog does not exist' });
  }

  if (user && user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'User invalid' });
  }

  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user: user._id },
    { new: true },
  );

  response.status(201).json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const requestedBlog = await Blog.findById(request.params.id);

  if (!requestedBlog) {
    return response
      .status(404)
      .json({ error: 'Requested blog does not exist' });
  }

  const { comment } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { comments: [...requestedBlog.comments, comment] },
    { new: true },
  );

  response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
