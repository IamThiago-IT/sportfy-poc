import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
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
          <li className='p-4 m-2 bg-slate-950 dark:bg-white dark:text-black text-white rounded' key={modalidade.id}>
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
                      Numero de Jogadores:   {modalidade.numero_jogadores}
                    </DialogDescription>
                    <DialogDescription>
                      Categoria:   {modalidade.categoria}
                    </DialogDescription>
                    <DialogDescription>
                      Equipamentos necessarios:   {modalidade.equipamento_necessario}
                    </DialogDescription>
                    <DialogDescription>
                      Popularidade:   {modalidade.popularidade}
                    </DialogDescription>
                    <DialogDescription>
                      Origem:   {modalidade.origem}
                    </DialogDescription>
                    <DialogDescription>
                      imagem:    {modalidade.imagem}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </DialogTrigger>  
           </Dialog>
            
            <p>{modalidade.descricao}</p>
            <Button className='mr-2' onClick={() => onEdit(modalidade)}>Editar</Button>
            <Button className='bg-red-600' onClick={() => handleDelete(modalidade.id)}>Excluir</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
