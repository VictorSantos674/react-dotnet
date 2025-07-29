import { useDeleteProductMutation, useGetAllProductsQuery } from '@/services/api/endpoints/productApi';
import ProductTable from '@/components/ProductTable';
import { Layout, Spin, Typography, message } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

export default function ProdutoList() {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
      message.success('Produto excluído com sucesso!');
    } catch {
      message.error('Erro ao excluir o produto.');
    }
  };

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <Title level={2}>Lista de Produtos</Title>
        {isLoading ? (
          <Spin tip="Carregando produtos..." />
        ) : (
          <ProductTable
            products={products || []}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </Content>
    </Layout>
  );
}
