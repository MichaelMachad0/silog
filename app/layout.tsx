import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata = {
  title: "SILOG",
  description: "Sistema Inteligente Logístico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={styles.body}>
        <SessionProvider>{children}</SessionProvider>
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
};
