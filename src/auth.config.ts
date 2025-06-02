import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;  // ログインしているかどうか
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/manage');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // ログインしてなければloginページにリダイレクト
      } else if (isLoggedIn && nextUrl.pathname === '/login' ) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // ログインオプション auth/index.ts側で設定
} satisfies NextAuthConfig;