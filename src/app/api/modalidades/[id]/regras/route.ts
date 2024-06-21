// pages/api/modalidades/regras/routes.ts
'use server'

import { NextResponse } from 'next/server';
import prisma from '@/db/index';

// Rota para buscar todas as regras de uma modalidade esportiva
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const regras = await prisma.regras.findMany({
      where: { modalidade_esportiva_id: parseInt(params.id) },
    });
    return NextResponse.json(regras);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Rota para criar uma ou mais novas regras para uma modalidade esportiva
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const regras = await req.json();
    const insertedRules = await Promise.all(regras.map(async (regra: { descricao: string }) => {
      const newRegra = await prisma.regras.create({
        data: {
          modalidade_esportiva_id: parseInt(params.id),
          descricao: regra.descricao,
        },
      });
      return newRegra;
    }));
    return NextResponse.json(insertedRules, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0', 10);

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const {
      nome,
      descricao,
      numero_jogadores,
      categoria,
      equipamento_necessario,
      popularidade,
      origem,
      imagem,
      Regras,
    } = await request.json();

    const updatedModalidade = await prisma.modalidadeEsportiva.update({
      where: { id },
      data: {
        nome,
        descricao,
        numero_jogadores,
        categoria,
        equipamento_necessario,
        popularidade,
        origem,
        imagem,
        Regras: {
          deleteMany: {},
          create: Regras.map((regra: { descricao: string }) => ({
            descricao: regra.descricao,
          })),
        },
      },
      include: { Regras: true },
    });

    return NextResponse.json(updatedModalidade);
  } catch (error) {
    console.error('Erro ao atualizar modalidade:', error);
    return NextResponse.json({ error: 'Erro ao atualizar modalidade' }, { status: 500 });
  }
}