import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("tokenUser");
    try {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.SECRET_JWT)
      );
      console.log('payload',payload);
      return NextResponse.next();
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config={
  matcher: ['/profile']
}