import { PrismaClient } from '../../generated/prisma'; // mesmo caminho

import { iUsersRepository } from '../IUsersRepository';

export class UsersRepository implements iUsersRepository {
  private db: PrismaClient;
  constructor(private database: PrismaClient) {
    this.db = database;
  }

  async store(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ id?: string } | any> {
    return await this.db.user.create({ data });
  }

  async find(
    data: Record<string, any>,
  ): Promise<
    { id: string; username: string; email: string; password: string } | any
  > {
    return await this.db.user.findUnique({
      where: { ...(data as any) },
    });
  }
}
