import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useNotificationDispatch } from '../NotificationContext';

const CreateBlogForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const createMutation = useMutation(blogService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs');
      dispatch({
        type: 'SET',
        payload: {
          type: 'success',
          message: `a new blog ${data.title} by ${data.author} added`,
        },
      });
      setTimeout(() => {
        dispatch({ type: 'REMOVE' });
      }, 5000);
    },
  });

  const hideWhenVisible = { display: formVisible ? 'none' : '' };
  const showWhenVisible = { display: formVisible ? '' : 'none' };

  const handleBlogCreate = async (event) => {
    event.preventDefault();

    createMutation.mutate({ title, author, url });

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
              placeholder='title'
              id='title'
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder='author'
              id='author'
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder='url'
              id='url'
            />
          </div>
          <button id='create-button' type='submit'>
            create
          </button>
        </form>
        <button onClick={() => setFormVisible(false)}>cancel</button>
      </div>
      <button
        id='new-note'
        style={hideWhenVisible}
        onClick={() => setFormVisible(true)}
      >
        new note
      </button>
    </>
  );
};

export default CreateBlogForm;
