import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import userService from './services/users';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    const data = await blogService.create({ title, author, url });
    setSuccessMessage(`a new blog ${data.title} by ${data.author} added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    setTitle('');
    setAuthor('');
    setUrl('');
    console.log(data);
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={handleBlogCreate}>
        <div>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    );
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
          <h3>create new</h3>
          {createBlogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
