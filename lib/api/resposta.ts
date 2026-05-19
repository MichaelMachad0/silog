import { NextResponse } from "next/server";
import { SilogError } from "@/lib/errors/silog-error";

export function jsonSucesso<T>(dados: T, status = 200) {
  return NextResponse.json(
    { sucesso: true, dados, erro: null },
    { status }
  );
}

export function jsonErro(erro: unknown) {
  if (erro instanceof SilogError) {
    return NextResponse.json(
      { sucesso: false, dados: {}, erro: erro.message },
      { status: erro.statusCode }
    );
  }

  console.error(erro);

  return NextResponse.json(
    { sucesso: false, dados: {}, erro: "Erro interno do servidor" },
    { status: 500 }
  );
}
