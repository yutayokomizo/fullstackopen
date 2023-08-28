import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import userService from '../services/users';

const Users = () => {
  const results = useQuery('users', userService.getAll);

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  const users = results.data;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
