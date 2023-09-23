// export { default } from "next-auth/middleware";
// The line above applies auth to the whole project!
// You can specify where it works by using a matcher.
// That line was not needed anymore. This is the new way:
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

// This augments your request
export default withAuth(
  // WithAuth augments Request with user's token
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);
  },
  // Middleware only runs if authorized returns true!
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.role === "admin";
      },
    },
  }
);

// Like this: (can use regex)
export const config = { matcher: ["/extra", "/dashboard"] };
