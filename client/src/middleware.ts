import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const { pathname } = req.nextUrl;

    //Rotas públicas
    const exactPublicRoutes = ["/", "/login", "/register"];
    const prefixPublicRoutes = ["/marketplace", "/calculator"];

    const isPublic = 
      exactPublicRoutes.includes(pathname) ||
      prefixPublicRoutes.some(route => 
        pathname.startsWith(route + "/") || pathname === route);

    //Se rota é pública, dexia passar
    if (isPublic) {
        return NextResponse.next();
    }

    //Se rota não é pública e não há token, o usuário é redirecionado
    if (!token) {
        const loginUrl = new URL("/login", req.url);
        
        return NextResponse.redirect(loginUrl);
    }

    //Não checa se JWT está expirado

    ///Se tiver token deixa passar
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|imgs).*)'
  ]
};