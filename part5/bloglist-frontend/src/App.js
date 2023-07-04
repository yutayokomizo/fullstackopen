import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import userService from './services/users';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem('loginUser');
    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

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
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
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
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      {user === null ? (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <CreateBlogForm
            setSuccessMessage={setSuccessMessage}
            afterCreate={setBlogs}
          />
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} afterUpdate={setBlogs} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
