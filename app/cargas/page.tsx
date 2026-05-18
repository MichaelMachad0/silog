import { CargasPanel } from "@/components/cargas/CargasPanel";
import { Topbar } from "@/components/layout/Topbar";
import { SectionCard } from "@/components/dashboard/SectionCard";

export default function CargasPage() {
  return (
    <div style={styles.wrapper}>
      <Topbar
        titulo="Cargas"
        subtitulo="Rastreamento operacional e histórico de eventos"
      />

      <SectionCard
        titulo="Painel de Cargas"
        subtitulo="Fase 2 — rastreamento"
      >
        <CargasPanel />
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