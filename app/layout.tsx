import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title: "SILOG",
  description: "Sistema Inteligente Logístico",
};

const menu = [
  { label: "Dashboard", href: "/" },
  { label: "Motoristas", href: "/motoristas" },
  { label: "Veículos", href: "/veiculos" },
  { label: "Cargas", href: "/cargas" },
  { label: "Fretes", href: "/fretes" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={styles.body}>
        <main style={styles.page}>
          <Sidebar menu={menu} />
          <section style={styles.content}>{children}</section>
        </main>
      </body>
    </html>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    background: "#0b1120",
    color: "#e5e7eb",
    fontFamily: "Arial, sans-serif",
  },
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    background: "#0b1120",
  },
  content: {
    padding: "24px",
  },
};

