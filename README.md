# SILOG (MVP) — Scaffold Base

## Arquitetura técnica (aprovada)
- **Web**: Next.js + TypeScript (`apps/web`)
- **API**: NestJS + TypeScript (`apps/api`)
- **Banco**: PostgreSQL (Docker)
- **ORM/Migrations**: Prisma (na API)
- **Padrões transversais (desde o início)**:
  - **Validação**: validação de entrada centralizada
  - **Erros**: respostas padronizadas e seguras (sem vazar stack)
  - **Auditoria**: registro de eventos relevantes (quem/quando/o quê)
  - **Logs**: logs estruturados com `requestId` por requisição

## Estrutura do projeto
```
silog/
  apps/
    api/                # NestJS + Prisma
    web/                # Next.js
  packages/
    shared/             # tipos/contratos compartilhados (sem lógica de infra)
    config/             # configs compartilhadas (eslint/ts/prettier)
  docker-compose.yml    # postgres local
  pnpm-workspace.yaml   # workspaces
  package.json          # scripts raiz
```

## Como rodar (quando tiver Node + pnpm)
1) Instale **Node.js 20+**.
2) Instale pnpm:
```bash
npm i -g pnpm
```
3) Suba o Postgres:
```bash
pnpm db:up
```
4) Configure a API:
```bash
copy apps\\api\\.env.example apps\\api\\.env
pnpm -C apps/api install
pnpm -C apps/api prisma:generate
pnpm -C apps/api prisma:migrate:dev
pnpm -C apps/api dev
```

## Próximo passo (primeiro módulo)
O scaffold já inclui um **template de módulo** na API com:
- DTOs + validações
- Controller (camada HTTP)
- Service (regras)
- Repository (acesso a dados/Prisma)
- Auditoria em pontos-chave (criar/atualizar/remover)

Assim, o próximo passo é escolher o **primeiro módulo** (ex.: `motoristas`) e apenas:
- modelar o Prisma (tabela + índices)
- criar DTOs
- implementar CRUD com auditoria e erros padronizados

