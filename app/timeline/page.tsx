import { TimelineFeed } from '@/components/timeline/TimelineFeed'
import { Topbar } from '@/components/layout/Topbar'
import { SectionCard } from '@/components/dashboard/SectionCard'

export default function TimelinePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Topbar
        titulo="Timeline Operacional"
        subtitulo="Operação em tempo real — o que a transportadora acompanha o dia todo"
      />
      <SectionCard titulo="Ao vivo" subtitulo="Atualiza a cada 15 segundos">
        <TimelineFeed />
      </SectionCard>
    </div>
  )
}
