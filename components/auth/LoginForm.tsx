"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    setCarregando(true);

    const resultado = await signIn("credentials", {
      email,
      password: senha,
      redirect: false,
    });

    setCarregando(false);

    if (resultado?.error) {
      setErro("E-mail ou senha inválidos");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>
        E-mail
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={styles.input}
          placeholder="admin@silog.com.br"
        />
      </label>

      <label style={styles.label}>
        Senha
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          autoComplete="current-password"
          style={styles.input}
          placeholder="••••••••"
        />
      </label>

      {erro ? <p style={styles.erro}>{erro}</p> : null}

      <button type="submit" disabled={carregando} style={styles.button}>
        {carregando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#cbd5e1",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(148,163,184,0.25)",
    background: "rgba(15,23,42,0.8)",
    color: "#f8fafc",
    fontSize: "15px",
    outline: "none",
  },
  erro: {
    margin: 0,
    color: "#f87171",
    fontSize: "14px",
  },
  button: {
    marginTop: "8px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
  },
};
