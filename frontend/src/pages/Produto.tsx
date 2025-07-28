import { useAddProductMutation } from '@/services/api/endpoints/productApi';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  preco: z.number().min(0, 'Preço deve ser positivo'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export default function Produto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: '',
      preco: 0,
      descricao: '',
    },
  });

  const [addProduct, { isLoading, isError, error }] = useAddProductMutation();

  const onSubmit = async (data: FormData) => {
    await addProduct(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('nome')}
        placeholder="Nome"
        className="border p-2 w-full"
      />
      {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

      <input
        type="number"
        step="0.01"
        {...register('preco', { valueAsNumber: true })}
        placeholder="Preço"
        className="border p-2 w-full"
      />
      {errors.preco && <p className="text-red-500">{errors.preco.message}</p>}

      <textarea
        {...register('descricao')}
        placeholder="Descrição"
        className="border p-2 w-full"
      />
      {errors.descricao && <p className="text-red-500">{errors.descricao.message}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? 'Cadastrando...' : 'Cadastrar Produto'}
      </button>

      {isError && (
        <p className="text-red-500 mt-2">
          Erro ao cadastrar:{' '}
          {('data' in error && (error.data as any)?.message) || 'Erro desconhecido'}
        </p>
      )}
    </form>
  );
}
