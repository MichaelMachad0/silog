import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      origem: "Salvador",
      destino: "Aracaju",
      valor: 2500,
      status: "cotado",
    },
  ]);
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json(
    {
      message: "Frete criado com sucesso",
      data: body,
    },
    { status: 201 }
  );
}
