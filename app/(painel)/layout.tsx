import { auth } from "@/auth";
import { Sidebar } from "@/components/layout/Sidebar";

const menu = [
  { label: "Dashboard", href: "/" },
  { label: "Motoristas", href: "/motoristas" },
  { label: "Veículos", href: "/veiculos" },
  { label: "Cargas", href: "/cargas" },
  { label: "Fretes", href: "/fretes" },
];

export default async function PainelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <main style={styles.page}>
      <Sidebar
        menu={menu}
        usuario={
          session?.user
            ? {
                nome: session.user.name ?? session.user.email ?? "Usuário",
                email: session.user.email ?? "",
                perfil: session.user.perfil,
              }
            : undefined
        }
      />
      <section style={styles.content}>{children}</section>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
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
