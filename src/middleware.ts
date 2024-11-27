import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/'];
const registerRoutes = ['/login', '/signup'];
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isRegisterRoute = registerRoutes.includes(path);

  const tokenExists = (await cookies()).get('auth-token');

  if (isRegisterRoute && tokenExists) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if (isProtectedRoute && !tokenExists) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
