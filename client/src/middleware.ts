import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    //Rotas públicas
    const publicRoutes = ["/", "/login", "/register", "/marketplace", "/calculator"];

    const { pathname } = req.nextUrl;

    //Se rota é pública, dexia passar
    if (publicRoutes.includes(pathname)) {
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