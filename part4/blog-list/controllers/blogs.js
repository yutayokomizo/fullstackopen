const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({ likes: 0, ...request.body });

  const result = await blog.save();

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
