import { NextResponse } from "next/server";
import type { IdRouteParams } from "@/lib/api/route-params";

export async function GET(request: Request, { params }: IdRouteParams) {
  const { id } = await params;

  return NextResponse.json({
    id,
    message: "Frete encontrado",
  });
}

export async function PUT(request: Request, { params }: IdRouteParams) {
  const { id } = await params;
  const body = await request.json();

  return NextResponse.json({
    id,
    ...body,
    message: "Frete atualizado",
  });
}

export async function DELETE(request: Request, { params }: IdRouteParams) {
  const { id } = await params;

  return NextResponse.json({
    id,
    message: "Frete removido",
  });
}
