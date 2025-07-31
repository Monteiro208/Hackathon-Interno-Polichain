import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { gerarToken } from '@/lib/jwt'

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json()

    if (!email || !senha) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 })
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } })

    if (!usuario) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 })
    }

    const token = gerarToken({ id: usuario.id, email: usuario.email })

    return NextResponse.json({ success: true, token, usuario: { id: usuario.id, nome: usuario.nome } })
  } catch (err) {
    console.error('Erro no login:', err)
    return NextResponse.json({ error: 'Erro no servidor.' }, { status: 500 })
  }
}
