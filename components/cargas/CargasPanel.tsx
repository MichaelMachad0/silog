'use client'

import { STATUS_LABEL, TRANSICOES_VALIDAS } from '@/lib/carga-status'
import { fetchLista } from '@/lib/fetch-lista'
import { StatusCarga, StatusMensagem } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { FormEvent, useCallback, useEffect, useState } from 'react'

type CargaEvento = {
  id: string
  statusAnterior: StatusCarga | null
  statusNovo: StatusCarga
  observacao: string | null
  createdAt: string
}

type Carga = {
  id: string
  origem: string
  destino: string
  status: StatusCarga
  motorista: { id: string; nome: string; telefone: string | null }
  veiculo: { id: string; placa: string; tipo: string }
  eventos: CargaEvento[]
  mensagens: {
    id: string
    status: StatusMensagem
    erro: string | null
    enviadaEm: string | null
  }[]
}

const MSG_LABEL: Record<StatusMensagem, string> = {
  PENDENTE: 'WhatsApp pendente',
  ENVIADA: 'WhatsApp enviado',
  FALHA: 'Falha no WhatsApp',
  IGNORADA: 'WhatsApp não enviado',
}

const STATUS_COLOR: Record<StatusCarga, string> = {
  CRIADA: '#94a3b8',
  LIBERADA: '#38bdf8',
  EM_TRANSITO: '#f59e0b',
  ENTREGUE: '#22c55e',
  CANCELADA: '#ef4444',
}

type MotoristaOpt = { id: string; nome: string }
type VeiculoOpt = { id: string; placa: string; motoristaId: string }

export function CargasPanel() {
  const { data: session } = useSession()
  const podeCriar = session?.user?.perfil !== 'MOTORISTA'
  const [cargas, setCargas] = useState<Carga[]>([])
  const [motoristas, setMotoristas] = useState<MotoristaOpt[]>([])
  const [veiculos, setVeiculos] = useState<VeiculoOpt[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [atualizando, setAtualizando] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    setLoading(true)
    setErro(null)
    try {
      const res = await fetch('/api/cargas')
      if (res.status === 401) {
        setErro('Faça login para acessar as cargas.')
        setCargas([])
        return
      }
      if (!res.ok) throw new Error('Falha ao carregar cargas')
      const data = await res.json()
      setCargas(Array.isArray(data) ? data : [])
    } catch {
      setErro('Não foi possível carregar as cargas. Verifique o banco e a migração.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    carregar()
    if (podeCriar) {
      fetchLista<MotoristaOpt>('/api/motoristas').then(setMotoristas)
      fetchLista<VeiculoOpt>('/api/veiculos').then(setVeiculos)
    }
  }, [carregar, podeCriar])

  async function criarCarga(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/cargas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origem: form.get('origem'),
        destino: form.get('destino'),
        motoristaId: form.get('motoristaId'),
        veiculoId: form.get('veiculoId'),
        peso: form.get('peso') ? Number(form.get('peso')) : null,
      }),
    })
    if (res.ok) {
      e.currentTarget.reset()
      carregar()
    }
  }

  async function avancarStatus(cargaId: string, status: StatusCarga) {
    setAtualizando(cargaId)
    setErro(null)
    try {
      const res = await fetch(`/api/cargas/${cargaId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Falha ao atualizar status')
      }
      await carregar()
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao atualizar status')
    } finally {
      setAtualizando(null)
    }
  }

  if (loading) {
    return <p style={styles.muted}>Carregando cargas...</p>
  }

  return (
    <div style={styles.stack}>
      {erro ? <p style={styles.erro}>{erro}</p> : null}

      {podeCriar ? (
        <form onSubmit={criarCarga} style={styles.form}>
          <input name="origem" placeholder="Origem" required style={styles.input} />
          <input name="destino" placeholder="Destino" required style={styles.input} />
          <select name="motoristaId" required style={styles.input}>
            <option value="">Motorista</option>
            {motoristas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
          <select name="veiculoId" required style={styles.input}>
            <option value="">Veículo</option>
            {veiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.placa}
              </option>
            ))}
          </select>
          <input name="peso" type="number" placeholder="Peso (kg)" style={styles.input} />
          <button type="submit" style={styles.btnForm}>
            Nova carga
          </button>
        </form>
      ) : null}

      {cargas.length === 0 ? (
        <p style={styles.muted}>
          Nenhuma carga cadastrada. Use POST /api/cargas para testar o rastreamento.
        </p>
      ) : (
        cargas.map((carga) => (
          <article key={carga.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h4 style={styles.rota}>
                  {carga.origem} → {carga.destino}
                </h4>
                <p style={styles.meta}>
                  {carga.motorista.nome} · {carga.veiculo.placa} ({carga.veiculo.tipo})
                </p>
              </div>
              <span
                style={{
                  ...styles.badge,
                  background: `${STATUS_COLOR[carga.status]}22`,
                  color: STATUS_COLOR[carga.status],
                  borderColor: `${STATUS_COLOR[carga.status]}55`,
                }}
              >
                {STATUS_LABEL[carga.status]}
              </span>
            </div>

            <div style={styles.actions}>
              {TRANSICOES_VALIDAS[carga.status].map((proximo) => (
                <button
                  key={proximo}
                  type="button"
                  disabled={atualizando === carga.id}
                  style={styles.btn}
                  onClick={() => avancarStatus(carga.id, proximo)}
                >
                  → {STATUS_LABEL[proximo]}
                </button>
              ))}
            </div>

            {carga.mensagens[0] ? (
              <p
                style={{
                  ...styles.msgHint,
                  color:
                    carga.mensagens[0].status === 'ENVIADA'
                      ? '#86efac'
                      : carga.mensagens[0].status === 'FALHA'
                        ? '#fca5a5'
                        : '#94a3b8',
                }}
              >
                {MSG_LABEL[carga.mensagens[0].status]}
                {carga.mensagens[0].erro ? ` · ${carga.mensagens[0].erro}` : ''}
              </p>
            ) : null}

            {carga.eventos.length > 0 ? (
              <ul style={styles.timeline}>
                {carga.eventos.map((ev) => (
                  <li key={ev.id} style={styles.timelineItem}>
                    <span style={styles.timelineDot} />
                    <span style={styles.timelineText}>
                      {ev.statusAnterior
                        ? `${STATUS_LABEL[ev.statusAnterior]} → ${STATUS_LABEL[ev.statusNovo]}`
                        : STATUS_LABEL[ev.statusNovo]}
                      {ev.observacao ? ` · ${ev.observacao}` : ''}
                      <span style={styles.timelineDate}>
                        {' '}
                        · {new Date(ev.createdAt).toLocaleString('pt-BR')}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  stack: { display: 'flex', flexDirection: 'column', gap: '14px' },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
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
  btnForm: {
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  muted: { margin: 0, color: '#94a3b8', lineHeight: 1.6 },
  erro: {
    margin: 0,
    padding: '12px 14px',
    borderRadius: '12px',
    background: 'rgba(239,68,68,0.12)',
    color: '#fca5a5',
    fontSize: '14px',
  },
  card: {
    background: 'rgba(15,23,42,0.65)',
    border: '1px solid rgba(148,163,184,0.12)',
    borderRadius: '16px',
    padding: '18px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    flexWrap: 'wrap',
  },
  rota: { margin: 0, fontSize: '17px', fontWeight: 700, color: '#e2e8f0' },
  meta: { margin: '6px 0 0', fontSize: '13px', color: '#94a3b8' },
  badge: {
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
    border: '1px solid',
  },
  actions: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' },
  btn: {
    padding: '8px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(59,130,246,0.35)',
    background: 'rgba(37,99,235,0.15)',
    color: '#bfdbfe',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  msgHint: { margin: '12px 0 0', fontSize: '12px', lineHeight: 1.5 },
  timeline: {
    margin: '16px 0 0',
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  timelineItem: { display: 'flex', alignItems: 'flex-start', gap: '10px' },
  timelineDot: {
    width: '8px',
    height: '8px',
    borderRadius: '999px',
    background: '#3b82f6',
    marginTop: '6px',
    flexShrink: 0,
  },
  timelineText: { color: '#cbd5e1', fontSize: '13px', lineHeight: 1.5 },
  timelineDate: { color: '#64748b' },
}
