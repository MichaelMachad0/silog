'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useState } from 'react'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErro(null)

    const form = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      email: form.get('email'),
      senha: form.get('senha'),
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setErro('E-mail ou senha inválidos')
      return
    }

    router.push(params.get('callbackUrl') ?? '/timeline')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} style={s.card}>
      <h1 style={s.title}>SILOG</h1>
      <p style={s.sub}>Acesso ao sistema logístico</p>

      {erro ? <p style={s.erro}>{erro}</p> : null}

      <label style={s.label}>
        E-mail
        <input name="email" type="email" required style={s.input} />
      </label>
      <label style={s.label}>
        Senha
        <input name="senha" type="password" required style={s.input} />
      </label>

      <button type="submit" disabled={loading} style={s.btn}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      <p style={s.hint}>Dev: admin@silog.com / admin123</p>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div style={s.page}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0b1120',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: '20px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: { margin: 0, fontSize: '28px', color: '#f8fafc' },
  sub: { margin: 0, color: '#94a3b8', fontSize: '14px' },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    color: '#cbd5e1',
    fontSize: '13px',
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid rgba(148,163,184,0.25)',
    background: 'rgba(15,23,42,0.8)',
    color: '#f8fafc',
    fontSize: '14px',
  },
  btn: {
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '8px',
  },
  erro: {
    margin: 0,
    padding: '10px',
    borderRadius: '8px',
    background: 'rgba(239,68,68,0.15)',
    color: '#fca5a5',
    fontSize: '13px',
  },
  hint: { margin: '8px 0 0', fontSize: '12px', color: '#64748b', textAlign: 'center' },
}
