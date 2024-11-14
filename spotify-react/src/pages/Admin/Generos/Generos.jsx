import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const ListaGeneros = () => {
    const [generos, setGeneros] = useState([]);
    const [filteredGeneros, setFilteredGeneros] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getListaGeneros();
        document.title = "Lista de Géneros";
    }, []);

    const getListaGeneros = () => {
        axios.get('http://localhost:3000/generos')
            .then(res => {
                setGeneros(res.data);
                setFilteredGeneros(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el género?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/generos/${id}`)
            .then(() => {
                getListaGeneros();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const busqueda = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = generos.filter(genero =>
            genero.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredGeneros(filtered);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Lista de Géneros</h2>
                            <Form.Control
                                className="busqueda"
                                type="text"
                                placeholder="Buscar por nombre"
                                value={search}
                                onChange={busqueda}
                                style={{ maxWidth: '650px' }}
                            />
                            <Button as={Link} to="/generos/crear" className="btn-Genero">
                                <i className="fas fa-plus me-2"></i> Agregar Género
                            </Button>
                        </div>
 
                        <Row>
                            {filteredGeneros.map((genero) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={genero.id} className="mb-4">
                                    <Card className="perfil-card fold-Genero text-center">
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3000/uploads/genero/${genero.id}.jpg`}
                                            className="img-fluid img-Genero"
                                        />
                                        <Card.Body>
                                            <Card.Title className="nombre mb-3">{genero.nombre}</Card.Title>
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    as={Link}
                                                    to={`/generos/${genero.id}/editar`}
                                                    className="me-2 btn-Genero"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Button>
                                                <Button
                                                    className="btn-Genero"
                                                    onClick={() => eliminar(genero.id)}
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

export default ListaGeneros;
