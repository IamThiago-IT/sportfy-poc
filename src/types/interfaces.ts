// types/interfaces.ts

export interface Regra {
  id: number;
  modalidade_esportiva_id: number;
  descricao: string;
}

export interface Modalidade {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  numero_jogadores: number;
  categoria: string;
  equipamento_necessario: string;
  popularidade: string;
  origem: string;
  status: string;
  created_at: string;
  updated_at: string;
  regras: Regra[];
  nivel_contato_fisico: string; // Novo campo adicionado
}

export interface ModalidadesListProps {
  updateList: boolean;
  onEdit: (modalidade: Modalidade) => void;
}
