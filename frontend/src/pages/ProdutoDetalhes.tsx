import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "@/services/api/endpoints/productApi";
import { Typography, Spin, Alert, Button, Space } from "antd";
import Card from 'antd/es/card/Card';

const { Title, Paragraph } = Typography;

export default function ProdutoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return <Spin tip="Carregando produto..." style={{ display: "block", marginTop: "2rem" }} />;
  }

  if (isError || !product) {
    return (
      <Alert
        message="Produto não encontrado"
        description="Verifique se o produto existe ou tente novamente mais tarde."
        type="error"
        showIcon
      />
    );
  }

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        borderColor: "var(--color-primary)",
      }}
    >
      <Title level={3} style={{ color: "var(--color-primary)" }}>
        {product.nome}
      </Title>
      <Paragraph>
        <strong>Preço:</strong> R$ {Number(product.preco).toFixed(2)}
      </Paragraph>
      <Paragraph>
        <strong>Descrição:</strong> {product.descricao}
      </Paragraph>

      <Space style={{ marginTop: "1rem" }}>
        <Button onClick={() => navigate("/produtos")} style={{ borderColor: "var(--color-primary)" }}>
          Voltar
        </Button>
        <Button
          type="primary"
          onClick={() => navigate(`/produtos/editar/${product.id}`)}
          style={{ background: "var(--color-primary)", borderColor: "var(--color-primary)" }}
        >
          Editar Produto
        </Button>
      </Space>
    </Card>
  );
}
