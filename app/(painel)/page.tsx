import { Topbar } from "@/components/layout/Topbar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { ModuleCard } from "@/components/dashboard/ModuleCard";

export default function Home() {
  const indicadores = [
    { titulo: "Motoristas Ativos", valor: "128", detalhe: "Base operacional" },
    { titulo: "Veículos", valor: "94", detalhe: "Cavalos e carretas" },
    { titulo: "Cargas em Andamento", valor: "16", detalhe: "Monitoramento ao vivo" },
    { titulo: "Fretes do Dia", valor: "R$ 48.900", detalhe: "Movimentação atual" },
  ];

  const operacoes = [
    {
      titulo: "Núcleo Operacional",
      descricao:
        "Gestão de motoristas, veículos, cargas, fretes e controle diário da operação logística.",
    },
    {
      titulo: "Camada de Automação",
      descricao:
        "Leitura de XML, integração com TMS, rotinas automáticas, eventos e processamento de mensagens.",
    },
    {
      titulo: "Camada de Inteligência",
      descricao:
        "Sugestão de motorista, análise de frete, radar operacional e apoio à decisão logística.",
    },
  ];

  const atividades = [
    "Carga Juazeiro - BA em fase de liberação",
    "2 motoristas com documentação próxima do vencimento",
    "4 fretes aguardando fechamento financeiro",
    "Integração backend + Prisma em andamento",
  ];

  const modulos = [
    { nome: "Cadastro de Motoristas", href: "/motoristas" },
    { nome: "Cadastro de Veículos", href: "/veiculos" },
    { nome: "Painel de Cargas", href: "/cargas" },
    { nome: "Gestão de Fretes", href: "/fretes" },
  ];

  return (
    <div style={styles.wrapper}>
      <Topbar
        titulo="Dashboard SILOG"
        subtitulo="Visão geral da operação logística"
      />

      <section style={styles.hero}>
        <div>
          <p style={styles.heroBadge}>Operação Logística Inteligente</p>
          <h3 style={styles.heroTitle}>
            Controle operacional, automação e inteligência em uma única plataforma
          </h3>
          <p style={styles.heroText}>
            Estrutura inicial do SILOG pronta para evoluir para módulos reais
            de cadastro, operação, financeiro e monitoramento logístico.
          </p>
        </div>
      </section>

      <section style={styles.kpiGrid}>
        {indicadores.map((item) => (
          <KpiCard
            key={item.titulo}
            titulo={item.titulo}
            valor={item.valor}
            detalhe={item.detalhe}
          />
        ))}
      </section>

      <section style={styles.mainGrid}>
        <SectionCard
          titulo="Estrutura do Sistema"
          subtitulo="Arquitetura principal do SILOG"
        >
          <div style={styles.layerGrid}>
            {operacoes.map((item) => (
              <div key={item.titulo} style={styles.layerCard}>
                <h4 style={styles.layerTitle}>{item.titulo}</h4>
                <p style={styles.layerText}>{item.descricao}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          titulo="Atividades Recentes"
          subtitulo="Resumo operacional"
        >
          <div style={styles.activityList}>
            {atividades.map((item) => (
              <div key={item} style={styles.activityItem}>
                <span style={styles.activityDot} />
                <span style={styles.activityText}>{item}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section>
        <SectionCard
          titulo="Módulos Prioritários"
          subtitulo="Acesso rápido"
        >
          <div style={styles.moduleGrid}>
            {modulos.map((item) => (
              <ModuleCard key={item.href} nome={item.nome} href={item.href} />
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  hero: {
    background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(14,165,233,0.08))",
    border: "1px solid rgba(59,130,246,0.18)",
    borderRadius: "22px",
    padding: "28px",
    boxShadow: "0 16px 40px rgba(0,0,0,0.22)",
  },
  heroBadge: {
    display: "inline-block",
    margin: 0,
    marginBottom: "12px",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.16)",
    color: "#bfdbfe",
    fontSize: "12px",
    fontWeight: 700,
  },
  heroTitle: {
    margin: 0,
    fontSize: "30px",
    fontWeight: 800,
    color: "#f8fafc",
    maxWidth: "780px",
    lineHeight: 1.2,
  },
  heroText: {
    marginTop: "14px",
    marginBottom: 0,
    color: "#cbd5e1",
    fontSize: "15px",
    lineHeight: 1.7,
    maxWidth: "780px",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },
  layerGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "14px",
  },
  layerCard: {
    background: "rgba(15,23,42,0.65)",
    border: "1px solid rgba(148,163,184,0.12)",
    borderRadius: "16px",
    padding: "18px",
  },
  layerTitle: {
    margin: "0 0 8px 0",
    fontSize: "17px",
    fontWeight: 700,
    color: "#e2e8f0",
  },
  layerText: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.6,
    fontSize: "14px",
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  activityItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "12px 0",
    borderBottom: "1px solid rgba(148,163,184,0.1)",
  },
  activityDot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    background: "#22c55e",
    marginTop: "6px",
    flexShrink: 0,
  },
  activityText: {
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  moduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
};