import { Topbar } from "@/components/layout/Topbar";
import { SectionCard } from "@/components/dashboard/SectionCard";

export default function CargasPage() {
  return (
    <div style={styles.wrapper}>
      <Topbar
        titulo="Cargas"
        subtitulo="Controle operacional de cargas e viagens"
      />

      <SectionCard
        titulo="Módulo de Cargas"
        subtitulo="Estrutura inicial"
      >
        <p style={styles.text}>
          Aqui ficará o painel de cargas, origem, destino, cliente, peso,
          motorista vinculado, status operacional e documentos fiscais.
        </p>
      </SectionCard>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  text: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.7,
  },
};