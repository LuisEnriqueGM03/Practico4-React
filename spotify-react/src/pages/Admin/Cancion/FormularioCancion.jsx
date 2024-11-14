import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [idAlbum, setIdAlbum] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [albumes, setAlbumes] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getListaAlbumes();
        if (id) {
            getCancionById();
        }
    }, [id]);

    const getListaAlbumes = () => {
        axios.get('http://localhost:3000/albums')
            .then(res => setAlbumes(res.data))
            .catch(error => console.log(error));
    };

    const getCancionById = () => {
        axios.get(`http://localhost:3000/canciones/${id}`)
            .then(res => {
                const cancion = res.data;
                setNombre(cancion.nombre);
                setIdAlbum(cancion.idAlbum.id);
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

        const cancion = { nombre, idAlbum };

        if (id) {
            editCancion(cancion);
        } else {
            insertCancion(cancion);
        }
    };

    const editCancion = (cancion) => {
        axios.put(`http://localhost:3000/canciones/${id}`, cancion)
            .then(res => {
                console.log("Canción actualizada:", res.data);
                if (audioFile) guardarAudio(id);
                else navigate('/canciones');
            })
            .catch(error => console.log("Error al actualizar la canción:", error));
    };

    const insertCancion = (cancion) => {
        axios.post('http://localhost:3000/canciones', cancion)
            .then(res => {
                console.log("Canción creada:", res.data);
                if (audioFile) guardarAudio(res.data.id);
                else navigate('/canciones');
            })
            .catch(error => console.log("Error al crear la canción:", error));
    };

    const guardarAudio = (cancionId) => {
        const formData = new FormData();
        formData.append("file", audioFile);

        axios.post(`http://localhost:3000/canciones/${cancionId}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log("Audio subido:", res.data);
                navigate('/canciones');
            })
            .catch(error => console.log("Error al subir el audio:", error));
    };

    const onFileChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const onAlbumChange = (e) => {
        setIdAlbum(e.target.value);
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
                        <h2 className="mb-4 text-center">{id ? "Editar Canción" : "Crear Canción"}</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formNombre" className="mb-3">
                                <Form.Label className="title-2">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el nombre de la canción"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formAlbum" className="mb-3">
                                <Form.Label className="title-2">Álbum</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={idAlbum}
                                    onChange={onAlbumChange}
                                    required
                                >
                                    <option value="">Seleccione un álbum</option>
                                    {albumes.map(album => (
                                        <option key={album.id} value={album.id}>
                                            {album.nombre}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Por favor seleccione un álbum.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="title-2">Archivo de Audio (opcional)</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={onFileChange}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="btn-tipo">
                                    {id ? "Guardar Cambios" : "Guardar Canción"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormCancion;
