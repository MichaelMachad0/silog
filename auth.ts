import { prisma } from '@/lib/prisma'
import { PerfilUsuario } from '@prisma/client'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface User {
    perfil: PerfilUsuario
    motoristaId?: string | null
  }
  interface Session {
    user: {
      id: string
      email: string
      name: string
      perfil: PerfilUsuario
      motoristaId?: string | null
    }
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    perfil: PerfilUsuario
    motoristaId?: string | null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        senha: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().toLowerCase().trim()
        const senha = credentials?.senha?.toString()

        if (!email || !senha) return null

        const usuario = await prisma.usuario.findUnique({ where: { email } })
        if (!usuario?.ativo) return null

        const valido = await bcrypt.compare(senha, usuario.senhaHash)
        if (!valido) return null

        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.nome,
          perfil: usuario.perfil,
          motoristaId: usuario.motoristaId,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!
        token.perfil = user.perfil
        token.motoristaId = user.motoristaId
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.perfil = token.perfil
      session.user.motoristaId = token.motoristaId ?? null
      return session
    },
  },
})
