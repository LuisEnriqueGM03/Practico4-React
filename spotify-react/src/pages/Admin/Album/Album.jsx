import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const ListaAlbumes = () => {
    const [albumes, setAlbumes] = useState([]);
    const [filteredAlbumes, setFilteredAlbumes] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getListaAlbumes();
        document.title = "Lista de Álbumes";
    }, []);

    const getListaAlbumes = () => {
        axios.get('http://localhost:3000/albums')
            .then(res => {
                setAlbumes(res.data);
                setFilteredAlbumes(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el álbum?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/albums/${id}`)
            .then(() => {
                getListaAlbumes();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const busqueda = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = albumes.filter(album =>
            album.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredAlbumes(filtered);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Lista de Álbumes</h2>
                            <Form.Control
                                className="busqueda"
                                type="text"
                                placeholder="Buscar por nombre"
                                value={search}
                                onChange={busqueda}
                                style={{ maxWidth: '650px' }}
                            />
                            <Button as={Link} to="/albumes/crear" className="btn-Album">
                                <i className="fas fa-plus me-2"></i> Agregar Álbum
                            </Button>
                        </div>

                        <Row>
                            {filteredAlbumes.map((album) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={album.id} className="mb-4">
                                    <Card className="perfil-card fold-Album text-center">
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3000/uploads/album/${album.id}.jpg`}
                                            className="img-fluid img-Album"
                                            style={{ height: '230px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Title className="nombre mb-3">{album.nombre}</Card.Title>
                                            {album.idArtista && (
                                                <Card.Text className="txt-Album">
                                                {album.idArtista.nombre}
                                                </Card.Text>
                                            )}
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    as={Link}
                                                    to={`/albumes/${album.id}/editar`}
                                                    className="me-2 btn-Album"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Button>
                                                <Button
                                                    className="btn-Album"
                                                    onClick={() => eliminar(album.id)}
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

export default ListaAlbumes;
