// schemas/modalidadeSchema.ts
import { z } from 'zod';

export const modalidadeSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  numero_jogadores: z.number().positive('Número de jogadores deve ser positivo'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  equipamento_necessario: z.string().min(1, 'Equipamento necessário é obrigatório'),
  popularidade: z.string().min(1, 'Popularidade é obrigatória'),
  origem: z.string().min(1, 'Origem é obrigatória'),
  imagem: z.string().url('Imagem deve ser uma URL válida'),
});
