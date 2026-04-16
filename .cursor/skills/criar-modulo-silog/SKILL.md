---
name: criar-modulo-silog
description: Criar modulos backend do SILOG com `controller`, `service` e `routes`, seguindo o padrao do projeto. Use quando o usuario pedir para criar um novo modulo, CRUD inicial, rotas GET/POST, ou estrutura controller/service/routes no SILOG.
---

# Criar Modulo SILOG

## Objetivo

Criar um modulo backend completo no SILOG com:

- `controller`
- `service`
- `routes`

O nome do modulo sera informado na solicitacao do usuario.

## Estrutura obrigatoria

Criar arquivos no padrao:

- `src/controllers/<modulo>Controller.js`
- `src/services/<modulo>Service.js`
- `src/routes/<modulo>Routes.js`

Exemplo para `motorista`:

- `src/controllers/motoristaController.js`
- `src/services/motoristaService.js`
- `src/routes/motoristaRoutes.js`

## Regras do SILOG

- Separar backend em `controllers`, `services` e `routes`
- Controller deve apenas receber `req` e `res`, chamar o service e retornar JSON
- Controller nao deve acessar Prisma diretamente
- Service deve conter toda a regra de negocio
- Service deve validar dados antes de salvar
- Prisma deve ser usado apenas no service
- Routes nao devem conter regra de negocio
- Sempre usar `async/await`
- Sempre tratar erros com `try/catch`
- Sempre retornar JSON padronizado:

```json
{
  "sucesso": true,
  "dados": {},
  "erro": null
}
```

- Em erro:

```json
{
  "sucesso": false,
  "dados": {},
  "erro": "mensagem controlada"
}
```

- Usar status HTTP corretos: `200`, `201`, `400`, `500`
- Nunca expor erro interno diretamente
- Manter nomes claros em portugues, como `criarMotorista`, `listarMotoristas`, `criarCarga`

## Fluxo de implementacao

1. Identificar o nome do modulo no singular para nomes de arquivo e funcoes.
2. Verificar como o projeto nomeia recursos semelhantes antes de criar novos arquivos.
3. Criar o `service` com:
   - import do Prisma client existente
   - funcao `criar<Modulo>()`
   - funcao `listar<Modulos>()`
   - validacoes de campos obrigatorios
   - logica de negocio necessaria
4. Criar o `controller` com:
   - funcao `criar`
   - funcao `listar`
   - chamadas diretas ao service
   - respostas JSON padronizadas
5. Criar o `routes` com:
   - `GET /`
   - `POST /`
6. Se necessario, integrar a nova rota no arquivo principal de rotas/app.
7. Depois da implementacao, revisar se nenhuma regra de negocio ficou em `controller` ou `routes`.

## Padrao de codigo

### Service

- Importar o Prisma client compartilhado do projeto
- Concentrar validacoes e persistencia no service
- Retornar dados puros para o controller
- Em validacoes, lancar erros com mensagem controlada quando apropriado

Modelo:

```javascript
const prisma = require("../prisma/client");

async function criarModulo(data) {
  const { nome } = data;

  if (!nome) {
    const erro = new Error("Campo nome e obrigatorio");
    erro.statusCode = 400;
    throw erro;
  }

  return prisma.modulo.create({
    data: { nome },
  });
}

async function listarModulos() {
  return prisma.modulo.findMany();
}

module.exports = {
  criarModulo,
  listarModulos,
};
```

### Controller

- Receber `req` e `res`
- Chamar apenas o service
- Nao acessar Prisma
- Nao colocar validacao de negocio complexa

Modelo:

```javascript
const moduloService = require("../services/moduloService");

async function criar(req, res) {
  try {
    const dados = await moduloService.criarModulo(req.body);

    return res.status(201).json({
      sucesso: true,
      dados,
      erro: null,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      sucesso: false,
      dados: {},
      erro: error.statusCode ? error.message : "Erro interno ao criar modulo",
    });
  }
}

async function listar(req, res) {
  try {
    const dados = await moduloService.listarModulos();

    return res.status(200).json({
      sucesso: true,
      dados,
      erro: null,
    });
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      dados: {},
      erro: "Erro interno ao listar modulo",
    });
  }
}

module.exports = {
  criar,
  listar,
};
```

### Routes

- Criar somente as rotas pedidas
- Usar controller
- Nao colocar logica inline

Modelo:

```javascript
const express = require("express");
const router = express.Router();
const moduloController = require("../controllers/moduloController");

router.get("/", moduloController.listar);
router.post("/", moduloController.criar);

module.exports = router;
```

## Convencoes de nomes

Se o usuario informar um modulo como `cliente`:

- arquivo controller: `clienteController.js`
- arquivo service: `clienteService.js`
- arquivo routes: `clienteRoutes.js`
- funcoes do service: `criarCliente`, `listarClientes`
- funcoes do controller: `criar`, `listar`

Se o modulo informado vier em plural, normalizar para o singular nos nomes de arquivo quando isso combinar com o padrao existente do projeto.

## Checklist final

Antes de concluir:

- Confirmar que existem os 3 arquivos: controller, service e routes
- Confirmar que o controller nao usa Prisma
- Confirmar que o service concentra validacao e logica
- Confirmar que as rotas possuem apenas `GET /` e `POST /`, salvo se o usuario pedir mais
- Confirmar resposta JSON padronizada
- Confirmar uso de `async/await` e `try/catch`
- Confirmar status `201` no criar e `200` no listar
- Confirmar que mensagens internas nao foram expostas

## Quando aplicar esta skill

Use esta skill quando o usuario pedir algo como:

- "crie um modulo no SILOG"
- "gere controller, service e routes"
- "crie CRUD inicial"
- "adicione GET e POST para um recurso"
- "crie modulo de motorista, cliente, carga, veiculo"

## Execução obrigatória

Ao receber uma solicitação para criar um módulo:

1. Criar os 3 arquivos automaticamente:
   - controller
   - service
   - routes

2. Já preencher os arquivos com:
   - funções básicas (criar, listar)
   - estrutura completa
   - try/catch
   - retorno JSON padronizado

3. Seguir obrigatoriamente a rule Padrao-Backend-SILOG

4. Não apenas explicar — gerar código pronto para uso

5. Nomear arquivos e funções com base no nome do módulo informado
