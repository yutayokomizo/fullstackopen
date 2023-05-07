const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne({});

  const blog = new Blog({ likes: 0, ...request.body, user: user._id });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  return response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
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
