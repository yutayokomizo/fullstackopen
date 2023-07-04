import { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlogForm = ({ setSuccessMessage }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const hideWhenVisible = { display: formVisible ? 'none' : '' };
  const showWhenVisible = { display: formVisible ? '' : 'none' };

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
    setFormVisible(false);
  };

  return (
    <>
      <div style={showWhenVisible}>
        <h3>create new</h3>
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
        <button onClick={() => setFormVisible(false)}>cancel</button>
      </div>
      <button style={hideWhenVisible} onClick={() => setFormVisible(true)}>
        new note
      </button>
    </>
  );
};

export default CreateBlogForm;
