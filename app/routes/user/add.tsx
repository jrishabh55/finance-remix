import { Prisma, User } from '@prisma/client';
import { ActionFunction, redirect, useActionData, useCatch } from 'remix';
import UserLayout from '~/containers/UserLayout';
import AddUser from '~/modules/AddUser';
import { register } from '~/utils/session.server';

type ActionData = {
  user?: User;
  error?: {
    message: string;
    error: string;
  };
};

export const action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {
  const body = await request.formData();
  const userObj = {
    username: body.get('username')?.toString().toLowerCase() as string,
    name: body.get('name') as string,
    email: body.get('email') as string,
    password: body.get('password') as string
  };

  switch (request.method) {
    case 'POST': {
      /* handle "POST" */
      try {
        const user = await register(userObj);
        return { user };
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
        <AddUser error={actionData?.error?.error} />
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
