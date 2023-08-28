import { useQuery } from 'react-query';
import { useMatch } from 'react-router-dom';

import userService from '../services/users';

const UserDetail = () => {
  const match = useMatch('/users/:id');
  const id = match.params.id;

  const results = useQuery('users', userService.getAll);

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  const { blogs, name } = results.data.find((user) => user.id === id);

  return (
    <div>
      <h2>{name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
