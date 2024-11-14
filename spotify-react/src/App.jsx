import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom";
import ClientMenu from "./components/ClientMenu.jsx";

const ListaGeneros = () => {
    const [generos, setGeneros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getListaGeneros();
        document.title = "Lista de Géneros";
    }, []);

    const getListaGeneros = () => {
        axios.get('http://localhost:3000/generos')
            .then(res => setGeneros(res.data))
            .catch(error => console.log(error));
    };

    const handleCardClick = (id) => {
        navigate(`/genero/detalle/${id}`);
    };

    return (
        <>
            <ClientMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big-init">
                    <Card.Body>
                        <h2 className="text-center mb-4">Lista de Géneros</h2>
                        <Row>
                            {generos.map((genero) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={genero.id} className="mb-4">
                                    <Card
                                        className="perfil-card fold-Genero-init text-center"
                                        onClick={() => handleCardClick(genero.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3000/uploads/genero/${genero.id}.jpg`}
                                            className="img-fluid img-Genero-init"
                                            style={{ height: '230px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Title className="nombre mb-3">{genero.nombre}</Card.Title>
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
