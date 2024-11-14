import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormArtista = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [idGenero, setIdGenero] = useState('');
    const [foto, setFoto] = useState(null);
    const [generos, setGeneros] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getListaGeneros();
        if (id) {
            getArtistaById();
        }
    }, [id]);

    const getListaGeneros = () => {
        axios.get('http://localhost:3000/generos')
            .then(res => setGeneros(res.data))
            .catch(error => console.log(error));
    };

    const getArtistaById = () => {
        axios.get(`http://localhost:3000/artistas/${id}`)
            .then(res => {
                const artista = res.data;
                setNombre(artista.nombre);
                setIdGenero(artista.idGenero.id);
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

        const artista = { nombre, idGenero };

        if (id) {
            editArtista(artista);
        } else {
            insertArtista(artista);
        }
    };

    const editArtista = (artista) => {
        axios.put(`http://localhost:3000/artistas/${id}`, artista)
            .then(res => {
                console.log("Artista actualizado:", res.data);
                if (foto) guardarFoto(id);
                else navigate('/artistas');
            })
            .catch(error => console.log("Error al actualizar el artista:", error));
    };

    const insertArtista = (artista) => {
        axios.post('http://localhost:3000/artistas', artista)
            .then(res => {
                console.log("Artista creado:", res.data);
                if (foto) guardarFoto(res.data.id);
                else navigate('/artistas');
            })
            .catch(error => console.log("Error al crear el artista:", error));
    };

    const guardarFoto = (artistaId) => {
        const formData = new FormData();
        formData.append("image", foto);

        axios.post(`http://localhost:3000/artistas/${artistaId}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log("Foto subida:", res.data);
                navigate('/artistas');
            })
            .catch(error => console.log("Error al subir la foto:", error));
    };

    const onFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const onGeneroChange = (e) => {
        setIdGenero(e.target.value);
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
                        <h2 className="mb-4 text-center">{id ? "Editar Artista" : "Crear Artista"}</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formNombre" className="mb-3">
                                <Form.Label className="title-2">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el nombre del artista"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formGenero" className="mb-3">
                                <Form.Label className="title-2">Género</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={idGenero}
                                    onChange={onGeneroChange}
                                    required
                                >
                                    <option value="">Seleccione un género</option>
                                    {generos.map(genero => (
                                        <option key={genero.id} value={genero.id}>
                                            {genero.nombre}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Por favor seleccione un género.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="title-2">Imagen del Artista (opcional)</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={onFileChange}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="btn-tipo">
                                    {id ? "Guardar Cambios" : "Guardar Artista"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormArtista;
