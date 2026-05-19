import { Topbar } from "@/components/layout/Topbar";
import { SectionCard } from "@/components/dashboard/SectionCard";

export default function MotoristasPage() {
  return (
    <div style={styles.wrapper}>
      <Topbar
        titulo="Motoristas"
        subtitulo="Gestão de cadastro e documentação"
      />

      <SectionCard
        titulo="Módulo de Motoristas"
        subtitulo="Estrutura inicial"
      >
        <p style={styles.text}>
          Aqui ficará o cadastro de motoristas, documentos, status, vencimentos,
          contatos e vínculo com veículos.
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