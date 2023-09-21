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
