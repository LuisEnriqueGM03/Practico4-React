import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ClientMenu from "../../components/ClientMenu.jsx";

const ArtistaDetalle = () => {
    const { id } = useParams();
    const [artista, setArtista] = useState(null);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [search, setSearch] = useState("");
    const [expandedAlbumId, setExpandedAlbumId] = useState(null);
    const [albumCanciones, setAlbumCanciones] = useState([]);
    const [audioVisibleId, setAudioVisibleId] = useState(null);

    useEffect(() => {
        getArtistaById();
    }, [id]);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const [type, itemId] = hash.slice(1).split("-");
            if (type === "album") {
                toggleAlbumSongs(Number(itemId), true);
            } else if (type === "cancion") {
                buscarYExpandirCancion(Number(itemId));
            }
        }
    }, [artista, filteredAlbums]);

    const getArtistaById = () => {
        axios.get(`http://localhost:3000/artistas/${id}`)
            .then(res => {
                setArtista(res.data);
                setFilteredAlbums(res.data.albums);
            })
            .catch(error => console.log(error));
    };

    const getAlbumById = (albumId) => {
        return axios.get(`http://localhost:3000/albums/${albumId}`)
            .then(res => {
                setAlbumCanciones(res.data.canciones);
                setExpandedAlbumId(albumId);
                return res.data.canciones;
            })
            .catch(error => console.log(error));
    };

    const onSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        setFilteredAlbums(
            artista.albums.filter(album =>
                album.nombre.toLowerCase().includes(value)
            )
        );
    };

    const toggleAlbumSongs = async (albumId, smoothScroll = false) => {
        if (expandedAlbumId === albumId) {
            setExpandedAlbumId(null);
            setAlbumCanciones([]);
            setAudioVisibleId(null);
        } else {
            await getAlbumById(albumId);
            if (smoothScroll) {
                document.getElementById(`album-${albumId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleSongClick = (cancionId) => {
        setAudioVisibleId(audioVisibleId === cancionId ? null : cancionId);
    };

    const buscarYExpandirCancion = async (cancionId) => {
        for (const album of filteredAlbums) {
            const canciones = await getAlbumById(album.id);
            const cancionEncontrada = canciones.find(cancion => cancion.id === cancionId);

            if (cancionEncontrada) {
                setExpandedAlbumId(album.id);
                setAudioVisibleId(cancionId);
                setTimeout(() => {
                    document.getElementById(`cancion-${cancionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
                break;
            }
        }
    };

    return (
        <>
            <ClientMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big-init">
                    <Card.Body>
                        {artista && (
                            <>
                                <Row className="justify-content-center mb-4">
                                    <Col xs={12} md={8}>
                                        <div className="fold-detail-container">
                                            <img
                                                src={`http://localhost:3000/uploads/artista/${artista.id}.jpg`}
                                                alt="Imagen del artista"
                                                className="fold-detail-img"
                                            />
                                            <div className="fold-detail-name">
                                                <h4 className="title-Genero-detail">{artista.nombre}</h4>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Card className="p-4 fold-big-detail">
                                    <Card.Body>
                                        <h2 className="text-center mb-4 title">Albums</h2>
                                        <Row className="justify-content-center mb-4">
                                            <Col xs={12} md={8}>
                                                <Form.Control
                                                    className="busqueda-detail mb-4"
                                                    type="text"
                                                    placeholder="Buscar álbum"
                                                    value={search}
                                                    onChange={onSearchChange}
                                                />
                                            </Col>
                                        </Row>
                                        {filteredAlbums.map(album => (
                                            <div id={`album-${album.id}`} key={album.id} className="mb-4">
                                                <Card 
                                                    className="album-detail w-100" 
                                                    onClick={() => toggleAlbumSongs(album.id)}
                                                >
                                                    <Card.Body className="album-option w-100">
                                                        <img
                                                            src={`http://localhost:3000/uploads/album/${album.id}.jpg`}
                                                            alt={`Imagen del álbum ${album.nombre}`}
                                                            className="img-fluid img-Genero-init"
                                                            style={{ height: '150px', width: '150px', objectFit: 'cover' }}
                                                        />
                                                        <Card.Title className="title mb-3">{album.nombre}</Card.Title>
                                                    </Card.Body>
                                                </Card>
                                                {expandedAlbumId === album.id && (
                                                    <div className="mt-3">
                                                        <h5 className="text-center">Canciones</h5>
                                                        {albumCanciones.length > 0 ? (
                                                            albumCanciones.map(cancion => (
                                                                <div
                                                                    id={`cancion-${cancion.id}`}
                                                                    key={cancion.id}
                                                                    className="cancion-item mb-2"
                                                                    onClick={() => handleSongClick(cancion.id)}
                                                                    style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#303030', borderRadius: '5px' }}
                                                                >
                                                                    <span className="cancion-title">{cancion.nombre}</span>
                                                                    {audioVisibleId === cancion.id && (
                                                                        <div className="cancion-audio-container mt-2">
                                                                            <audio controls className="w-100">
                                                                                <source src={`http://localhost:3000/uploads/cancion/${cancion.id}.mp3`} type="audio/mpeg" />
                                                                            </audio>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="no-music-message">
                                                                Sin música disponible
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
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

export default ArtistaDetalle;
