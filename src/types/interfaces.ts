// types/interfaces.ts

export interface Modalidade {
  id: number;
  nome: string;
  descricao: string;
  numero_jogadores: number;
  categoria: string;
  equipamento_necessario: string;
  popularidade: string;
  origem: string;
  imagem: string;
  regras: Regra[];
}

export interface Regra {
  id: number;
  descricao: string;
}

export interface ModalidadesListProps {
  updateList: boolean;
  onEdit: (modalidade: Modalidade) => void;
}
