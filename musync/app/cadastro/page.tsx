'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './cadastro.css'

export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error || 'Erro ao cadastrar.')
      } else {
        // Sucesso: redireciona para a página de login
        router.push('/login')
      }
    } catch (err) {
      setErro('Erro ao cadastrar.')
    }
  }

  return (
    <div className="cadastro-container">
      <div className="logo-container">
        <Image src="/logo-musync.png" alt="Logo" width={50} height={50} />
        <h1 className="musync-title">MUSYNC</h1>
      </div>

      <h2 className="cadastro-title">Crie sua conta</h2>

      <form className="cadastro-box" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          className="input"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="signup-btn">
          Cadastrar
        </button>
        {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}
      </form>

      <div className="back-to-login">
        Já tem uma conta? <Link href="/login">Entrar</Link>
      </div>
    </div>
  )
}
