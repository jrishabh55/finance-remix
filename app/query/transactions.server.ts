import { CurrencyCode, Prisma, Transaction } from '@prisma/client';
import { db } from '~/utils/db.server';

export type GetTransactionsValue = Transaction & {
  category: {
    id: string;
    name: string;
  };
  account: {
    id: string;
    name: string;
    currencyCode: CurrencyCode;
  };
};

export type GetTransactions = (
  args?: Prisma.TransactionFindManyArgs
) => Promise<GetTransactionsValue[]>;

export const getTransactions: GetTransactions = async (arg = {}) => {
  const transactions = await db.transaction.findMany({
    ...arg,
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
          name: true,
          currencyCode: true
        }
      }
    }
  });

  return transactions;
};

export const getTransactionsCount = async (arg?: Prisma.TransactionCountArgs) => {
  const transactionsCount = await db.transaction.count(arg);

  return transactionsCount;
};

export const getTransactionsCategories = (
  args: Prisma.TransactionCategoryFindManyArgs = { select: { id: true, name: true } }
) => {
  return db.transactionCategory.findMany(args);
};
