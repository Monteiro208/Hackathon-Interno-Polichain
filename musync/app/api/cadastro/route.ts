import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { nome, email, senha } = await req.json();

    if (!nome || !email || !senha) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });

    if (usuarioExistente) {
      return NextResponse.json({ error: 'E-mail já cadastrado.' }, { status: 409 });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada },
    });

    return NextResponse.json({ success: true, usuario: { id: novoUsuario.id, email: novoUsuario.email } });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
