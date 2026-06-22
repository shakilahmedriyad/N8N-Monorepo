import {
  MiddlewareOptions,
  MiddlewareResponse,
  TRPCMiddleware,
} from 'nestjs-trpc';
import { Inject, Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';
import { AuthService } from '@thallesp/nestjs-better-auth';

@Injectable()
export class AuthMiddleware implements TRPCMiddleware {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  async use(opts: MiddlewareOptions): Promise<MiddlewareResponse> {
    const { ctx, next } = opts;

    /// @ts-expect-error will fix later
    const session = ctx.session;
    console.log(session);
    if (session == null) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Session not found',
      });
    }

    // `ctx` is now typed as AuthReturnContext — only valid shapes are accepted
    return next();
  }
}
