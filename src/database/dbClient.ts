import { PrismaClient } from '../generated/prisma'; // mesmo caminho

export const database = new PrismaClient();
