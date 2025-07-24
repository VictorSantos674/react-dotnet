import { useParams } from "react-router-dom";

function Produto() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalhes do Produto</h1>
      <p>ID do Produto: {id}</p>
    </div>
  );
}
export default Produto;
