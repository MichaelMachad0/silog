import type { IdRouteParams } from "@/lib/api/route-params";
import { jsonErro, jsonSucesso } from "@/lib/api/resposta";
import { requireOperador, requireSession } from "@/lib/auth/require-session";
import {
  atualizarMotorista,
  buscarMotoristaPorId,
  excluirMotorista,
} from "@/lib/services/motoristaService";

export async function GET(_request: Request, { params }: IdRouteParams) {
  try {
    await requireSession();
    const { id } = await params;
    const dados = await buscarMotoristaPorId(id);
    return jsonSucesso(dados);
  } catch (erro) {
    return jsonErro(erro);
  }
}

export async function PUT(request: Request, { params }: IdRouteParams) {
  try {
    await requireOperador();
    const { id } = await params;
    const body = await request.json();
    const dados = await atualizarMotorista(id, body);
    return jsonSucesso(dados);
  } catch (erro) {
    return jsonErro(erro);
  }
}

export async function DELETE(_request: Request, { params }: IdRouteParams) {
  try {
    await requireOperador();
    const { id } = await params;
    const dados = await excluirMotorista(id);
    return jsonSucesso(dados);
  } catch (erro) {
    return jsonErro(erro);
  }
}
