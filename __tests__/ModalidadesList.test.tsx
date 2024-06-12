/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ModalidadesList from '@/components/ModalidadesList';
import { Modalidade } from '@/types/interfaces';
import '@testing-library/jest-dom';

const mockModalidades: Modalidade[] = [
  {
    id: 1,
    nome: 'Futebol',
    descricao: 'Esporte coletivo jogado com uma bola',
    numero_jogadores: 11,
    categoria: 'Esporte',
    equipamento_necessario: 'Bola',
    popularidade: 'Alta',
    origem: 'Inglaterra',
    imagem: 'url-to-image',
  },
  {
    id: 2,
    nome: 'Basquete',
    descricao: 'Esporte coletivo jogado com uma bola',
    numero_jogadores: 5,
    categoria: 'Esporte',
    equipamento_necessario: 'Bola',
    popularidade: 'Alta',
    origem: 'Estados Unidos',
    imagem: 'url-to-image',
  },
];

describe('ModalidadesList', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockModalidades),
      })
    ) as unknown as typeof fetch;
  });

  it('fetches and displays modalidades', async () => {
    render(<ModalidadesList updateList={false} onEdit={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('Futebol')).toBeInTheDocument();
      expect(screen.getByText('Basquete')).toBeInTheDocument();
    });
  });

  it('calls onEdit when the Editar button is clicked', async () => {
    const handleEdit = vi.fn();
    render(<ModalidadesList updateList={false} onEdit={handleEdit} />);

    await waitFor(() => screen.getByText('Futebol'));

    fireEvent.click(screen.getAllByText('Editar')[0]);
    expect(handleEdit).toHaveBeenCalledWith(mockModalidades[0]);
  });

  it('deletes a modalidade when the Excluir button is clicked', async () => {
    global.fetch = vi.fn((url, options) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as unknown as typeof fetch;

    render(<ModalidadesList updateList={false} onEdit={vi.fn()} />);

    await waitFor(() => screen.getByText('Futebol'));

    fireEvent.click(screen.getAllByText('Excluir')[0]);

    await waitFor(() => {
      expect(screen.queryByText('Futebol')).not.toBeInTheDocument();
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
