import { Topbar } from "@/components/layout/Topbar";
import { SectionCard } from "@/components/dashboard/SectionCard";

export default function VeiculosPage() {
  return (
    <div style={styles.wrapper}>
      <Topbar
        titulo="Veículos"
        subtitulo="Gestão de cavalo, carreta e documentos"
      />

      <SectionCard
        titulo="Módulo de Veículos"
        subtitulo="Estrutura inicial"
      >
        <p style={styles.text}>
          Aqui ficará o cadastro de veículos, CRLV, tipo de conjunto, placas,
          proprietário e vínculo com motoristas.
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