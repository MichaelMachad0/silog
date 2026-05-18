'use client'

import { fetchLista } from '@/lib/fetch-lista'
import { useSession } from 'next-auth/react'
import { FormEvent, useCallback, useEffect, useState } from 'react'

type Motorista = {
  id: string
  nome: string
  cpf: string
  telefone: string | null
  status: string
  veiculos: { placa: string; tipo: string }[]
}

export function MotoristasPanel() {
  const { data: session } = useSession()
  const [lista, setLista] = useState<Motorista[]>([])
  const [loading, setLoading] = useState(true)
  const podeCriar = session?.user?.perfil !== 'MOTORISTA'

  const carregar = useCallback(async () => {
    setLoading(true)
    try {
      setLista(await fetchLista<Motorista>('/api/motoristas'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  async function criar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/motoristas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.get('nome'),
        cpf: form.get('cpf'),
        telefone: form.get('telefone'),
        cnh: form.get('cnh'),
      }),
    })
    if (res.ok) {
      e.currentTarget.reset()
      carregar()
    }
  }

  if (loading) return <p style={s.muted}>Carregando...</p>

  return (
    <div style={s.stack}>
      {podeCriar ? (
        <form onSubmit={criar} style={s.form}>
          <input name="nome" placeholder="Nome" required style={s.input} />
          <input name="cpf" placeholder="CPF" required style={s.input} />
          <input name="telefone" placeholder="Telefone" style={s.input} />
          <input name="cnh" placeholder="CNH" style={s.input} />
          <button type="submit" style={s.btn}>
            Cadastrar
          </button>
        </form>
      ) : null}

      {lista.map((m) => (
        <article key={m.id} style={s.card}>
          <h4 style={s.nome}>{m.nome}</h4>
          <p style={s.meta}>
            CPF {m.cpf} · {m.telefone ?? 'sem telefone'} · {m.status}
          </p>
          {m.veiculos.length > 0 ? (
            <p style={s.veiculos}>
              Veículos: {m.veiculos.map((v) => v.placa).join(', ')}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  stack: { display: 'flex', flexDirection: 'column', gap: '14px' },
  muted: { color: '#94a3b8' },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '10px',
    marginBottom: '8px',
  },
  input: {
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid rgba(148,163,184,0.2)',
    background: 'rgba(15,23,42,0.6)',
    color: '#f8fafc',
  },
  btn: {
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  card: {
    padding: '16px',
    borderRadius: '14px',
    background: 'rgba(15,23,42,0.65)',
    border: '1px solid rgba(148,163,184,0.12)',
  },
  nome: { margin: 0, color: '#f1f5f9' },
  meta: { margin: '6px 0 0', color: '#94a3b8', fontSize: '13px' },
  veiculos: { margin: '4px 0 0', color: '#64748b', fontSize: '12px' },
}
