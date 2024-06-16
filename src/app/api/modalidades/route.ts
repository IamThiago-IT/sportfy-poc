import { NextResponse } from 'next/server';
import prisma from '@/db/index';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nome_startsWith = searchParams.get('nome_startsWith');
  
  console.log('Parâmetro nome_startsWith:', nome_startsWith);

  try {
    let modalidades;
    if (nome_startsWith) {
      modalidades = await prisma.modalidadeEsportiva.findMany({
        where: {
          nome: {
            startsWith: nome_startsWith,
          },
        },
      });
    } else {
      modalidades = await prisma.modalidadeEsportiva.findMany();
    }

    console.log('Modalidades encontradas:', modalidades);

    return NextResponse.json(modalidades, { status: 200 });
  } catch (err) {
    console.error('Erro ao buscar modalidades:', err);
    return NextResponse.json({ error: 'Erro ao buscar modalidades' }, { status: 500 });
  }
}



export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Adicionando o campo "status" com valor padrão "ativo"
    const newData = { ...data, status: 'ativo' }; // Atualize para "ativo"
    console.log('Dados recebidos para criação:', newData);
    
    const novaModalidade = await prisma.modalidadeEsportiva.create({ data: newData });
    return NextResponse.json(novaModalidade, { status: 201 });
  } catch (err) {
    console.error('Erro ao criar modalidade:', err);
    return NextResponse.json({ error: 'Erro ao criar modalidade' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID é necessário' }, { status: 400 });
  }

  try {
    const data = await request.json();
    const updatedModalidade = await prisma.modalidadeEsportiva.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedModalidade, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao atualizar modalidade' }, { status: 500 });
  }
}

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
    return NextResponse.json({ message: 'Modalidade excluída com sucesso' }, { status: 200 }); // Usando 200 com uma mensagem de sucesso
  } catch (err) {
    console.error('Erro ao excluir modalidade:', err);
    return NextResponse.json({ error: 'Erro ao excluir modalidade' }, { status: 500 });
  }
}
