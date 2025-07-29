import { z } from 'zod';

export const productFormSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  preco: z.number().min(0.01, 'Preço deve ser maior que zero'),
  descricao: z.string().min(1, 'Descrição obrigatória'),
});