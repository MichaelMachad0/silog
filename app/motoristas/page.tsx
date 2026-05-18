import { MotoristasPanel } from '@/components/motoristas/MotoristasPanel'
import { Topbar } from '@/components/layout/Topbar'
import { SectionCard } from '@/components/dashboard/SectionCard'

export default function MotoristasPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Topbar titulo="Motoristas" subtitulo="Cadastro e vínculo com veículos" />
      <SectionCard titulo="Motoristas" subtitulo="Domínio principal">
        <MotoristasPanel />
      </SectionCard>
    </div>
  )
}
