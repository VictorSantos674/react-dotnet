import { Button, Popconfirm, Space } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  onDelete: (id: number) => void;
  loading?: boolean;
};

export default function ProductTableActions({ id, onDelete, loading }: Props) {
  const navigate = useNavigate();

  return (
    <Space>
      <Button type="link" onClick={() => navigate(`/produtos/${id}`)}>
        Ver
      </Button>
      <Button type="link" onClick={() => navigate(`/produtos/editar/${id}`)}>
        Editar
      </Button>
      <Popconfirm
        title="Tem certeza que deseja excluir este produto?"
        onConfirm={() => onDelete(id)}
        okText="Sim"
        cancelText="Não"
      >
        <Button type="link" danger loading={loading}>
          Excluir
        </Button>
      </Popconfirm>
    </Space>
  );
}
