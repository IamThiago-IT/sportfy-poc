// pages/api/modalidades/[id].ts
'use server'

import { NextResponse } from 'next/server';
import prisma from '@/db/index';

// Rota para buscar uma modalidade esportiva pelo ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const modalidade = await prisma.modalidadeEsportiva.findUnique({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json(modalidade);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Rota para atualizar uma modalidade esportiva existente
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Extraímos o ID da URL
    const data = req.json(); // Obtemos os dados enviados na requisição

    // Verificamos se a modalidade existe antes de atualizá-la
    const existingModalidade = await prisma.modalidadeEsportiva.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingModalidade) {
      return NextResponse.json({ error: 'Modalidade não encontrada' }, { status: 404 });
    }

    // Atualizamos a modalidade com os novos dados
    const updatedModalidade = await prisma.modalidadeEsportiva.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(updatedModalidade);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Rota para excluir uma modalidade esportiva existente
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.modalidadeEsportiva.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
