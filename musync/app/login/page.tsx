'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import './login.css'

export default function LoginPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  // Redirecionar se já estiver autenticado pelo Google
  useEffect(() => {
    if (session) {
      router.push('/samples')
    }
  }, [session, router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error || 'Erro ao fazer login.')
        return
      }

      localStorage.setItem('token', data.token)
      router.push('/samples')
    } catch (err) {
      console.error('Erro de login:', err)
      setErro('Erro interno.')
    }
  }

  return (
    <div className="login-container">
      <div className="top-right">
        <span>Ainda não é membro?</span>
        <Link href="/cadastro">
          <button className="signup-btn">Cadastre-se gratuitamente</button>
        </Link>
      </div>

      <div className="logo-container">
        <Image src="/logo-musync.png" alt="Logo" width={50} height={50} />
        <h1 className="musync-title">MUSYNC</h1>
      </div>

      <h2 className="login-title">Conecte-se</h2>

      <form className="login-box" onSubmit={handleLogin}>
        <div className="social-login">
          <button
            type="button"
            className="social-button google"
            onClick={() => signIn('google')}
          >
            <Image src="/google.png" alt="Google" width={24} height={24} />
          </button>

          {['facebook', 'apple', 'x'].map((provider) => (
            <button key={provider} className="social-button" type="button">
              <Image src={`/${provider}.png`} alt={provider} width={24} height={24} />
            </button>
          ))}
        </div>

        <div className="divider" />

        <input
          type="email"
          placeholder="Digite seu e-mail"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">Conecte-se</button>

        <Link href="/forgot-password" className="forgot-password">
          Esqueceu a senha?
        </Link>

        {erro && <p style={{ color: 'red', marginTop: '1rem' }}>{erro}</p>}
      </form>
    </div>
  )
}
