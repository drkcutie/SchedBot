import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Root route is explicitly checked
    const isHomePage = pathname === '/';
    const isProtectedRoute = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/settings') ||
        pathname.startsWith('/profile');

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    // If user is signed in and trying to access the homepage, redirect to dashboard
    if (token && isHomePage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If user is not signed in and trying to access protected routes, redirect to homepage
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/settings/:path*', '/profile/:path*', '/signin', '/signup']
};