import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

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
  updateList: boolean;
  onEdit: (modalidade: Modalidade) => void;
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
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/modalidades?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Modalidade excluída com sucesso!');
        setModalidades((prevModalidades) => prevModalidades.filter(modalidade => modalidade.id !== id));
      } else {
        const errorData = await response.json();
        console.error('Erro ao excluir modalidade:', errorData);
      }
    } catch (error) {
      console.error('Erro ao excluir modalidade:', error);
    }
  };

  useEffect(() => {
    fetchModalidades();
  }, [updateList]);

  return (
    <div>
      <h2>Modalidades Cadastradas</h2>
      <ul>
        {modalidades.map((modalidade) => (
          <li className='p-4 m-2 bg-slate-950 text-white rounded' key={modalidade.id}>
            <h3>{modalidade.nome}</h3>
            <p>{modalidade.descricao}</p>
            <Button className='mr-2' onClick={() => onEdit(modalidade)}>Editar</Button>
            <Button className='bg-red-600' onClick={() => handleDelete(modalidade.id)}>Excluir</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
