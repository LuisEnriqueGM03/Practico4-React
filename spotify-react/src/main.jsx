import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Admin/Dashboard.jsx';
import ListaGeneros from './pages/Admin/Generos/Generos.jsx';
import FormGenero from './pages/Admin/Generos/FormularioGeneros.jsx';
import ListaArtistas from './pages/Admin/Artista/Artista.jsx';
import FormArtista from './pages/Admin/Artista/FormularioArtista.jsx';
import ListaAlbumes from './pages/Admin/Album/Album.jsx';
import FormAlbum from './pages/Admin/Album/FormularioAlbum.jsx';
import ListaCanciones from './pages/Admin/Cancion/Cancion.jsx';
import FormCancion from './pages/Admin/Cancion/FormularioCancion.jsx';
import GeneroDetalle from './pages/User/GeneroDetalle.jsx';
import ArtistaDetalle from './pages/User/ArtistaDetalle.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
    {
      path: "/generos",
      element: <ListaGeneros/>,
    },
    {
      path: "/generos/crear",
        element: <FormGenero/>,
    },
    {
      path: "/generos/:id/editar",
        element: <FormGenero/>,
    },
    {
      path: "/artistas",
      element: <ListaArtistas/>,
    },
    {
      path: "/artistas/crear",
        element: <FormArtista/>,
    },
    {
      path: "/artistas/:id/editar",
        element: <FormArtista/>,
    },
    {
      path: "/albumes",
      element: <ListaAlbumes/>,
    },
    {
      path: "/albumes/crear",
        element: <FormAlbum/>,
    },
    {
      path: "/albumes/:id/editar",
        element: <FormAlbum/>,
    },
    {
      path: "/canciones",
      element: <ListaCanciones/>,
    },
    {
      path: "/canciones/crear",
        element: <FormCancion/>,
    },
    {
      path: "/canciones/:id/editar",
        element: <FormCancion/>,
    },
    {
      path: "/genero/detalle/:id",
        element: <GeneroDetalle/>,
    },
    {
      path: "/artista/detalle/:id",
        element: <ArtistaDetalle/>,
    }
]);


createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
);
