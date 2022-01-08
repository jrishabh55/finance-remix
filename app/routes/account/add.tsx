import { Account, AccountType, Prisma } from '@prisma/client';
import { ActionFunction, redirect, useActionData, useCatch } from 'remix';
import UserLayout from '~/containers/UserLayout';
import AddAccount from '~/modules/AddAccount';
import { db } from '~/utils/db.server';

type ActionData = {
  account?: Account;
  error?: {
    message: string;
    error: string;
  };
};

export const action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {
  const body = await request.formData();
  const name = body.get('name')?.toString();
  if (!name) {
    return { error: { error: 'Name is required', message: 'Name is required.' } };
  }

  const accountObj = {
    name,
    type: AccountType.BANK
  };

  switch (request.method) {
    case 'POST': {
      /* handle "POST" */
      try {
        const account = await db.user.update({
          where: { id: 1 },
          data: {
            Account: {
              create: {
                ...accountObj
              }
            }
          }
        });

        return { account: account as any };
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

function AddUserPage() {
  const actionData = useActionData<ActionData>();
  return (
    <UserLayout>
      <div className="flex justify-center pt-40">
        <AddAccount error={actionData?.error?.error} />
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

export default AddUserPage;
