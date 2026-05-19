import { Topbar } from "@/components/layout/Topbar";
import { SectionCard } from "@/components/dashboard/SectionCard";

export default function FretesPage() {
  return (
    <div style={styles.wrapper}>
      <Topbar
        titulo="Fretes"
        subtitulo="Gestão financeira e operacional dos fretes"
      />

      <SectionCard
        titulo="Módulo de Fretes"
        subtitulo="Estrutura inicial"
      >
        <p style={styles.text}>
          Aqui ficará o controle de frete empresa, frete motorista, margem,
          custos logísticos, impostos e acompanhamento financeiro da operação.
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