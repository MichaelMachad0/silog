import type { PerfilUsuario } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      perfil: PerfilUsuario;
    } & DefaultSession["user"];
  }

  interface User {
    perfil: PerfilUsuario;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    perfil: PerfilUsuario;
  }
}
