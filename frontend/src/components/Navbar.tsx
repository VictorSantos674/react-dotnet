import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Home</Link>
      <Link to="/about">Sobre</Link>
      <Link to="/produto">Cadastrar Produto</Link>
      <Link to="/produtos">Listar Produtos</Link>
    </nav>
  );
}
export default Navbar;
