import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const logado = !!req.auth

  const publicPaths = ['/login', '/api/auth']
  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )

  if (!logado && !isPublic) {
    const login = new URL('/login', req.nextUrl.origin)
    login.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(login)
  }

  if (logado && pathname === '/login') {
    return NextResponse.redirect(new URL('/timeline', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
