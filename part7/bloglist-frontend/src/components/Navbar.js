import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const links = [
    {
      to: '/',
      text: 'blogs',
    },
    {
      to: '/users',
      text: 'users',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#ccc',
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
      }}
    >
      {links.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.text}
        </Link>
      ))}
      {user !== null && (
        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
