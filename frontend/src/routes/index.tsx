import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Produto from '@/pages/Produto';
import ProdutoList from '@/pages/ProdutoList';
import ProdutoEdit from '@/pages/ProdutoEdit';
import RequireAuth from '@/components/RequireAuth';
import Login from '@/pages/Login';
import Perfil from '@/pages/Perfil';
import Cadastro from '@/pages/Cadastro';
import Dashboard from '@/pages/Dashboard';
import ProdutoSearch from '@/pages/ProdutoSearch';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import ProdutoDetalhes from '@/pages/ProdutoDetalhes';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '3rem' }}>
    <h1>404 - Página não encontrada</h1>Faça 
    <p>A página que você procura não existe.</p>
    <a href="/">Voltar para o início</a>
  </div>
);

const LandingPage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  // return token ? <Navigate to="/home" /> : <Navigate to="/cadastro" />;
  return token;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <Cadastro /> },
      { path: 'produtos/pesquisa', element: <ProdutoSearch /> },
      {
        element: <RequireAuth />,
        children: [
          { path: 'home', element: <Home /> },
          { path: 'about', element: <About /> },
          { path: 'perfil', element: <Perfil /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'produtos', element: <ProdutoList /> },
          { path: 'produtos/novo', element: <Produto /> },
          { path: 'produtos/:id', element: <ProdutoDetalhes /> },
          { path: 'produtos/editar/:id', element: <ProdutoEdit /> },
        ],
      },
      { path: '*', element: <NotFound /> }
    ],
  },
]);

export default router;
