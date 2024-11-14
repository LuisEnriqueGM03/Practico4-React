import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ClientMenu from "../../components/ClientMenu.jsx";

const GeneroDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genero, setGenero] = useState(null);
    const [filteredArtistas, setFilteredArtistas] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getGeneroById();
    }, [id]);

    const getGeneroById = () => {
        axios.get(`http://localhost:3000/generos/${id}`)
            .then(res => {
                setGenero(res.data);
                setFilteredArtistas(res.data.artistas);
            })
            .catch(error => console.log(error));
    };

    const onSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        setFilteredArtistas(
            genero.artistas.filter(artista =>
                artista.nombre.toLowerCase().includes(value)
            )
        );
    };

    const handleCardClick = (artistaId) => {
        navigate(`/artista/detalle/${artistaId}`);
    };

    return (
        <>
            <ClientMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big-init">
                    <Card.Body>
                        {genero && (
                            <>
                                <Row className="justify-content-center mb-4">
                                    <Col xs={12} md={8}>
                                        <div className="fold-detail-container">
                                            <img
                                                src={`http://localhost:3000/uploads/genero/${genero.id}.jpg`}
                                                alt="Imagen del género"
                                                className="fold-detail-img"
                                            />
                                            <div className="fold-detail-name">
                                                <h4 className="title-Genero-detail">{genero.nombre}</h4>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Card className="p-4 fold-big-detail">
                                    <Card.Body>
                                        <h2 className="text-center mb-4 title">Artistas</h2>
                                        <Row className="justify-content-center mb-4">
                                            <Col xs={12} md={8}>
                                                <Form.Control
                                                className="busqueda-detail mb-4"
                                                    type="text"
                                                    placeholder="Buscar artista"
                                                    value={search}
                                                    onChange={onSearchChange}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            {filteredArtistas.map(artista => (
                                                <Col xs={12} sm={6} md={4} lg={3} key={artista.id} className="mb-4">
                                                    <Card
                                                        className="perfil-card fold-Genero-init text-center" 
                                                        onClick={() => handleCardClick(artista.id)}
                                                    >
                                                        <Card.Img
                                                            variant="top"
                                                            src={`http://localhost:3000/uploads/artista/${artista.id}.jpg`}
                                                            className="img-fluid img-Genero-init"
                                                            style={{ height: '250px', objectFit: 'cover' }}
                                                        />
                                                        <Card.Body>
                                                            <Card.Title className="nombre mb-3">{artista.nombre}</Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default GeneroDetalle;
