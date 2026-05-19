import type { Motorista, Prisma } from "@prisma/client";
import { SilogError } from "@/lib/errors/silog-error";
import { prisma } from "@/lib/prisma";

export type CriarMotoristaInput = {
  nome: string;
  cpf: string;
  telefone?: string | null;
  cnh?: string | null;
  validadeCNH?: string | null;
  status?: string;
};

export type AtualizarMotoristaInput = Partial<CriarMotoristaInput>;

function normalizarCpf(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

function validarCpf(cpf: string): void {
  const digitos = normalizarCpf(cpf);

  if (digitos.length !== 11) {
    throw new SilogError("CPF deve conter 11 dígitos");
  }
}

function parseValidadeCNH(valor?: string | null): Date | null | undefined {
  if (valor === undefined) {
    return undefined;
  }

  if (valor === null || valor === "") {
    return null;
  }

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) {
    throw new SilogError("Data de validade da CNH inválida");
  }

  return data;
}

function montarDadosMotorista(
  input: CriarMotoristaInput
): Prisma.MotoristaCreateInput {
  const { nome, cpf, telefone, cnh, validadeCNH, status } = input;

  if (!nome?.trim()) {
    throw new SilogError("Nome é obrigatório");
  }

  if (!cpf?.trim()) {
    throw new SilogError("CPF é obrigatório");
  }

  validarCpf(cpf);

  const dados: Prisma.MotoristaCreateInput = {
    nome: nome.trim(),
    cpf: normalizarCpf(cpf),
    telefone: telefone?.trim() || null,
    cnh: cnh?.trim() || null,
  };

  const validade = parseValidadeCNH(validadeCNH);
  if (validade !== undefined) {
    dados.validadeCNH = validade;
  }

  if (status?.trim()) {
    dados.status = status.trim();
  }

  return dados;
}

export async function listarMotoristas(): Promise<Motorista[]> {
  return prisma.motorista.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function buscarMotoristaPorId(id: string): Promise<Motorista> {
  const motorista = await prisma.motorista.findUnique({
    where: { id },
  });

  if (!motorista) {
    throw new SilogError("Motorista não encontrado", 404);
  }

  return motorista;
}

export async function criarMotorista(
  input: CriarMotoristaInput
): Promise<Motorista> {
  const dados = montarDadosMotorista(input);

  const existente = await prisma.motorista.findUnique({
    where: { cpf: dados.cpf },
  });

  if (existente) {
    throw new SilogError("Já existe um motorista com esse CPF");
  }

  try {
    return await prisma.motorista.create({ data: dados });
  } catch (erro) {
    throw tratarErroPrisma(erro);
  }
}

export async function atualizarMotorista(
  id: string,
  input: AtualizarMotoristaInput
): Promise<Motorista> {
  await buscarMotoristaPorId(id);

  const dados: Prisma.MotoristaUpdateInput = {};

  if (input.nome !== undefined) {
    if (!input.nome.trim()) {
      throw new SilogError("Nome é obrigatório");
    }
    dados.nome = input.nome.trim();
  }

  if (input.cpf !== undefined) {
    validarCpf(input.cpf);
    const cpf = normalizarCpf(input.cpf);
    const outro = await prisma.motorista.findFirst({
      where: { cpf, NOT: { id } },
    });

    if (outro) {
      throw new SilogError("Já existe um motorista com esse CPF");
    }

    dados.cpf = cpf;
  }

  if (input.telefone !== undefined) {
    dados.telefone = input.telefone?.trim() || null;
  }

  if (input.cnh !== undefined) {
    dados.cnh = input.cnh?.trim() || null;
  }

  if (input.validadeCNH !== undefined) {
    dados.validadeCNH = parseValidadeCNH(input.validadeCNH);
  }

  if (input.status !== undefined) {
    dados.status = input.status.trim();
  }

  try {
    return await prisma.motorista.update({
      where: { id },
      data: dados,
    });
  } catch (erro) {
    throw tratarErroPrisma(erro);
  }
}

export async function excluirMotorista(id: string): Promise<Motorista> {
  await buscarMotoristaPorId(id);

  try {
    return await prisma.motorista.delete({ where: { id } });
  } catch (erro) {
    throw tratarErroPrisma(erro);
  }
}

function tratarErroPrisma(erro: unknown): SilogError {
  if (
    typeof erro === "object" &&
    erro !== null &&
    "code" in erro &&
    erro.code === "P2003"
  ) {
    return new SilogError(
      "Motorista possui vínculos e não pode ser removido",
      400
    );
  }

  if (erro instanceof SilogError) {
    return erro;
  }

  return new SilogError("Erro ao processar operação do motorista", 500);
}
