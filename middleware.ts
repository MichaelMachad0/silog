import { NextResponse } from "next/server";
import { auth } from "@/auth";

const ROTAS_PUBLICAS = ["/login", "/api/auth"];

function rotaPublica(pathname: string): boolean {
  return ROTAS_PUBLICAS.some(
    (rota) => pathname === rota || pathname.startsWith(`${rota}/`)
  );
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const logado = !!req.auth;

  if (rotaPublica(pathname)) {
    if (logado && pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (!logado) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { sucesso: false, dados: {}, erro: "Não autorizado" },
        { status: 401 }
      );
    }

    const login = new URL("/login", req.nextUrl);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
