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
  const [activePlayers, setActivePlayers] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [modalidadeToDelete, setModalidadeToDelete] = useState<Modalidade | null>(null);

  const fetchModalidades = async () => {
    try {
      const response = await fetch('/api/modalidades');
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const data = await response.json();
      console.log('Dados recebidos:', data);
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

  const handleDelete = async () => {
    if (!modalidadeToDelete) return;
    
    try {
      const response = await fetch(`/api/modalidades?id=${modalidadeToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Modalidade excluída com sucesso!');
        setModalidades((prevModalidades) => prevModalidades.filter(modalidade => modalidade.id !== modalidadeToDelete.id));
        setDeleteDialogOpen(false);
        setModalidadeToDelete(null);
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

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  function generateActivePlayers() {
    return Math.floor(Math.random() * 499) + 1;
  }

  useEffect(() => {
    setActivePlayers(generateActivePlayers());
  }, []);

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
              <DialogTrigger asChild>
                <h3 className="cursor-pointer block text-lg font-medium dark:text-gray-700 grid place-content-center">{modalidade.nome}</h3>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{modalidade.nome}</DialogTitle>
                  <DialogDescription>
                    {modalidade.descricao}
                  </DialogDescription>
                  <DialogDescription>
                    Número de jogadores por equipe: {modalidade.numero_jogadores}
                  </DialogDescription>
                  <DialogDescription>
                    Equipamentos Necessarios: {modalidade.equipamento_necessario}
                  </DialogDescription>
                  <DialogDescription>
                   Nível de Contato Físico: {modalidade.nivel_contato_fisico}
                  </DialogDescription>
                  <DialogDescription>
                    Regras:
                    <ul>
                      {modalidade.regras && modalidade.regras.length > 0 ? (
                        modalidade.regras.map((regra, index) => (
                          <li key={index}>• {regra.descricao}</li>
                        ))
                      ) : (
                        <li>Nenhuma regra cadastrada</li>
                      )}
                    </ul>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <p className="mb-4">{modalidade.descricao}</p>
            <p className="mb-4">Jogadores Ativos: {activePlayers}</p>
            <p className="mb-4">Data de Criação: {formatDate(modalidade.created_at)}</p>
            <p className="mb-4">Regras: {modalidade.regras ? modalidade.regras.length : 0}</p>
            <div className="grid grid-cols-2 gap-4 place-content-center">
              <Button className='mr-2 bg-gray-200 hover:bg-gray-400 text-black dark:bg-slate-950 dark:text-white' onClick={() => onEdit(modalidade)}>Editar</Button>
              <Button className='bg-red-600 hover:bg-red-700 dark:text-slate-100 dark:hover:bg-red-700' onClick={() => { setModalidadeToDelete(modalidade); setDeleteDialogOpen(true); }}>Excluir</Button>
            </div>
          </li>
        ))}
      </ul>

      {modalidadeToDelete && (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir a modalidade "{modalidadeToDelete.nome}"?
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-end space-x-4">
              <Button className='bg-gray-300 hover:bg-gray-400 text-black' onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
              <Button className='bg-red-600 hover:bg-red-700 text-white' onClick={handleDelete}>Excluir</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
