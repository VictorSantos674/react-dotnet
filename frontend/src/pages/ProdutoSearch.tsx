import { useGetProductsQuery } from '@/services/api/endpoints/productApi';
import { Input, List, Typography, Spin, Alert, Empty } from 'antd';
import { useState, type SetStateAction } from 'react';
import type { Product } from '@/types/Product';

const { Title } = Typography;

export default function ProdutoSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products, isLoading, isError } = useGetProductsQuery(); 

  const filteredProducts = (products || []).filter((p: Product) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={2}>Pesquisar Produtos</Title>
      <Input
        placeholder="Digite o nome do produto"
        value={searchTerm}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
        style={{ maxWidth: 400, marginBottom: '1rem' }}
        allowClear
      />

      {isLoading ? (
        <Spin tip="Carregando produtos..." />
      ) : isError ? (
        <Alert message="Erro ao carregar produtos" type="error" showIcon />
      ) : filteredProducts.length === 0 ? (
        <Empty description="Nenhum produto encontrado" />
      ) : (
        <List
          bordered
          dataSource={filteredProducts}
          renderItem={(item: Product) => (
            <List.Item>
              <strong>{item.nome}</strong> - R$ {item.preco.toFixed(2)}
            </List.Item>
          )}
        />
      )}
    </div>
  );
}