import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { PerfilUsuario } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const senha = String(credentials?.password ?? "");

        if (!email || !senha) {
          return null;
        }

        const usuario = await prisma.usuario.findUnique({
          where: { email },
        });

        if (!usuario?.ativo) {
          return null;
        }

        const senhaValida = await compare(senha, usuario.senhaHash);

        if (!senhaValida) {
          return null;
        }

        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.nome,
          perfil: usuario.perfil,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.perfil = user.perfil as PerfilUsuario;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.perfil = token.perfil as PerfilUsuario;
      }
      return session;
    },
  },
});
