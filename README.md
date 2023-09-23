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

# Roles

In nextauth options:

`import { GithubProfile } from "next-auth/providers/github";`

```ts
GitHubProvider({
      profile(profile: GithubProfile) {
        console.log(profile);
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
```

also, add `role` to `credentials` if you use them.

## Persisting role

You need to use **callbacks**
**jwt** for server, **session** for the client

```ts
callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // You only need this if you want to use role in client component:
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
```

You will need to fix TS user.
It's called **module augmentation**

You can either use root level, or make a `/types` folder

[Module augmentation](https://next-auth.js.org/getting-started/typescript#module-augmentation)

```ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: String;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
```

Then replace types where needed.

Then go to middleware:

```ts
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
```
