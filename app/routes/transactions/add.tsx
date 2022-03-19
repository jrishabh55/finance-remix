import { Prisma, TransactionType } from '@prisma/client';
import dayjs from 'dayjs';
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from 'remix';
import AddTransaction from '~/modules/AddTransactions';
import { getAccounts } from '~/query/accounts.server';
import { getTransactionsCategories } from '~/query/transactions.server';
import { db } from '~/utils/db.server';
import { requireUserId } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const categoriesProm = getTransactionsCategories();

  const accountsProm = getAccounts(userId);

  const [categories, accounts] = await Promise.all([categoriesProm, accountsProm]);

  return { categories, accounts };
};

export const action: ActionFunction = async ({ request, params }): Promise<Response | any> => {
  const userId = await requireUserId(request);

  const body = await request.formData();

  const id = body.get('id')?.toString();
  const transactionDate = body.get('date')?.toString();
  const description = body.get('description')?.toString();
  const type = body.get('transactionType')?.toString() as TransactionType;
  const categoryId = body.get('transactionType')?.toString();
  const accountId = body.get('accountId')?.toString();
  const amount = parseInt(body.get('amount')?.toString() ?? '0', 10);

  if (!transactionDate || !description || !type || !categoryId || !accountId) {
    return { error: { error: 'All fields are required.', message: 'All fields are required.' } };
  }

  const referenceId = Date.now().toString(10);

  const transactionData = {
    userId,
    description,
    type,
    amount,
    referenceId,
    categoryId,
    accountId,
    transactionDate: dayjs(transactionDate).toISOString()
  };

  try {
    switch (request.method) {
      case 'POST': {
        const transaction = await db.transaction.create({
          data: transactionData
        });

        return { transaction };
      }
      case 'PATCH': {
        const transaction = await db.transaction.update({
          where: {
            id
          },
          data: transactionData
        });

        return { transaction };
      }
      default:
        return redirect('/');
    }
  } catch (err: any) {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2002':
          return { error: { error: 'Username or email already exists', message: err.message } };
      }
    }
    return { error: { error: 'Something went wrong', message: err?.message } };
  }
};

const TransactionAdd = () => {
  const { categories, accounts } = useLoaderData();

  console.log({ categories, accounts });

  return (
    <div className="mx-auto w-full max-w-screen-md rounded-lg bg-black">
      <AddTransaction categories={categories} accounts={accounts} />
    </div>
  );
};

export default TransactionAdd;
