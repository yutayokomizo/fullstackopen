import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
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
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
