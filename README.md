🚛 SILOG — Sistema Inteligente Logístico

O SILOG é uma plataforma completa para gestão e automação de operações logísticas, projetada para substituir processos baseados em WhatsApp, planilhas e ligações por um sistema estruturado, inteligente e orientado a dados.

Mais do que um ERP, o SILOG atua como um:

«🧠 Motor de decisão logística + Orquestrador operacional + Plataforma SaaS»

---

🎯 Objetivo

Transformar a operação de transportadoras em:

- 📊 Dados estruturados
- ⚙️ Processos automatizados
- 🧠 Decisões inteligentes
- 💰 Operações lucrativas

---

🧠 Arquitetura do Sistema

O SILOG é baseado em 6 camadas principais:

---

🔹 1. Núcleo Operacional

Base de dados da operação:

- Motoristas
- Veículos
- Clientes
- Cargas
- Fretes
- Viagens

---

🔹 2. Operação Logística

Execução do transporte:

- Gestão de viagens
- Controle de entregas
- Roteirização
- Painel operacional

---

🔹 3. Automação

Elimina trabalho manual:

- Leitura automática de XML (NF-e)
- Criação automática de cargas
- Integração com TMS (ex: Bsoft)
- Geração de CT-e / MDF-e
- Processamento de eventos logísticos

---

🔹 4. Inteligência Logística

Responsável pela tomada de decisão:

- Sugestão automática de motorista
- Radar de disponibilidade
- Análise de rotas
- Previsão de demanda
- Detecção de fechamento de carga (WhatsApp)

---

🔹 5. Inteligência Financeira

- Cálculo automático de frete
- Margem operacional
- Controle de custos (ICMS, PIS, COFINS)
- Rentabilidade por carga

---

🔹 6. Monitoramento e Controle

- Alertas operacionais
- Vencimento de documentos
- Dashboard gerencial
- Histórico completo

---

🔄 Fluxo Operacional

XML / WhatsApp
      ↓
Orquestrador
      ↓
Criação de Carga
      ↓
Fila de Dispatch
      ↓
Motor de Decisão
      ↓
Sugestão de Motorista
      ↓
Criação de Frete
      ↓
Aprovação do Cliente (WhatsApp)
      ↓
Viagem
      ↓
CT-e / MDF-e
      ↓
Finalização
      ↓
Financeiro + Histórico

---

🔥 Componentes Críticos

---

🧠 Orquestrador (Coração do Sistema)

Responsável por controlar todo o fluxo:

- Criar carga
- Enfileirar processamento
- Disparar decisão
- Criar frete
- Gerenciar estados

---

🧠 Motor de Decisão Logística

Seleciona o melhor motorista com base em:

score = distância + custo/km + SLA + histórico

Critérios:

- 📍 Distância até origem
- 💰 Custo por km
- ⏱️ Tempo estimado (SLA)
- ⭐ Rating do motorista

---

⚡ Fila de Dispatch

- Processamento assíncrono
- Controle de concorrência
- Distribuição de cargas

---

🔒 Máquina de Estados

Carga

- PENDENTE
- EM_DISPATCH
- AGUARDANDO_ACEITE
- ATRIBUIDA
- EM_TRANSITO
- FINALIZADA
- CANCELADA

Frete

- PENDENTE
- ACEITO
- RECUSADO
- EXPIRADO
- FINALIZADO

---

📲 Integração com WhatsApp (Diferencial)

📥 Entrada (Inbound)

Exemplo:

"João 1500 Salvador → SP"

→ Detecta intenção
→ Cria carga automaticamente

---

📤 Saída (Outbound)

- Envio automático de proposta
- Solicitação de aprovação

---

✅ Aprovação do Cliente

Mensagem enviada automaticamente:

🚛 CONFIRMAÇÃO DE CARGA

Cliente: XPTO
Origem: Salvador/BA
Destino: São Paulo/SP
Peso: 12.000 kg
Valor do Frete: R$ 5.200

👉 Responda: APROVADO ou REJEITADO

---

🔁 Fluxo de Aprovação

Carga criada
   ↓
Mensagem enviada
   ↓
Cliente responde
   ↓
Parser identifica resposta
   ↓
Atualiza status
   ↓
Dispara financeiro

---

💰 Gatilho Financeiro

Após aprovação:

APROVADO → Libera antecipação automaticamente

---

🏢 Multi-Tenant (SaaS Ready)

- Suporte a múltiplas empresas
- Isolamento por "empresaId"
- Base para produto SaaS

---

🧱 Estrutura do Projeto

/silog
  /apps
    /web            # Frontend (Next.js)
    /api            # Backend (NestJS)

  /packages
    /types
    /utils
    /config

  /prisma           # Banco de dados

  /tests
    /e2e
    /fixtures
    /utils

  /docs

---

🧠 Backend (NestJS)

/apps/api/src

src/
  /modules          # Domínios (carga, frete, motorista...)
  /decision         # Motor de decisão
  /orchestrator     # Fluxo central
  /queue            # Fila
  /state            # Estados
  /financeiro       # Regras financeiras
  /integrations     # WhatsApp, NF-e, TMS
  /api/v1           # Rotas versionadas

---

🎨 Frontend (Next.js)

/apps/web
  /app
    /dashboard
    /cargas
    /fretes
    /motorista

  /components

---

🗄️ Banco de Dados

- PostgreSQL
- Prisma ORM

Principais entidades:

- Empresa
- Motorista
- Veículo
- Cliente
- Documento (NF-e)
- Carga
- Frete
- Viagem
- EventoLogistico
- Financeiro
- AprovacaoCliente

---

🌱 Seed e Dados Fake

Inclui:

- Múltiplas empresas
- Motoristas com localização
- Veículos vinculados
- Cargas realistas
- Fretes com margem calculada

---

🧪 Testes

E2E (Playwright)

- Fluxo completo
- Simulação operacional
- Concorrência
- Fila de despacho

---

⚙️ Stack Tecnológica

- NestJS
- Node.js
- TypeScript
- Prisma
- PostgreSQL
- Next.js
- Tailwind CSS
- Playwright
- Pino

---

🚀 Como rodar

npm install
npx prisma migrate dev
npx prisma db seed
npm run dev

---

📦 Versão Atual

v1.0.0 — Arquitetura completa + automação + inteligência + multi-tenant

---

📊 Status

🚧 Em desenvolvimento (base sólida construída)

---

🧠 Posicionamento

O SILOG não é apenas um ERP.

É uma:

«Plataforma de decisão logística orientada por dados e automação»

---

🔮 Roadmap

- Leilão de frete (tempo real)
- Roteirização multi-carga
- IA preditiva
- App mobile motorista
- BI logístico

---

🏁 Conclusão

O SILOG transforma:

❌ Operação manual
❌ Falta de controle
❌ Decisão no “feeling”

Em:

✅ Automação
✅ Inteligência
✅ Escala
✅ Lucro

---

🚀 SILOG — Sistema Inteligente Logístico
