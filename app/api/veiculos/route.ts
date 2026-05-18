import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      placa: "ABC1D23",
      modelo: "Volvo FH",
      tipo: "cavalo",
    },
  ]);
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json(
    {
      message: "Veículo criado com sucesso",
      data: body,
    },
    { status: 201 }
  );
}
