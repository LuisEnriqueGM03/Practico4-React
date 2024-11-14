import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const ListaCanciones = () => {
    const [canciones, setCanciones] = useState([]);
    const [filteredCanciones, setFilteredCanciones] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getListaCanciones();
        document.title = "Lista de Canciones";
    }, []);

    const getListaCanciones = () => {
        axios.get('http://localhost:3000/canciones')
            .then(res => {
                setCanciones(res.data);
                setFilteredCanciones(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar la canción?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/canciones/${id}`)
            .then(() => {
                getListaCanciones();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const busqueda = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = canciones.filter(cancion =>
            cancion.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCanciones(filtered);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Lista de Canciones</h2>
                            <Form.Control
                                className="busqueda"
                                type="text"
                                placeholder="Buscar por nombre"
                                value={search}
                                onChange={busqueda}
                                style={{ maxWidth: '650px' }}
                            />
                            <Button as={Link} to="/canciones/crear" className="btn-Cancion">
                                <i className="fas fa-plus me-2"></i> Agregar Canción
                            </Button>
                        </div>

                        <Row>
                            {filteredCanciones.map((cancion) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={cancion.id} className="mb-4">
                                    <Card className="perfil-card fold-Genero text-center">
                                        <audio controls className="w-100 mt-3">
                                            <source src={`http://localhost:3000/uploads/cancion/${cancion.id}.mp3`} type="audio/mpeg" />
                                        </audio>
                                        <Card.Body>
                                            <Card.Title className="nombre mb-3">{cancion.nombre}</Card.Title>
                                            {cancion.idAlbum && (
                                                <Card.Text className="txt-Cancion">
                                                    {cancion.idAlbum.nombre}
                                                </Card.Text>
                                            )}
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    as={Link}
                                                    to={`/canciones/${cancion.id}/editar`}
                                                    className="me-2 btn-Cancion"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Button>
                                                <Button
                                                    className="btn-genero"
                                                    onClick={() => eliminar(cancion.id)}
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

export default ListaCanciones;
