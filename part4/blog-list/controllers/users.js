const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is missing' });
  }

  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: 'Minimum of length 3 required for password' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  res.status(200).json(users);
});

module.exports = usersRouter;
