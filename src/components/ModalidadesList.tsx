import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Modalidade, ModalidadesListProps } from '@/types/interfaces';

export default function ModalidadesList({ updateList, onEdit }: ModalidadesListProps) {
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);
  const [filteredModalidades, setFilteredModalidades] = useState<Modalidade[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  useEffect(() => {
    fetchModalidades();
  }, [updateList]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredModalidades(modalidades);
    } else {
      const filtered = modalidades.filter(modalidade =>
        modalidade.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredModalidades(filtered);
    }
  }, [searchTerm, modalidades]);

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
    console.log('Modalidades:', modalidades);
  }, [modalidades]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Input
          className="m-2"
          placeholder="Pesquisar Modalidades"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    
      <ul className='grid grid-cols-2 gap-2'>
        {filteredModalidades.map((modalidade) => (
          <li className='p-6 m-2 bg-slate-950 dark:bg-white dark:text-black text-white rounded' key={modalidade.id}>
            <Dialog>
              <DialogTrigger>
                <h3>{modalidade.nome}</h3>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{modalidade.nome}</DialogTitle>
                  <DialogDescription>
                    {modalidade.descricao}
                  </DialogDescription>
                  <DialogDescription>
                    Numero de Jogadores: {modalidade.numero_jogadores}
                  </DialogDescription>
                  <DialogDescription>
                    Equipamentos necessarios: {modalidade.equipamento_necessario}
                  </DialogDescription>
                  <DialogDescription>
                    Popularidade: {modalidade.popularidade}
                  </DialogDescription>
                  <DialogDescription>
                    Origem: {modalidade.origem}
                  </DialogDescription>
                  <DialogDescription>
                    Regras:
                    <ul>
                      {modalidade.regras && modalidade.regras.length > 0 ? (
                        modalidade.regras.map((regra, index) => (
                          <li key={index}>{regra.descricao}</li>
                        ))
                      ) : (
                        <li>Nenhuma regra cadastrada</li>
                      )}
                    </ul>
                  </DialogDescription>
                  <DialogDescription>
                    Imagem:
                    <img src={modalidade.imagem} alt={modalidade.nome} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <p className="mb-4">{modalidade.descricao}</p>
            <p className="mb-4">Regras: {modalidade.regras ? modalidade.regras.length : 0}</p>
            <Button className='mr-2' onClick={() => onEdit(modalidade)}>Editar</Button>
            <Button className='bg-red-600 hover:bg-red-700 dark:text-slate-100 dark:hover:bg-red-700' onClick={() => handleDelete(modalidade.id)}>Excluir</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
