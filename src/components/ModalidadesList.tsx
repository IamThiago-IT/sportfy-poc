import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Modalidade, ModalidadesListProps } from '@/types/interfaces'

export default function ModalidadesList({ updateList, onEdit }: ModalidadesListProps) {
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);
  const [filteredModalidades, setFilteredModalidades] = useState<Modalidade[]>([]); // Estado para as modalidades filtradas
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

  // Atualiza as modalidades filtradas sempre que `searchTerm` ou `modalidades` mudar
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredModalidades(modalidades); // Se `searchTerm` estiver vazio, mostra todas as modalidades
    } else {
      const filtered = modalidades.filter(modalidade =>
        modalidade.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      console.log('Modalidades filtradas:', filtered); // Log para verificar modalidades filtradas
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
          <li className=' p-6 m-2 bg-slate-950 dark:bg-white dark:text-black text-white rounded' key={modalidade.id}>
            <Dialog>
              <DialogTrigger>
                <h3>{modalidade.nome}</h3>
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
                      Categoria: {modalidade.categoria}
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
                    Regras: {modalidade.regras ? modalidade.regras.length : 0}
                    </DialogDescription>
                    <DialogDescription>
                      imagem: {modalidade.imagem}
                      <img src={modalidade.imagem} alt={modalidade.nome} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </DialogTrigger>
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
