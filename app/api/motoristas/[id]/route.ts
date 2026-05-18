import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;

  return NextResponse.json({
    id,
    message: "Motorista encontrado",
  });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  return NextResponse.json({
    id,
    ...body,
    message: "Motorista atualizado",
  });
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;

  return NextResponse.json({
    id,
    message: "Motorista removido",
  });
}
