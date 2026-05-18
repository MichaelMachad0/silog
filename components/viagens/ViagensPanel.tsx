'use client'

import { fetchLista } from '@/lib/fetch-lista'
import { useCallback, useEffect, useState } from 'react'

type Viagem = {
  id: string
  status: string
  iniciadaEm: string | null
  concluidaEm: string | null
  carga: { origem: string; destino: string; status: string }
  motorista: { nome: string }
  veiculo: { placa: string }
}

const STATUS_LABEL: Record<string, string> = {
  PLANEJADA: 'Planejada',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída',
  CANCELADA: 'Cancelada',
}

export function ViagensPanel() {
  const [viagens, setViagens] = useState<Viagem[]>([])
  const [loading, setLoading] = useState(true)

  const carregar = useCallback(async () => {
    setLoading(true)
    try {
      setViagens(await fetchLista<Viagem>('/api/viagens'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  if (loading) return <p style={s.muted}>Carregando viagens...</p>
  if (viagens.length === 0) return <p style={s.muted}>Nenhuma viagem registrada.</p>

  return (
    <div style={s.list}>
      {viagens.map((v) => (
        <article key={v.id} style={s.card}>
          <div style={s.header}>
            <h4 style={s.rota}>
              {v.carga.origem} → {v.carga.destino}
            </h4>
            <span style={s.badge}>{STATUS_LABEL[v.status] ?? v.status}</span>
          </div>
          <p style={s.meta}>
            {v.motorista.nome} · {v.veiculo.placa}
          </p>
        </article>
      ))}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  muted: { margin: 0, color: '#94a3b8' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  card: {
    padding: '16px',
    borderRadius: '14px',
    background: 'rgba(15,23,42,0.65)',
    border: '1px solid rgba(148,163,184,0.12)',
  },
  header: { display: 'flex', justifyContent: 'space-between', gap: '12px' },
  rota: { margin: 0, color: '#e2e8f0', fontSize: '16px' },
  badge: {
    padding: '4px 10px',
    borderRadius: '999px',
    background: 'rgba(37,99,235,0.2)',
    color: '#93c5fd',
    fontSize: '12px',
    fontWeight: 600,
  },
  meta: { margin: '8px 0 0', color: '#94a3b8', fontSize: '13px' },
}
