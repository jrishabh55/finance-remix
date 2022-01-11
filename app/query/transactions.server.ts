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
  where: Prisma.TransactionAggregateArgs['where']
) => Promise<GetTransactionsValue[]>;

export const getTransactions: GetTransactions = async (
  where?: Prisma.TransactionAggregateArgs['where']
) => {
  const transactions = await db.transaction.findMany({
    take: 10,
    where,
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

  return transactions || [];
};
