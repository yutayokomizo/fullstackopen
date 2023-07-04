import { useState } from 'react';

const Blog = ({ blog }) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const showWhenVisible = { display: detailVisible ? '' : 'none' };
  const hideWhenVisible = { display: detailVisible ? 'none' : '' };

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
          {blog.likes} <button>like</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
