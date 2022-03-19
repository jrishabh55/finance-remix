import { Account, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useCatch,
  useLoaderData
} from 'remix';
import UploadTransactions from '~/modules/UploadTransactions';
import { getAccounts } from '~/query/accounts.server';
import { db } from '~/utils/db.server';
import { StatementUpload } from '~/utils/parsers/types';
import { requireUserId } from '~/utils/session.server';

type ActionData = {
  error?: {
    message: string;
    error: string;
  };
};

type LoaderData = {
  accounts: Account[];
};

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
  const userId = await requireUserId(request);
  const accounts = await getAccounts(userId);
  return { accounts };
};

export const action: ActionFunction = async ({ request }): Promise<Response | any> => {
  const userId = await requireUserId(request);

  // const uploadHandler = unstable_createMemoryUploadHandler({
  //   maxFileSize: 5_00_000
  // });

  const body = await request.formData();
  // const body = await unstable_parseMultipartFormData(request, uploadHandler);
  const accountId = body.get('account')?.toString();
  const bankName = body.get('bankName')?.toString();
  const transactionFile = body.get('transactionFile')?.toString();

  console.log({ file: typeof transactionFile, transactionFile });

  if (!accountId) {
    return { error: { error: 'Name and Type is required', message: 'Name is required.' } };
  }

  if (bankName !== 'HDFC BANK') {
    return {
      error: { error: 'Un-supported Bank.', message: 'Un-supported Bank. Please select HDFC BANK' }
    };
  }

  if (!transactionFile) {
    return {
      error: { error: 'File is required.', message: 'Transactions file is required.' }
    };
  }

  // console.log({ accountId, bankName, transactions });

  switch (request.method) {
    case 'POST': {
      /* handle "POST" */
      try {
        const transactions: StatementUpload[] = JSON.parse(transactionFile);
        const baseCategory = await db.transactionCategory.findFirst({
          where: { name: 'Un-Categorized' }
        });

        console.log({ baseCategory });
        if (!baseCategory) {
          throw new Error('Un-Categorized category not found.');
        }

        await db.transaction.createMany({
          skipDuplicates: true,
          data: transactions.map((transaction) => ({
            ...transaction,
            accountId,
            userId,
            categoryId: baseCategory.id,
            transactionDate: dayjs(transaction.transactionDate).toISOString()
          }))
        });

        return { success: true };

        // return redirect('/accounts');
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
    }
    default:
      return redirect('/');
  }
};

function TransactionsUpload() {
  const actionData = useActionData<ActionData>();
  const loaderData = useLoaderData<LoaderData>();

  return (
    <div className="mt-5 flex justify-center md:mt-40">
      <UploadTransactions error={actionData?.error?.message} accounts={loaderData.accounts} />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  switch (caught.status) {
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div className="error-container">{`There was an error . Sorry.`}</div>;
}

export default TransactionsUpload;
