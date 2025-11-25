# Default Prompt: Xano Auth + Next.js (Pages Router)

I’m building a Next.js project
I want to connect it to Xano authentication endpoints:

Base URL = https://x8ki-letl-twmt.n7.xano.io/api:FYnzG7ev

- `POST /auth/login` → user login, returns token
- `POST /auth/signup` → user signup, returns token
- `GET /auth/me` → fetch current user (requires Bearer token)

**Requirements:**

1. Create a reusable API helper file (`lib/api.js` or `lib/api.ts`) that:
   - Wraps fetch for login, signup, and me
   - Stores token in cookies (via `js-cookie`) or localStorage fallback
   - Automatically attaches token to requests

2. Implement React hooks:
   - `useAuth()` → handles login, signup, logout
   - `useUser()` → fetches `/auth/me` and caches user

3. Add frontend pages:
   - `/login` → form that calls `login()`
   - `/signup` → form that calls `signup()`

4. Add **auth protection**:
   - Redirect to `/login` if user not logged in (client-side and SSR using `getServerSideProps`)
   - Keep user logged in across refreshes

6. Return working example code:
   - `lib/api.ts`
   - `hooks/useAuth.ts`
   - `hooks/useUser.ts`
   - `pages/login.tsx`
   - `pages/signup.tsx`
   - Middleware or `getServerSideProps` for page protection