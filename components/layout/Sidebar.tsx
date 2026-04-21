"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  href: string;
};

type SidebarProps = {
  menu: MenuItem[];
};

export function Sidebar({ menu }: SidebarProps) {
  const pathname = usePathname();

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
            const isActive = pathname === item.href;

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
            );
          })}
        </nav>
      </div>

      <div style={styles.sidebarFooter}>
        <div style={styles.statusCard}>
          <span style={styles.statusLabel}>Status do Sistema</span>
          <strong style={styles.statusValue}>Online</strong>
          <p style={styles.statusText}>
            Layout persistente ativo e navegação pronta para módulos.
          </p>
        </div>
      </div>
    </aside>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    borderRight: "1px solid rgba(148,163,184,0.15)",
    padding: "24px 18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
    position: "sticky",
    top: 0,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
  },
  logo: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "22px",
    color: "#fff",
    boxShadow: "0 10px 24px rgba(37,99,235,0.35)",
    flexShrink: 0,
  },
  logoTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 800,
    color: "#f8fafc",
  },
  logoSubtitle: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    color: "#94a3b8",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  navItem: {
    display: "block",
    width: "100%",
    textAlign: "left",
    textDecoration: "none",
    border: "1px solid transparent",
    background: "transparent",
    color: "#cbd5e1",
    padding: "12px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
  navItemActive: {
    background: "rgba(37,99,235,0.16)",
    color: "#dbeafe",
    border: "1px solid rgba(59,130,246,0.35)",
  },
  sidebarFooter: {
    marginTop: "24px",
  },
  statusCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: "18px",
    padding: "16px",
  },
  statusLabel: {
    display: "block",
    fontSize: "12px",
    color: "#94a3b8",
    marginBottom: "8px",
  },
  statusValue: {
    display: "block",
    fontSize: "20px",
    color: "#22c55e",
    marginBottom: "8px",
  },
  statusText: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: "13px",
    lineHeight: 1.5,
  },
};