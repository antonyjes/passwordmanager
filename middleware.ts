import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/auth/login") ||
    request.nextUrl.pathname.startsWith("/auth/register");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/auth/login", "/auth/register"],
};
