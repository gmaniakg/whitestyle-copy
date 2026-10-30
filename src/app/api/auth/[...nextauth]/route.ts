import NextAuth from 'next-auth';
import { authOptions } from '@/app/api/_lib/auth-options';

// authOptions.secret 은 요청 시점에 평가되므로 핸들러를 요청마다 생성합니다.
const handler = (req: Request, ctx: any) => NextAuth(authOptions)(req as any, ctx);

export { handler as GET, handler as POST };
