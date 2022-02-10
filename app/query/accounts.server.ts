import { Account } from '@prisma/client';
import { db } from '~/utils/db.server';

export type GetAccounts = (userId?: string) => Promise<Account[]>;
export const getAccounts: GetAccounts = async (userId) => {
  const accounts = await db.account.findMany({
    where: { userId }
  });

  return accounts || [];
};

export const getAccountsWithSum = async (userId: string) => {
  const transactions = await db.transaction.groupBy({
    by: ['accountId', 'type'],
    where: { userId },
    _sum: {
      amount: true
    }
  });

  const accounts = await db.account.findMany({
    where: { userId },
    orderBy: {
      type: 'asc'
    },
    select: {
      id: true,
      name: true,
      type: true
    }
  });

  const accountsWithSum = accounts.map((account) => {
    const filteredTransaction = transactions.filter(
      (transaction) => transaction.accountId === account.id
    );
    return {
      ...account,
      sum: {
        deposit: filteredTransaction.find((t) => t.type === 'DEPOSIT')?._sum.amount || 0,
        expense: filteredTransaction.find((t) => t.type === 'WITHDRAWAL')?._sum.amount || 0
      }
    };
  });

  return accountsWithSum;
};

export type GetAccountsWithSum = typeof getAccountsWithSum;
