import { jsonErro, jsonSucesso } from "@/lib/api/resposta";
import { requireOperador, requireSession } from "@/lib/auth/require-session";
import {
  criarMotorista,
  listarMotoristas,
} from "@/lib/services/motoristaService";

export async function GET() {
  try {
    await requireSession();
    const dados = await listarMotoristas();
    return jsonSucesso(dados);
  } catch (erro) {
    return jsonErro(erro);
  }
}

export async function POST(request: Request) {
  try {
    await requireOperador();
    const body = await request.json();
    const dados = await criarMotorista(body);
    return jsonSucesso(dados, 201);
  } catch (erro) {
    return jsonErro(erro);
  }
}
