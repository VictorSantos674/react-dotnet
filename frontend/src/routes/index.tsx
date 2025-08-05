import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Produto from '@/pages/Produto';
import ProdutoList from '@/pages/ProdutoList';
import ProdutoEdit from '@/pages/ProdutoEdit';
import RequireAuth from '@/components/RequireAuth';
import Login from '@/pages/Login';
import Perfil from '@/pages/Perfil';
import Register from '@/pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/perfil',
        element: <Perfil />,
      },
      {
        path: '/produtos',
        element: <ProdutoList />,
      },
      {
        path: '/produtos/novo',
        element: <Produto />,
      },
      {
        path: '/produtos/editar/:id',
        element: <ProdutoEdit />,
      },
    ],
  },
]);

export default router;