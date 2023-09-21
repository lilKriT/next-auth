export { default } from "next-auth/middleware";
// The line above applies auth to the whole project!
// You can specify where it works by using a matcher.

// Like this: (can use regex)
export const config = { matcher: ["/extra", "/dashboard"] };
