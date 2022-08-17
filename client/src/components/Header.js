import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/auth';

const Header = () => {
    const auth = useAuth();
    const username = auth.isLogIn.username;

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Welcome {username}</Navbar.Brand>
                {/* <Navbar.Brand href="/login">Logout</Navbar.Brand> */}
            </Container>
        </Navbar>
    );
};

export default Header;