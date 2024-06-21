import { NextResponse } from 'next/server';
import prisma from '@/db/index';

// Função para buscar modalidades esportivas
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nome_startsWith = searchParams.get('nome_startsWith');

  try {
    const modalidades = nome_startsWith 
      ? await prisma.modalidadeEsportiva.findMany({
          where: { nome: { startsWith: nome_startsWith } },
          include: { Regras: true },
        })
      : await prisma.modalidadeEsportiva.findMany({
          include: { Regras: true },
        });

    return NextResponse.json(modalidades, { status: 200 });
  } catch (err) {
    console.error('Erro ao buscar modalidades:', err);
    return NextResponse.json({ error: 'Erro ao buscar modalidades' }, { status: 500 });
  }
}

// Função para criar uma nova modalidade esportiva
export async function POST(req: Request) {
  const data = await req.json();

  try {
    const newModalidade = await prisma.modalidadeEsportiva.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        numero_jogadores: data.numero_jogadores,
        categoria: data.categoria,
        equipamento_necessario: data.equipamento_necessario,
        popularidade: data.popularidade,
        origem: data.origem,
        imagem: data.imagem,
        status: "ativo", // Valor padrão
        Regras: {
          create: data.regras.map((regra: string) => ({ descricao: regra })),
        },
      },
    });

    return NextResponse.json(newModalidade, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar modalidade:', error);
    return NextResponse.json({ error: 'Erro ao criar modalidade' }, { status: 500 });
  }
}

// Função para atualizar uma modalidade esportiva existente
export async function PUT(req: Request) {
  const { id, ...data } = await req.json();

  try {
    const updatedModalidade = await prisma.modalidadeEsportiva.update({
      where: { id: Number(id) },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        numero_jogadores: data.numero_jogadores,
        categoria: data.categoria,
        equipamento_necessario: data.equipamento_necessario,
        popularidade: data.popularidade,
        origem: data.origem,
        imagem: data.imagem,
        Regras: {
          deleteMany: {}, // Deletar todas as regras antigas
          create: data.regras.map((regra: string) => ({ descricao: regra })),
        },
      },
      include: { Regras: true },
    });

    return NextResponse.json(updatedModalidade, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar modalidade:', error);
    return NextResponse.json({ error: 'Erro ao atualizar modalidade' }, { status: 500 });
  }
}

// Função para excluir uma modalidade esportiva
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID é necessário' }, { status: 400 });
  }

  try {
    await prisma.modalidadeEsportiva.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Modalidade excluída com sucesso' }, { status: 200 });
  } catch (err) {
    console.error('Erro ao excluir modalidade:', err);
    return NextResponse.json({ error: 'Erro ao excluir modalidade' }, { status: 500 });
  }
}
