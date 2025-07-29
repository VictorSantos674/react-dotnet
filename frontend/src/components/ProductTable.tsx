import type { ColumnsType } from 'antd/es/table';
import type { Product } from '@/types/Product';
import { Table, Button, Popconfirm } from 'antd';

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export default function ProductTable({
  products,
  onDelete,
  isDeleting,
}: ProductTableProps) {
  const columns: ColumnsType<Product> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (preco: number) => `R$ ${preco.toFixed(2)}`,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) =>
        record.id !== undefined && (
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => onDelete(record.id!)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger loading={isDeleting}>
              Excluir
            </Button>
          </Popconfirm>
        ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={products} />;
}
