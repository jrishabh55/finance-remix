import { Prisma, Transaction } from '@prisma/client';
import { db } from '~/utils/db.server';

export type GetTransactionsValue = Transaction & {
  category: {
    id: string;
    name: string;
  };
  account: {
    id: string;
    name: string;
  };
};

export type GetTransactions = (
  args?: Prisma.TransactionAggregateArgs
) => Promise<GetTransactionsValue[]>;

export const getTransactions: GetTransactions = async (
  arg: Prisma.TransactionAggregateArgs = {}
) => {
  const transactions = await db.transaction.findMany({
    ...(arg as any),
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      },
      account: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return (transactions as GetTransactionsValue[]) || [];
};

export const getTransactionsCount = async (where?: Prisma.TransactionAggregateArgs['where']) => {
  const transactionsCount = await db.transaction.count({
    where
  });

  return transactionsCount || 0;
};
