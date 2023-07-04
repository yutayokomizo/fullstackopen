import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, afterUpdate }) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const showWhenVisible = { display: detailVisible ? '' : 'none' };
  const hideWhenVisible = { display: detailVisible ? 'none' : '' };

  const handleLike = async () => {
    await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });

    const blogs = await blogService.getAll();
    afterUpdate(blogs);
  };

  const handleRemove = async () => {
    const isApproved = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (isApproved) {
      await blogService.remove(blog.id);

      const blogsAfterRemove = await blogService.getAll();
      afterUpdate(blogsAfterRemove);
    }
  };

  return (
    <div
      style={{
        border: '1px solid black',
        padding: '4px 10px',
        marginBottom: '4px',
      }}
    >
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={() => setDetailVisible(true)}>
          view
        </button>
        <button style={showWhenVisible} onClick={() => setDetailVisible(false)}>
          hide
        </button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <p>{blog.author}</p>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
