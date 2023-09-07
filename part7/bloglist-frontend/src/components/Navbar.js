import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const NavbarComponent = ({ user, handleLogout }) => {
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
    <Navbar>
      <Container>
        <Nav>
          {links.map((link) => (
            <Nav.Link key={link.to} to={link.to}>
              {link.text}
            </Nav.Link>
          ))}
        </Nav>
        {user !== null && (
          <div className='ms-auto'>
            <Navbar.Text className='m-2'>{user.name} logged in</Navbar.Text>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
