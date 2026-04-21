type SectionCardProps = {
    titulo: string;
    subtitulo?: string;
    children: React.ReactNode;
  };
  
  export function SectionCard({
    titulo,
    subtitulo,
    children,
  }: SectionCardProps) {
    return (
      <div style={styles.panel}>
        <div style={styles.header}>
          <h3 style={styles.title}>{titulo}</h3>
          {subtitulo ? <p style={styles.subtitle}>{subtitulo}</p> : null}
        </div>
  
        {children}
      </div>
    );
  }
  
  const styles: { [key: string]: React.CSSProperties } = {
    panel: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(148,163,184,0.15)",
      borderRadius: "20px",
      padding: "22px",
      boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
    },
    header: {
      marginBottom: "18px",
    },
    title: {
      margin: 0,
      fontSize: "20px",
      fontWeight: 800,
      color: "#f8fafc",
    },
    subtitle: {
      margin: "6px 0 0 0",
      color: "#94a3b8",
      fontSize: "13px",
    },
  };