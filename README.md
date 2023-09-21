# Next-Auth

This is my attempt at learning NextAuth. Created by lilKriT.

## Steps:

- pnpm add next-auth
- create `api/auth/[...nextauth]/route.ts`
- you don't have to create pages for signin, signout etc
- create options.ts if you want providers to be in a separate file
- add secrets
  - you need NEXTAUTH_SECRET
  - and whatever your providers need.
- add your app to provider API (for example, github apps)

You get a lot of data just by connecting to GET `/api/auth/providers`

# Protection

There's three ways of protecton.

## Middleware

```ts
export { default } from "next-auth/middleware";

export const config = { matcher: ["/extra", "/dashboard"] };
```

## Server:

```ts
const session = await getServerSession(options);

{
  session ? something : somethingelse;
}

// optionally (if a different page for example)
if (!session) {
  redirect("/api/auth/signin?callbackUrl=/thissecretpage");
}
```

## Client:

```ts
import { useSession } from "next-auth/react";

const { data: session } = useSession({
  required: true,
  onUnauthenticated() {
    redirect("/api/auth/signin?callbackUrl=/client");
  },
});

// Later you can use the data:
<UserCard user={session.user} />;
```

You need an AuthProvider context for that - create on and put it in your layout, inside body.

```ts
"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
```

```ts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```
