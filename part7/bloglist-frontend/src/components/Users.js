import { useQuery } from 'react-query';
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
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
