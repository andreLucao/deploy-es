import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // CRITICAL FIX: Use 'authToken' (not 'token') to match backend cookie name
    const token = req.cookies.get("authToken")?.value;

    const { pathname } = req.nextUrl;

    console.log(`🔍 [Middleware] Path: ${pathname}, Token exists: ${!!token}`);

    // Check if user is on auth pages (login/register)
    const isAuthPage = pathname === "/login" || pathname === "/register";

    // If on auth page with valid token, redirect to marketplace
    if (isAuthPage && token) {
        console.log(`🔄 [Middleware] Redirecting authenticated user away from ${pathname}`);
        return NextResponse.redirect(new URL("/marketplace", req.url));
    }

    //Rotas públicas
    const exactPublicRoutes = ["/", "/login", "/register"];
    const prefixPublicRoutes = ["/marketplace", "/calculator", "/auth/verify", "/legislacao"];

    const isPublic = 
      exactPublicRoutes.includes(pathname) ||
      prefixPublicRoutes.some(route => 
        pathname.startsWith(route + "/") || pathname === route);

    //Se rota é pública, dexia passar
    if (isPublic) {
        console.log(`✅ [Middleware] Public route access: ${pathname}`);
        return NextResponse.next();
    }

    //Se rota não é pública e não há token, o usuário é redirecionado
    if (!token) {
        console.log(`🚫 [Middleware] No token, redirecting to /login from ${pathname}`);
        const loginUrl = new URL("/login", req.url);
        
        return NextResponse.redirect(loginUrl);
    }

    //Não checa se JWT está expirado

    ///Se tiver token deixa passar
    console.log(`✅ [Middleware] Authenticated access: ${pathname}`);
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|imgs).*)'
  ]
};