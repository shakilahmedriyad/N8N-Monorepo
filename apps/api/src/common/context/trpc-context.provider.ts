// src/trpc/context/trpc-context.provider.ts
import { Injectable } from '@nestjs/common';
import { TRPCContext } from 'nestjs-trpc';
import { auth } from '@repo/auth/auth';

@Injectable()
export class TrpcContextProvider implements TRPCContext {
  async create(opts: { req: any; res: any }) {
    const { req, res } = opts;

    try {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      if (session?.session && session?.user) {
        return {
          session: session.session,
          user: session.user,
          req,
          res,
        };
      }

      return {
        session: null,
        user: null,
        req,
        res,
      };
    } catch (error) {
      return {
        session: null,
        user: null,
        req,
        res,
      };
    }
  }
}
