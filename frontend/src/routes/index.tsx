import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Produto from "../pages/Produto";
import Produtos  from "../pages/ProdutoList";
import EditarProduto from "@/pages/ProdutoEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/produto/:id",
    element: <Produto />,
  },
  {
    path: "/produtos",
    element: <Produtos />,
  },
  { 
    path: "/editar/:id",
    element: <EditarProduto />,
  },
]);

export default router;