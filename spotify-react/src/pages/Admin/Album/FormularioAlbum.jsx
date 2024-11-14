import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [idArtista, setIdArtista] = useState('');
    const [foto, setFoto] = useState(null);
    const [artistas, setArtistas] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getListaArtistas();
        if (id) {
            getAlbumById();
        }
    }, [id]);

    const getListaArtistas = () => {
        axios.get('http://localhost:3000/artistas')
            .then(res => setArtistas(res.data))
            .catch(error => console.log(error));
    };

    const getAlbumById = () => {
        axios.get(`http://localhost:3000/albums/${id}`)
            .then(res => {
                const album = res.data;
                setNombre(album.nombre);
                setIdArtista(album.idArtista.id);
            })
            .catch(error => console.log(error));
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const album = { nombre, idArtista };

        if (id) {
            editAlbum(album);
        } else {
            insertAlbum(album);
        }
    };

    const editAlbum = (album) => {
        axios.put(`http://localhost:3000/albums/${id}`, album)
            .then(res => {
                console.log("Álbum actualizado:", res.data);
                if (foto) guardarFoto(id);
                else navigate('/albumes');
            })
            .catch(error => console.log("Error al actualizar el álbum:", error));
    };

    const insertAlbum = (album) => {
        axios.post('http://localhost:3000/albums', album)
            .then(res => {
                console.log("Álbum creado:", res.data);
                if (foto) guardarFoto(res.data.id);
                else navigate('/albumes');
            })
            .catch(error => console.log("Error al crear el álbum:", error));
    };

    const guardarFoto = (albumId) => {
        const formData = new FormData();
        formData.append("image", foto);

        axios.post(`http://localhost:3000/albums/${albumId}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log("Foto subida:", res.data);
                navigate('/albumes');
            })
            .catch(error => console.log("Error al subir la foto:", error));
    };

    const onFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const onArtistaChange = (e) => {
        setIdArtista(e.target.value);
    };

    return (
        <>
            <NavMenu />
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">{id ? "Editar Álbum" : "Crear Álbum"}</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formNombre" className="mb-3">
                                <Form.Label className="title-2">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el nombre del álbum"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formArtista" className="mb-3">
                                <Form.Label className="title-2">Artista</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={idArtista}
                                    onChange={onArtistaChange}
                                    required
                                >
                                    <option value="">Seleccione un artista</option>
                                    {artistas.map(artista => (
                                        <option key={artista.id} value={artista.id}>
                                            {artista.nombre}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Por favor seleccione un artista.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="title-2">Imagen del Álbum (opcional)</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={onFileChange}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="btn-tipo">
                                    {id ? "Guardar Cambios" : "Guardar Álbum"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormAlbum;
