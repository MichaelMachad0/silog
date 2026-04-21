type TopbarProps = {
    titulo: string;
    subtitulo: string;
  };
  
  export function Topbar({ titulo, subtitulo }: TopbarProps) {
    return (
      <header style={styles.topbar}>
        <div>
          <p style={styles.topbarTag}>Painel ERP</p>
          <h2 style={styles.topbarTitle}>{titulo}</h2>
          <p style={styles.topbarSubtitle}>{subtitulo}</p>
        </div>
  
        <div style={styles.topbarActions}>
          <button style={styles.secondaryButton}>Exportar</button>
          <button style={styles.primaryButton}>Nova Carga</button>
        </div>
      </header>
    );
  }
  
  const styles: { [key: string]: React.CSSProperties } = {
    topbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      padding: "4px 4px 8px 4px",
      flexWrap: "wrap",
    },
    topbarTag: {
      margin: 0,
      color: "#60a5fa",
      fontSize: "12px",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
    topbarTitle: {
      margin: "6px 0 0 0",
      fontSize: "28px",
      fontWeight: 800,
      color: "#f8fafc",
    },
    topbarSubtitle: {
      margin: "6px 0 0 0",
      color: "#94a3b8",
      fontSize: "14px",
    },
    topbarActions: {
      display: "flex",
      gap: "12px",
    },
    primaryButton: {
      border: "none",
      background: "#2563eb",
      color: "#fff",
      padding: "12px 18px",
      borderRadius: "12px",
      fontWeight: 700,
      cursor: "pointer",
    },
    secondaryButton: {
      border: "1px solid rgba(148,163,184,0.25)",
      background: "rgba(255,255,255,0.04)",
      color: "#e5e7eb",
      padding: "12px 18px",
      borderRadius: "12px",
      fontWeight: 700,
      cursor: "pointer",
    },
  };