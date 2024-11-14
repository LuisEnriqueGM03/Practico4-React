import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormGenero = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [foto, setFoto] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getGeneroById();
    }, [id]);

    const getGeneroById = () => {
        axios.get(`http://localhost:3000/generos/${id}`)
            .then(res => {
                const genero = res.data;
                setNombre(genero.nombre);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const genero = { nombre };

        if (id) {
            editGenero(genero);
        } else {
            insertGenero(genero);
        }
    };

    const editGenero = (genero) => {
        axios.put(`http://localhost:3000/generos/${id}`, genero)
            .then(res => {
                console.log("Género actualizado:", res.data);
                if (foto) guardarFoto(id);
                else navigate('/generos');
            })
            .catch(error => {
                console.log("Error al actualizar el género:", error);
            });
    };

    const insertGenero = (genero) => {
        axios.post('http://localhost:3000/generos', genero)
            .then(res => {
                console.log("Género creado:", res.data);
                if (foto) guardarFoto(res.data.id);
                else navigate('/generos');
            })
            .catch(error => {
                console.log("Error al crear el género:", error);
            });
    };

    const guardarFoto = (generoId) => {
        const formData = new FormData();
        formData.append("image", foto);

        axios.post(`http://localhost:3000/generos/${generoId}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log("Foto subida:", res.data);
                navigate('/generos');
            })
            .catch(error => {
                console.log("Error al subir la foto:", error);
            });
    };

    const onFileChange = (e) => {
        setFoto(e.target.files[0]);
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
                        <h2 className="mb-4 text-center">{id ? "Editar Género" : "Crear Género"}</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formNombre" className="mb-3">
                                <Form.Label className="title-2">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el nombre del género"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="title-2">Imagen del Género (opcional)</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={onFileChange}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="btn-tipo">
                                    {id ? "Guardar Cambios" : "Guardar Género"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormGenero;
