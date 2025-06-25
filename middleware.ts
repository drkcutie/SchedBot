import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const protectedRoutes = ['/dashboard', '/settings', '/profile'];
    const authRoutes = ['/signin', '/signup'];

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });


    if(token && authRoutes.some(route => pathname.startsWith(route))){
        return NextResponse.redirect(new URL ('/dashboard', request.url))
    }

    if(!token && protectedRoutes.some(route => pathname.startsWith(route))){
        return NextResponse.redirect(new URL ('/signin', request.url))
    }

    return NextResponse.next()

}
export const config = {
    matcher: ['/dashboard/:path*', '/settings/:path*', '/profile/:path*', '/signin', '/signup']
};