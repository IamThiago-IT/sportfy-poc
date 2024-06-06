// components/ModalidadesList.tsx
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

interface Modalidade {
  id: number;
  nome: string;
  descricao: string;
  numero_jogadores: number;
  categoria: string;
  equipamento_necessario: string;
  popularidade: string;
  origem: string;
  imagem: string;
}

interface ModalidadesListProps {
  updateList: boolean;  // Novo prop para detectar mudanças
  onEdit: (modalidade: Modalidade) => void;  // Função para editar uma modalidade
}

export default function ModalidadesList({ updateList, onEdit }: ModalidadesListProps) {
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);

  const fetchModalidades = async () => {
    try {
      const response = await fetch('/api/modalidades');
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const data = await response.json();
      setModalidades(data);
    } catch (error) {
      console.error('Erro ao obter modalidades:', error);
      // Use fake data in case of error
      // setModalidades(fakeModalidades);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/modalidades/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setModalidades(modalidades.filter(modalidade => modalidade.id !== id));
        console.log('Modalidade excluída com sucesso!');
      } else {
        console.error('Erro ao excluir modalidade');
      }
    } catch (error) {
      console.error('Erro ao excluir modalidade:', error);
    }
  };

  useEffect(() => {
    fetchModalidades();
  }, [updateList]);  // Reexecuta quando updateList mudar

  return (
    <div>
      <Input placeholder="Pesquisar Modalidades" />
      <h2>Modalidades Cadastradas</h2>
      <ul>
        {modalidades.map((modalidade) => (
          <li className='p-4 m-2 bg-slate-950 text-white rounded' key={modalidade.id}>
            <h3>{modalidade.nome}</h3>
            <p>{modalidade.descricao}</p>
            <Button onClick={() => onEdit(modalidade)}>Editar</Button>
            <Button onClick={() => handleDelete(modalidade.id)}>Excluir</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
