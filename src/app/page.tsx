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
import { Textarea } from "@/components/ui/textarea"

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
const [regras, setRegras] = useState<string[]>([]);
  const [imagem, setImagem] = useState('');
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filteredModalidades, setFilteredModalidades] = useState<Modalidade[]>([]); // Estado para as modalidades filtradas
 

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
      id: editingId, // Ensure the id is included
      nome,
      descricao,
      numero_jogadores: parseInt(numeroJogadores),
      categoria,
      equipamento_necessario: equipamentoNecessario,
      popularidade,
      origem,
      regras,
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
      setFilteredModalidades(filtered);
    }
  }, [searchTerm, modalidades]);

  const handleRegrasChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRegras = [...regras];
    newRegras[index] = e.target.value;
    setRegras(newRegras);
  };
  
  const addRegra = () => {
    setRegras([...regras, '']);
  };
  
  const removeRegra = (index: number) => {
    const newRegras = regras.filter((_, i) => i !== index);
    setRegras(newRegras);
  };

return (
  <main>
    <Header />
    <div className='flex items-center justify-between'>
    
    <Sheet open={open} onOpenChange={setOpen}>
    {/* 
        <Popover>
  <PopoverTrigger>   
    <Button className="m-2 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-800" >
    <FontAwesomeIcon icon={faFilter} />   
      Filtro
    </Button>
    </PopoverTrigger>
    <PopoverContent className="p-4  rounded-lg shadow-md">
  <h3 className="text-lg font-semibold mb-2">Filtrar por:</h3>
  <div className="space-y-2">
    <label className="flex items-center">
      <Checkbox className="mr-2" />
      <span>Text 1</span>
    </label>
    <label className="flex items-center">
      <Checkbox className="mr-2" />
      <span>Text 2</span>
    </label>
    <label className="flex items-center">
      <Checkbox className="mr-2" />
      <span>Text 3</span>
    </label>
    <label className="flex items-center">
      <Checkbox className="mr-2" />
      <span>Text 4</span>
    </label>
  </div>
</PopoverContent>
</Popover>
   */}
      <SheetTrigger asChild>
      
        <Button className="m-2 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-800" onClick={() => { setIsEditing(false); resetForm(); }}>Cadastrar Modalidade</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
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
              <label>Regras:</label>
      {regras.map((regra, index) => (
        <div key={index} className="flex items-center">
          <Textarea 
            
            value={regra}
            onChange={(e) => handleRegrasChange(e, index)}
            required
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md '
          />
          <button type="button"  className="ml-2 bg-red-500 text-white p-2 rounded" onClick={() => removeRegra(index)}>Remover</button>
        </div>
      ))}
      <button type="button" className="mt-2 bg-blue-500 text-white p-2 rounded" onClick={addRegra}>Adicionar Regra</button>
    </div>
    <Button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</Button>
  </form>
      </SheetContent>
    </Sheet>

 
    </div>
    <ModalidadesList updateList={updateList} onEdit={handleEdit} />
  </main>
);
}