import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Blog from './components/Blog';
import blogService from './services/blogs';
import userService from './services/users';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const results = useQuery('blogs', blogService.getAll);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const dispatch = useNotificationDispatch();

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem('loginUser');
    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  const blogs = results.data;
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await userService.login({
        username,
        password,
      });
      window.localStorage.setItem('loginUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
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
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
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
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <CreateBlogForm />
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
