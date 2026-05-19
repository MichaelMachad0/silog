"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={styles.button}
    >
      Sair
    </button>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    width: "100%",
    marginTop: "10px",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(148,163,184,0.2)",
    background: "transparent",
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
