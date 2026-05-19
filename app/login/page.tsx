import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>S</div>
          <div>
            <h1 style={styles.title}>SILOG</h1>
            <p style={styles.subtitle}>Acesse sua conta operacional</p>
          </div>
        </div>

        <Suspense fallback={<p style={styles.loading}>Carregando...</p>}>
          <LoginForm />
        </Suspense>

        <p style={styles.hint}>
          Desenvolvimento: <strong>admin@silog.com.br</strong> /{" "}
          <strong>silog123</strong>
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background:
      "radial-gradient(circle at top, rgba(37,99,235,0.18), transparent 45%), #0b1120",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.15)",
    background: "rgba(15,23,42,0.92)",
    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
  },
  logo: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "24px",
    color: "#fff",
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 800,
    color: "#f8fafc",
  },
  subtitle: {
    margin: "6px 0 0",
    fontSize: "14px",
    color: "#94a3b8",
  },
  loading: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "14px",
  },
  hint: {
    margin: "24px 0 0",
    fontSize: "12px",
    color: "#64748b",
    lineHeight: 1.6,
    textAlign: "center",
  },
};
