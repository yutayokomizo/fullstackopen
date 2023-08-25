import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const showWhenVisible = { display: detailVisible ? '' : 'none' };
  const hideWhenVisible = { display: detailVisible ? 'none' : '' };

  const loginUser = JSON.parse(window.localStorage.getItem('loginUser'));
  const isOwner = blog.user && blog.user.username === loginUser.username;

  const queryClient = useQueryClient();
  const likeMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const removeMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const handleLike = async () => {
    likeMutation.mutate({
      blogId: blog.id,
      data: {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      },
    });
  };

  const handleRemove = async () => {
    const isApproved = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (isApproved) {
      removeMutation.mutate(blog.id);
    }
  };

  return (
    <div
      className='blog'
      style={{
        border: '1px solid black',
        padding: '4px 10px',
        marginBottom: '4px',
      }}
    >
      <div className='summary-div'>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={() => setDetailVisible(true)}>
          view
        </button>
        <button style={showWhenVisible} onClick={() => setDetailVisible(false)}>
          hide
        </button>
      </div>
      <div style={showWhenVisible} className='hidden-div'>
        <p>{blog.url}</p>
        <div id='like-count'>
          {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <p>{blog.author}</p>
        {isOwner && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  afterUpdate: PropTypes.func.isRequired,
};

export default Blog;
