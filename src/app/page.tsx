'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Header from '@/components/Header';
import ModalidadesList from '@/components/ModalidadesList';
import { Modalidade } from '@/types/interfaces'
 
export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [numeroJogadores, setNumeroJogadores] = useState('');
  const [categoria, setCategoria] = useState('');
  const [equipamentoNecessario, setEquipamentoNecessario] = useState('');
  const [popularidade, setPopularidade] = useState('');
  const [origem, setOrigem] = useState('');
  const [imagem, setImagem] = useState('');
const [open, setOpen] = useState(false);
const [updateList, setUpdateList] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [editingId, setEditingId] = useState<number | null>(null);

const resetForm = () => {
  setNome('');
  setDescricao('');
  setNumeroJogadores('');
  setCategoria('');
  setEquipamentoNecessario('');
  setPopularidade('');
  setOrigem('');
  setImagem('');
};


const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();

  const data = {
    nome,
    descricao,
    numero_jogadores: parseInt(numeroJogadores),
    categoria,
    equipamento_necessario: equipamentoNecessario,
    popularidade,
    origem,
    imagem,
  };

  try {
    let response;
    if (isEditing && editingId !== null) {
      response = await fetch(`/api/modalidades?id=${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } else {
      response = await fetch(`/api/modalidades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }

    if (response.ok) {
      console.log('Modalidade cadastrada com sucesso!');
      resetForm();
      setOpen(false);
      setUpdateList(!updateList);
    } else {
      const errorData = await response.json();
      console.error('Erro ao cadastrar modalidade:', errorData);
    }
  } catch (error) {
    console.error('Erro ao cadastrar modalidade:', error);
  }
};



const handleEdit = (modalidade: Modalidade) => {
  setNome(modalidade.nome);
  setDescricao(modalidade.descricao);
  setNumeroJogadores(modalidade.numero_jogadores.toString());
  setCategoria(modalidade.categoria);
  setEquipamentoNecessario(modalidade.equipamento_necessario);
  setPopularidade(modalidade.popularidade);
  setOrigem(modalidade.origem);
  setImagem(modalidade.imagem);
  setEditingId(modalidade.id);
  setIsEditing(true);
  setOpen(true);
};

const fetchModalidades = async () => {
  try {
    const response = await fetch(`/api/modalidades?nome=${searchTerm}`);
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
}, [searchTerm, updateList]);

return (
  <main>
    <Header />
    <div className='flex flex-row'>
    
    <Sheet open={open} onOpenChange={setOpen}>
    <Input 
          className='m-2' 
          placeholder="Pesquisar Modalidades" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <SheetTrigger asChild>
        
        <Button className="m-2 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-800" onClick={() => { setIsEditing(false); resetForm(); }}>Cadastrar Modalidade</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Editar Modalidade' : 'Cadastrar Nova Modalidade'}</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para {isEditing ? 'editar' : 'cadastrar'} uma modalidade.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-slate-100">Nome:</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 dark:text-slate-100">Descrição:</label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              />
            </div>

            <div>
              <label htmlFor="numeroJogadores" className="block text-sm font-medium text-gray-700 dark:text-slate-100">Número de Jogadores:</label>
              <input
                type="number"
                id="numeroJogadores"
                value={numeroJogadores}
                onChange={(e) => setNumeroJogadores(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              />
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria:</label>
              <input
                type="text"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              />
            </div>

            <div>
              <label htmlFor="equipamentoNecessario" className="block text-sm font-medium text-gray-700 dark:text-slate-100">Equipamento Necessário:</label>
              <input
                type="text"
                id="equipamentoNecessario"
                value={equipamentoNecessario}
                onChange={(e) => setEquipamentoNecessario(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              />
            </div>

            <div>
              <label htmlFor="popularidade" className="block text-sm font-medium text-gray-700 dark:text-slate-100">Popularidade:</label>
              <input
                type="text"
                id="popularidade"
                value={popularidade}
                onChange={(e) => setPopularidade(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              />
            </div>

            <div>
              <label htmlFor="origem" className="block text-sm font-medium text-gray-700 dark:text-slate-100">Origem:</label>
              <input
                type="text"
                id="origem"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              />
            </div>

            <div>
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 dark:text-slate-100">Imagem:</label>
              <input
                type="text"
                id="imagem"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md '
              />
            </div>
          <Button type="submit" className='dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-800'>{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</Button>
        </form>
      </SheetContent>
    </Sheet>
    </div>
    <ModalidadesList updateList={updateList} onEdit={handleEdit} />
  </main>
);
}