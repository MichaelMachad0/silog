import { ViagensPanel } from '@/components/viagens/ViagensPanel'
import { Topbar } from '@/components/layout/Topbar'
import { SectionCard } from '@/components/dashboard/SectionCard'

export default function ViagensPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Topbar titulo="Viagens" subtitulo="Execução das rotas vinculadas às cargas" />
      <SectionCard titulo="Viagens ativas" subtitulo="Status sincronizado com a carga">
        <ViagensPanel />
      </SectionCard>
    </div>
  )
}
