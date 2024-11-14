import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const ListaArtistas = () => {
    const [artistas, setArtistas] = useState([]);
    const [filteredArtistas, setFilteredArtistas] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getListaArtistas();
        document.title = "Lista de Artistas";
    }, []);

    const getListaArtistas = () => {
        axios.get('http://localhost:3000/artistas')
            .then(res => {
                setArtistas(res.data);
                setFilteredArtistas(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el artista?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/artistas/${id}`)
            .then(() => {
                getListaArtistas();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const busqueda = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = artistas.filter(artista =>
            artista.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredArtistas(filtered);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Lista de Artistas</h2>
                            <Form.Control
                                className="busqueda"
                                type="text"
                                placeholder="Buscar por nombre"
                                value={search}
                                onChange={busqueda}
                                style={{ maxWidth: '650px' }}
                            />
                            <Button as={Link} to="/artistas/crear" className="btn-Artista">
                                <i className="fas fa-plus me-2"></i> Agregar Artista
                            </Button>
                        </div>

                        <Row>
                            {filteredArtistas.map((artista) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={artista.id} className="mb-4">
                                    <Card className="perfil-card fold-Artista text-center">
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3000/uploads/artista/${artista.id}.jpg`}
                                            className="img-fluid img-Artista"
                                            style={{ height: '230px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Title className="nombre mb-3">{artista.nombre}</Card.Title>
                                            {artista.idGenero && (
                                                <Card.Text className=" txt-artista">
                                                {artista.idGenero.nombre}
                                                </Card.Text>
                                            )}
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    as={Link}
                                                    to={`/artistas/${artista.id}/editar`}
                                                    className="me-2 btn-Artista"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Button>
                                                <Button
                                                    className="btn-Artista"
                                                    onClick={() => eliminar(artista.id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ListaArtistas;
