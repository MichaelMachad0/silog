import type { PerfilUsuario } from "@prisma/client";
import type { Session } from "next-auth";
import { auth } from "@/auth";
import { SilogError } from "@/lib/errors/silog-error";

export async function requireSession(): Promise<Session> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new SilogError("Não autorizado", 401);
  }

  return session;
}

export async function requirePerfil(
  ...perfis: PerfilUsuario[]
): Promise<Session> {
  const session = await requireSession();

  if (!perfis.includes(session.user.perfil)) {
    throw new SilogError("Acesso negado", 403);
  }

  return session;
}

/** Escrita em cadastros: ADMIN e OPERADOR. */
export async function requireOperador(): Promise<Session> {
  return requirePerfil("ADMIN", "OPERADOR");
}
