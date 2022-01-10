import { Account, Prisma } from '@prisma/client';
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useCatch,
  useLoaderData
} from 'remix';
import UserLayout from '~/containers/UserLayout';
import UploadTransactions from '~/modules/UploadTransactions';
import { getAccounts } from '~/query/accounts.server';
import parseHdfcFile from '~/utils/parseHdfcFile.server';
import { requireUserId } from '~/utils/session.server';

type ActionData = {
  account?: Account;
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
  await requireUserId(request);

  // const uploadHandler = unstable_createMemoryUploadHandler({
  //   maxFileSize: 5_00_000
  // });

  const body = await request.formData();
  // const body = await unstable_parseMultipartFormData(request, uploadHandler);
  const accountId = body.get('account')?.toString();
  const bankName = body.get('bankName')?.toString();
  const transactionFile: File = body.get('transactionFile') as File;

  console.log({ file: typeof transactionFile, transactionFile });

  if (!accountId) {
    return { error: { error: 'Name and Type is required', message: 'Name is required.' } };
  }

  if (bankName !== 'HDFC BANK') {
    return {
      error: { error: 'Un-supported Bank.', message: 'Un-supported Bank. Please select HDFC BANK' }
    };
  }

  const transactions = parseHdfcFile(await transactionFile.arrayBuffer());

  console.log({ accountId, bankName, transactions });

  switch (request.method) {
    case 'POST': {
      /* handle "POST" */
      try {
        // await db.transaction.createMany({
        //   data: transactions
        // });
        return { account: transactions as unknown as any };

        // return redirect('/accounts');
      } catch (err: any) {
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
    <UserLayout>
      <div className="flex justify-center pt-40">
        <UploadTransactions error={actionData?.error?.error} accounts={loaderData.accounts} />
      </div>
    </UserLayout>
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
