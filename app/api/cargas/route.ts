import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      descricao: "Carga exemplo",
      origem: "Salvador",
      destino: "Feira de Santana",
      status: "pendente",
    },
  ]);
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json(
    {
      message: "Carga criada com sucesso",
      data: body,
    },
    { status: 201 }
  );
}
