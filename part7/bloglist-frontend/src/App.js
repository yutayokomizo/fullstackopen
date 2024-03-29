import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Routes, Route } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import Blog from './components/Blog';
import blogService from './services/blogs';
import userService from './services/login';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import { useNotificationDispatch } from './NotificationContext';
import { useLoginUserDispatch, useLoginUserValue } from './LoginUserContext';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import BlogDetail from './components/BlogDetail';
import Navbar from './components/Navbar';

const HomeContent = () => {
  const results = useQuery('blogs', blogService.getAll);

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  const blogs = results.data;
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return (
    <>
      <CreateBlogForm />
      <Table>
        <tbody>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

const App = () => {
  const results = useQuery('blogs', blogService.getAll);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useNotificationDispatch();
  const userDispatch = useLoginUserDispatch();
  const userValue = useLoginUserValue();

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem('loginUser');
    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON);
      blogService.setToken(user.token);
      userDispatch({ type: 'SET', payload: user });
    }
  }, []);

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await userService.login({
        username,
        password,
      });
      window.localStorage.setItem('loginUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: 'SET', payload: user });
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch({
        type: 'SET',
        payload: { type: 'error', message: 'wrong username or password' },
      });
      setTimeout(() => {
        dispatch({ type: 'REMOVE' });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loginUser');
    userDispatch({ type: 'REMOVE' });
  };

  return (
    <div>
      <Navbar user={userValue} handleLogout={handleLogout} />
      <div className='container'>
        <h2>blogs</h2>
        <Notification />
        {userValue === null ? (
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                id='username'
                type='text'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                id='password'
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button id='register' type='submit'>
              login
            </button>
          </form>
        ) : (
          <div>
            <Routes>
              <Route path='/' element={<HomeContent />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id' element={<UserDetail />} />
              <Route path='/blogs/:id' element={<BlogDetail />} />
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
