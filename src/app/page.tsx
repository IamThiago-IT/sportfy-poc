'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast"; // Import useToast

import Header from '@/components/Header';
import ModalidadesList from '@/components/ModalidadesList';

import { Modalidade } from '@/types/interfaces';

export default function Home() {
  const { toast } = useToast(); // Initialize useToast hook
  const [searchTerm, setSearchTerm] = useState('');
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [numeroJogadores, setNumeroJogadores] = useState('');
  const [categoria, setCategoria] = useState('');
  const [equipamentoNecessario, setEquipamentoNecessario] = useState('');
  const [popularidade, setPopularidade] = useState('');
  const [origem, setOrigem] = useState('');
  const [nivelContatoFisico, setNivelContatoFisico] = useState('');
  const [regras, setRegras] = useState<string[]>(['']);
  const [imagem, setImagem] = useState('');
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filteredModalidades, setFilteredModalidades] = useState<Modalidade[]>([]);

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setNumeroJogadores('');
    setCategoria('');
    setEquipamentoNecessario('');
    setPopularidade('');
    setOrigem('');
    setImagem('');
    setNivelContatoFisico('');
    setRegras(['']);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      id: editingId,
      nome,
      descricao,
      numero_jogadores: parseInt(numeroJogadores),
      categoria,
      equipamento_necessario: equipamentoNecessario,
      popularidade,
      origem,
      nivel_contato_fisico: nivelContatoFisico,
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
        toast({
          title: isEditing ? 'Modalidade editada com sucesso!' : 'Modalidade cadastrada com sucesso!',
          description: 'As informações foram salvas corretamente.',
        });
        resetForm();
        setOpen(false);
        setUpdateList(!updateList);
      } else {
        const errorData = await response.json();
        console.error('Erro ao cadastrar modalidade:', errorData);
        toast({
          title: 'Erro ao cadastrar modalidade',
          description: 'Houve um problema ao salvar as informações. Por favor, tente novamente.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar modalidade:', error);
      toast({
        title: 'Erro ao cadastrar modalidade',
        description: 'Houve um problema ao salvar as informações. Por favor, tente novamente.',
        variant: 'destructive',
      });
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
    setNivelContatoFisico(modalidade.nivel_contato_fisico);
    setRegras(modalidade.regras ? modalidade.regras.map(regra => regra.descricao) : ['']);
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

  const handleRegrasChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
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
    <main className='dark:bg-[#0D0D0D]'>
      <Header />
      <div className='flex items-center justify-between'>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="m-2 bg-emerald-600 hover:bg-emerald-800 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-800" onClick={() => { setIsEditing(false); resetForm(); }}>Cadastrar Modalidade</Button>
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
              <textarea
                id="equipamentoNecessario"
                value={equipamentoNecessario}
                onChange={(e) => setEquipamentoNecessario(e.target.value)}
                required
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              />
            </div>

            <div>
              <label htmlFor="nivelContatoFisico" className="block text-sm font-medium text-gray-700 dark:text-slate-100">Nível de Contato Físico:</label>
                            <Select
                onValueChange={(value) => setNivelContatoFisico(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixo">Baixo</SelectItem>
                  <SelectItem value="Medio">Medio</SelectItem>
                  <SelectItem value="Alto">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
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
            <Button className='bg-emerald-600 hover:bg-emerald-800 dark:text-white' type="submit"
            >{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</Button>
          </form>
        </SheetContent>
      </Sheet>

      </div>
      <ModalidadesList updateList={updateList} onEdit={handleEdit} />
    </main>
  );
}
