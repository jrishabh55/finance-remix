import { TransactionType } from '@prisma/client';
import { TrendsData } from '~/components/charts/Trends';
import { db } from '~/utils/db.server';

export type RawTrendsData = {
  name: string;
  amount: number;
  type: TransactionType;
}[];

export type FetchTrendsArg = {
  type: 'YEAR' | 'MONTH';
  accountIds?: string[];
  userId?: string;
  month?: number;
  year?: number;
};

export type TrendsArgs = Omit<FetchTrendsArg, 'type'>;

export type YearlyTrends = (args?: Omit<TrendsArgs, 'month' | 'year'>) => Promise<TrendsData>;
export type MonthlyTrends = (args?: Omit<TrendsArgs, 'month'>) => Promise<TrendsData>;

export type FetchTrends = (fetchTrendsArgs: FetchTrendsArg) => Promise<TrendsData>;

const transformRawTrendsData = (rawTrendsData: RawTrendsData): TrendsData => {
  const trendsData: Record<string, TrendsData[0]> = {};

  rawTrendsData.forEach((trend) => {
    const { name, amount, type } = trend;

    if (!trendsData[name]) {
      trendsData[name] = {
        deposit: 0,
        withdrawal: 0,
        name
      };
    }

    const key = type === TransactionType.DEPOSIT ? 'deposit' : 'withdrawal';
    trendsData[name][key] = amount;
  });

  return Object.values(trendsData);
};

export const yearlyTrends: YearlyTrends = async (args = {}) => {
  return fetchTrends({ ...args, type: 'YEAR' });
};
export const monthlyTrends: MonthlyTrends = async (args = {}) => {
  return fetchTrends({ ...args, type: 'MONTH' });
};

export const fetchTrends: FetchTrends = async ({ type, accountIds = [], userId, year }) => {
  let where = '';

  if (accountIds.length > 0 || userId) {
    where = 'WHERE ';

    if (accountIds.length > 0) {
      where += `accountId IN (${accountIds.join(', ')})`;
    }
    if (userId) {
      where += `${where !== 'WHERE ' ? ' AND ' : ''}userId = '${userId}'`;
    }
  }

  const data = await db.$queryRawUnsafe<RawTrendsData>(
    `
    SELECT
      ${type}(transactionDate) AS name,
      ROUND(SUM(amount), 2) AS amount,
      type
    FROM
      Transaction
    ${where}
    GROUP BY
      name, type
    ORDER BY
      type ASC
  `
  );

  return transformRawTrendsData(data);
};
