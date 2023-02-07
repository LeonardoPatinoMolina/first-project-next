import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  try {
      const token = request.cookies.get("tokenUser");
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.SECRET_JWT)
        );
          return NextResponse.next();
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/gate", request.url));
    }
}

export const config={
  matcher: ['/profile','/favorites','/search/:path*','/hero/:path*','/']
}