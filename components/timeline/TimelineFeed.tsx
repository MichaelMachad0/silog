'use client'

import { fetchLista } from '@/lib/fetch-lista'
import { useCallback, useEffect, useState } from 'react'

type Evento = {
  id: string
  tipo: string
  titulo: string
  descricao: string | null
  createdAt: string
  carga: {
    origem: string
    destino: string
    motorista: { nome: string }
  } | null
}

const TIPO_COR: Record<string, string> = {
  CARGA_CRIADA: '#94a3b8',
  MOTORISTA_VINCULADO: '#38bdf8',
  CARGA_LIBERADA: '#60a5fa',
  VIAGEM_INICIADA: '#f59e0b',
  CHEGADA_CLIENTE: '#22c55e',
  VIAGEM_CONCLUIDA: '#16a34a',
  MENSAGEM_ENVIADA: '#a78bfa',
  MENSAGEM_FALHA: '#ef4444',
  CARGA_CANCELADA: '#f87171',
  STATUS_ALTERADO: '#cbd5e1',
}

export function TimelineFeed() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)

  const carregar = useCallback(async () => {
    setLoading(true)
    try {
      setEventos(await fetchLista<Evento>('/api/timeline?limite=60'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    carregar()
    const interval = setInterval(carregar, 15000)
    return () => clearInterval(interval)
  }, [carregar])

  if (loading) {
    return <p style={s.muted}>Carregando timeline...</p>
  }

  if (eventos.length === 0) {
    return (
      <p style={s.muted}>
        Nenhum evento ainda. Crie uma carga para ver a operação em tempo real.
      </p>
    )
  }

  return (
    <div style={s.list}>
      {eventos.map((ev, i) => {
        const hora = new Date(ev.createdAt).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })
        const cor = TIPO_COR[ev.tipo] ?? '#3b82f6'

        return (
          <div key={ev.id} style={s.item}>
            <div style={s.rail}>
              <span style={{ ...s.dot, background: cor }} />
              {i < eventos.length - 1 ? <span style={s.line} /> : null}
            </div>
            <div style={s.body}>
              <div style={s.row}>
                <span style={s.time}>{hora}</span>
                <strong style={s.title}>{ev.titulo}</strong>
              </div>
              {ev.descricao ? <p style={s.desc}>{ev.descricao}</p> : null}
              {ev.carga ? (
                <p style={s.meta}>
                  {ev.carga.origem} → {ev.carga.destino} ·{' '}
                  {ev.carga.motorista.nome}
                </p>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  muted: { margin: 0, color: '#94a3b8' },
  list: { display: 'flex', flexDirection: 'column' },
  item: { display: 'flex', gap: '16px', paddingBottom: '20px' },
  rail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20px',
    flexShrink: 0,
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '999px',
    flexShrink: 0,
  },
  line: {
    flex: 1,
    width: '2px',
    background: 'rgba(148,163,184,0.2)',
    marginTop: '4px',
    minHeight: '24px',
  },
  body: { flex: 1 },
  row: { display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' },
  time: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#60a5fa',
    fontVariantNumeric: 'tabular-nums',
  },
  title: { fontSize: '15px', color: '#f1f5f9' },
  desc: { margin: '6px 0 0', color: '#cbd5e1', fontSize: '14px', lineHeight: 1.5 },
  meta: { margin: '4px 0 0', color: '#64748b', fontSize: '12px' },
}
