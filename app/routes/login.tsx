import { User } from '@prisma/client';
import { ActionFunction, Form, redirect, useActionData, useCatch } from 'remix';
import UnAuthenticatedLayout from '~/containers/UnAuthenticatedLayout';
import Button from '~/lib/Button';
import Card from '~/lib/Card';
import Input from '~/lib/form/Input';
import { createUserSession, login } from '~/utils/session.server';

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
    password: body.get('password') as string
  };

  switch (request.method) {
    case 'POST': {
      /* handle "POST" */
      try {
        const user = await login(userObj);
        if (!user) {
          return {
            error: {
              error: 'Invalid username or password',
              message: 'Invalid username or password'
            }
          };
        }

        const redirectTo = new URL(request.url).searchParams.get('redirectTo');

        return createUserSession(user, redirectTo ?? '/');
      } catch (err: any) {
        console.error('error', err);
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
    <UnAuthenticatedLayout>
      <div className="flex justify-center pt-40">
        <Card
          title="Login"
          className="col-span-4 col-start-5"
          footer={
            <div className="flex justify-end">
              <Button type="submit" form="login" className="mr-5">
                Login
              </Button>
            </div>
          }>
          <div className="">
            <Form id="login" method="post">
              <Input autoComplete="none" required label="Username" name="username" />
              <Input
                autoComplete="none"
                required
                label="Password"
                name="password"
                type="password"
              />
              {actionData?.error && (
                <div className="text-center text-error">
                  <p>{actionData?.error?.error}</p>
                </div>
              )}
            </Form>
          </div>
        </Card>
      </div>
    </UnAuthenticatedLayout>
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
