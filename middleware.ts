// export { default } from "next-auth/middleware";
// The line above applies auth to the whole project!
// You can specify where it works by using a matcher.
// That line was not needed anymore. This is the new way:
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This augments your request
export default withAuth(
  // WithAuth augments Request with user's token
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);

    // If authorized returns true, run this:
    if (
      request.nextUrl.pathname.startsWith("/extra") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/client") &&
      request.nextauth.token?.role !== "admin" &&
      request.nextauth.token?.role !== "manager"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  // Middleware only runs if authorized returns true!
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // this is called double bang - just check if there is a token, then run middleware
      },
    },
  }
);

// Like this: (can use regex)
export const config = { matcher: ["/extra", "/client", "/dashboard"] };
