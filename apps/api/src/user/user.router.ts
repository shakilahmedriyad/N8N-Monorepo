import { Query, Router } from 'nestjs-trpc';

@Router({ alias: 'user' })
export class UserRouter {
  constructor() {}

  @Query()
  public getUser() {
    return 'I am a user';
  }
}
