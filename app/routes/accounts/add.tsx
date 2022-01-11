import { Account, AccountType, Prisma } from '@prisma/client';
import { ActionFunction, LoaderFunction, redirect, useActionData, useCatch } from 'remix';
import AddAccount from '~/modules/AddAccount';
import { db } from '~/utils/db.server';
import { requireUserId } from '~/utils/session.server';

type ActionData = {
  account?: Account;
  error?: {
    message: string;
    error: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  return requireUserId(request);
};

export const action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {
  const userId = await requireUserId(request);
  const body = await request.formData();
  const name = body.get('name')?.toString();
  const type: AccountType = (body.get('type')?.toString() as AccountType) ?? 'BANK';
  if (!name || !type) {
    return { error: { error: 'Name and Type is required', message: 'Name is required.' } };
  }

  const accountObj = {
    name,
    type
  };

  switch (request.method) {
    case 'POST': {
      /* handle "POST" */
      try {
        await db.user.update({
          where: { id: userId },
          data: {
            accounts: {
              create: {
                ...accountObj
              }
            }
          }
        });

        return redirect('/accounts');
      } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          switch (err.code) {
            case 'P2002':
              return { error: { error: 'Account name already exists', message: err.message } };
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
    <div className="flex justify-center pt-10 md:pt-40">
      <AddAccount error={actionData?.error?.error} />
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

export default AddUserPage;
