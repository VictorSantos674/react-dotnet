import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import RequireAuth from '@/components/RequireAuth';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const Home = lazy(() => import('@/pages/Home'));
const ProdutoList = lazy(() => import('@/pages/ProdutoList'));
const Produto = lazy(() => import('@/pages/Produto'));
const ProdutoDetalhes = lazy(() => import('@/pages/ProdutoDetalhes'));
const ProdutoEdit = lazy(() => import('@/pages/ProdutoEdit'));
const Login = lazy(() => import('@/pages/Login'));
const Cadastro = lazy(() => import('@/pages/Cadastro'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const About = lazy(() => import('@/pages/About'));
const Perfil = lazy(() => import('@/pages/Perfil'));
const ProdutoSearch = lazy(() => import('@/pages/ProdutoSearch'));

const lazyLoad = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<LoadingSpinner fullScreen />}>
    <Component />
  </Suspense>
);

const LandingPage = () => {
  const token = useSelector((state: RootState) => state.auth?.token);
  return token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '3rem' }}>
    <h1>404 - Página não encontrada</h1>
    <p>A página que você procura não existe.</p>
    <a href="/">Voltar para o início</a>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: lazyLoad(Login) },
      { path: 'cadastro', element: lazyLoad(Cadastro) },
      { path: 'produtos/pesquisa', element: lazyLoad(ProdutoSearch) },
      {
        element: <RequireAuth />,
        children: [
          { path: 'home', element: lazyLoad(Home) },
          { path: 'about', element: lazyLoad(About) },
          { path: 'perfil', element: lazyLoad(Perfil) },
          { path: 'dashboard', element: lazyLoad(Dashboard) },
          { path: 'produtos', element: lazyLoad(ProdutoList) },
          { path: 'produtos/novo', element: lazyLoad(Produto) },
          { path: 'produtos/:id', element: lazyLoad(ProdutoDetalhes) },
          { path: 'produtos/editar/:id', element: lazyLoad(ProdutoEdit) },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;