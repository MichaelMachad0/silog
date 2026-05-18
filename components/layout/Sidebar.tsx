'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

type MenuItem = {
  label: string
  href: string
}

type SidebarProps = {
  menu: MenuItem[]
}

const PERFIL_LABEL: Record<string, string> = {
  ADMIN: 'Administrador',
  OPERADOR: 'Operador',
  MOTORISTA: 'Motorista',
}

export function Sidebar({ menu }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  if (pathname === '/login') return null

  return (
    <aside style={styles.sidebar}>
      <div>
        <div style={styles.logoBox}>
          <div style={styles.logo}>S</div>
          <div>
            <h1 style={styles.logoTitle}>SILOG</h1>
            <p style={styles.logoSubtitle}>Sistema Inteligente Logístico</p>
          </div>
        </div>

        <nav style={styles.nav}>
          {menu.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div style={styles.sidebarFooter}>
        {session?.user ? (
          <div style={styles.userCard}>
            <strong style={styles.userName}>{session.user.name}</strong>
            <span style={styles.userRole}>
              {PERFIL_LABEL[session.user.perfil] ?? session.user.perfil}
            </span>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/login' })}
              style={styles.logoutBtn}
            >
              Sair
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
    borderRight: '1px solid rgba(148,163,184,0.15)',
    padding: '24px 18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    position: 'sticky',
    top: 0,
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '28px',
  },
  logo: {
    width: '46px',
    height: '46px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '22px',
    color: '#fff',
    flexShrink: 0,
  },
  logoTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 800,
    color: '#f8fafc',
  },
  logoSubtitle: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#94a3b8',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  navItem: {
    display: 'block',
    textDecoration: 'none',
    border: '1px solid transparent',
    background: 'transparent',
    color: '#cbd5e1',
    padding: '12px 14px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
  },
  navItemActive: {
    background: 'rgba(37,99,235,0.16)',
    color: '#dbeafe',
    border: '1px solid rgba(59,130,246,0.35)',
  },
  sidebarFooter: { marginTop: '24px' },
  userCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: '18px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  userName: { color: '#f8fafc', fontSize: '14px' },
  userRole: { color: '#94a3b8', fontSize: '12px' },
  logoutBtn: {
    marginTop: '8px',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid rgba(148,163,184,0.2)',
    background: 'transparent',
    color: '#cbd5e1',
    cursor: 'pointer',
    fontSize: '13px',
  },
}
