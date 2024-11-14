import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';
import NavMenu from '../../components/NavMenu.jsx';

const Dashboard = () => {
    return (
        <>
            <NavMenu />

            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
                <h1 className="mb-5 text-center">Dashboard Administrador</h1>
                <Row className="justify-content-center" style={{ width: '100%' }}>
                    <Col md={3} className="mb-4">
                        <Link to="/generos" className="text-decoration-none">
                            <Card className="text-center fold-dash" style={{ height: '300px', cursor: 'pointer' }}>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className="title">Géneros</Card.Title>
                                    <i className="fas fa-list fa-8x mb-5"></i>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Link to="/artistas" className="text-decoration-none">
                            <Card className="text-center fold-dash" style={{ height: '300px', cursor: 'pointer' }}>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className="title">Artistas</Card.Title>
                                    <i className="fas fa-user fa-8x mb-5"></i>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Link to="/albumes" className="text-decoration-none">
                            <Card className="text-center fold-dash" style={{ height: '300px', cursor: 'pointer' }}>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className="title">Álbumes</Card.Title>
                                    <i className="fas fa-compact-disc fa-8x mb-5"></i>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Link to="/canciones" className="text-decoration-none">
                            <Card className="text-center fold-dash" style={{ height: '300px', cursor: 'pointer' }}>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className="title">Canciones</Card.Title>
                                    <i className="fas fa-music fa-8x mb-5"></i>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
