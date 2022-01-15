import { Prisma, PrismaClient } from '@prisma/client';
import { loggerMiddleware } from './middleware/loggerPrisma.server';

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

const middleware: Prisma.Middleware[] = [loggerMiddleware];

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();

  middleware.map((func) => db.$use(func));

  db.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
    middleware.map((func) => global.__db?.$use(func));
    global.__db.$connect();
  }
  db = global.__db;
}

export { db };
