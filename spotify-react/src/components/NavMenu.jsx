import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">Dashboard Administrador</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Dashboard">Inicio</Nav.Link>

                        <NavDropdown title="Género" id="genero-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/generos">Lista de Géneros</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/generos/crear">Crear Género</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Artista" id="artista-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/artistas">Lista de Artistas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/artistas/crear">Crear Artista</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Álbum" id="album-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/albumes">Lista de Álbumes</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/albumes/crear">Crear Álbum</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Canción" id="cancion-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/canciones">Lista de Canciones</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/canciones/crear">Crear Canción</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavMenu;
