type KpiCardProps = {
    titulo: string;
    valor: string;
    detalhe: string;
  };
  
  export function KpiCard({ titulo, valor, detalhe }: KpiCardProps) {
    return (
      <div style={styles.card}>
        <span style={styles.label}>{titulo}</span>
        <strong style={styles.value}>{valor}</strong>
        <p style={styles.detail}>{detalhe}</p>
      </div>
    );
  }
  
  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(148,163,184,0.15)",
      borderRadius: "18px",
      padding: "20px",
      boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
    },
    label: {
      display: "block",
      fontSize: "13px",
      color: "#94a3b8",
      marginBottom: "10px",
    },
    value: {
      display: "block",
      fontSize: "30px",
      fontWeight: 800,
      color: "#f8fafc",
      marginBottom: "8px",
    },
    detail: {
      margin: 0,
      fontSize: "13px",
      color: "#cbd5e1",
    },
  };