import './globals.css'
import { Providers } from '@/app/providers'
import { Sidebar } from '@/components/layout/Sidebar'

export const metadata = {
  title: 'SILOG',
  description: 'Sistema Inteligente Logístico',
}

const menu = [
  { label: 'Dashboard', href: '/' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Motoristas', href: '/motoristas' },
  { label: 'Veículos', href: '/veiculos' },
  { label: 'Cargas', href: '/cargas' },
  { label: 'Viagens', href: '/viagens' },
  { label: 'Fretes', href: '/fretes' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body style={styles.body}>
        <Providers>
          <main style={styles.page}>
            <Sidebar menu={menu} />
            <section style={styles.content}>{children}</section>
          </main>
        </Providers>
      </body>
    </html>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    background: '#0b1120',
    color: '#e5e7eb',
    fontFamily: 'Arial, sans-serif',
  },
  page: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    background: '#0b1120',
  },
  content: {
    padding: '24px',
  },
}
