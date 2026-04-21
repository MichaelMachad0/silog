import Link from "next/link";

type ModuleCardProps = {
  nome: string;
  href: string;
};

export function ModuleCard({ nome, href }: ModuleCardProps) {
  return (
    <div style={styles.card}>
      <span style={styles.name}>{nome}</span>
      <Link href={href} style={styles.button}>
        Abrir
      </Link>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    background: "rgba(15,23,42,0.65)",
    border: "1px solid rgba(148,163,184,0.12)",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  name: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#e2e8f0",
    lineHeight: 1.4,
  },
  button: {
    textDecoration: "none",
    textAlign: "center",
    border: "none",
    background: "#1d4ed8",
    color: "#fff",
    borderRadius: "10px",
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 700,
  },
};