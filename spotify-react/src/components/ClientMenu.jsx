import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ClientMenu = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery.trim()) {
                try {
                    const response = await axios.get(`http://localhost:3000/busqueda?termino=${searchQuery}`);
                    setSuggestions(response.data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleSuggestionClick = async (type, id) => {
        try {
            let artistaId;
            let fragment = "";

            if (type === "album") {
                const response = await axios.get(`http://localhost:3000/albums/${id}`);
                artistaId = response.data.idArtista.id;
                fragment = `#album-${id}`;
            } else if (type === "cancion") {
                const albumResponse = await axios.get(`http://localhost:3000/canciones/${id}`);
                const albumId = albumResponse.data.idAlbum.id;

                const artistaResponse = await axios.get(`http://localhost:3000/albums/${albumId}`);
                artistaId = artistaResponse.data.idArtista.id;
                fragment = `#cancion-${id}`;
            } else {
                artistaId = id;
            }

            navigate(`/artista/detalle/${artistaId}${fragment}`);
            setSearchQuery('');
            setSuggestions([]);
            window.location.reload();
        } catch (error) {
            console.error("Error fetching artist details:", error);
        }
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="title-2">Spotify 🎵</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Form className="d-flex position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Buscar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="me-2 busqueda"
                        />
                        {suggestions && (suggestions.artistas?.length > 0 || suggestions.albums?.length > 0 || suggestions.canciones?.length > 0) && (
                            <div className="suggestions-list position-absolute bg-dark w-100">
                                {suggestions.artistas?.map(artista => (
                                    <div 
                                        key={`artista-${artista.id}`} 
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick("artista", artista.id)}
                                    >
                                        {artista.nombre} (Artista)
                                    </div>
                                ))}
                                {suggestions.albums?.map(album => (
                                    <div 
                                        key={`album-${album.id}`} 
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick("album", album.id)}
                                    >
                                        {album.nombre} (Álbum)
                                    </div>
                                ))}
                                {suggestions.canciones?.map(cancion => (
                                    <div 
                                        key={`cancion-${cancion.id}`} 
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick("cancion", cancion.id)}
                                    >
                                        {cancion.nombre} (Canción)
                                    </div>
                                ))}
                            </div>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default ClientMenu;
