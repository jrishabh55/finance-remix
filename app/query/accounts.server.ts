import { Account } from '@prisma/client';
import { db } from '~/utils/db.server';

export type GetAccounts = (userId?: string) => Promise<Account[]>;
export const getAccounts: GetAccounts = async (userId) => {
  const accounts = await db.account.findMany({
    where: { userId }
  });

  return accounts || [];
};
