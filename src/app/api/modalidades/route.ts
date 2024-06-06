import { NextResponse } from 'next/server';
import prisma from '@/db/index';

// Rota para buscar todas as modalidades esportivas
export async function GET() {
  try {
    const modalidades = await prisma.modalidadeEsportiva.findMany();
    return NextResponse.json(modalidades);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Rota para criar uma nova modalidade esportiva
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
